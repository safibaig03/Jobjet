import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

// Password reset tokens storage (in production, use database)
const passwordResetTokens = new Map<string, { userId: number; expires: Date }>();

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "jobboard-secret",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      httpOnly: true
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      console.log('Registration request body:', JSON.stringify(req.body));
      
      // Validate required fields
      if (!req.body.username || !req.body.password || !req.body.email || !req.body.name) {
        console.log('Missing required fields in registration request');
        return res.status(400).json({ message: "Missing required fields" });
      }

      const existingUser = await storage.getUserByUsername(req.body.username);
      if (existingUser) {
        console.log('Username already exists:', req.body.username);
        return res.status(400).json({ message: "Username already exists" });
      }

      // Check if email already exists
      const existingEmail = await storage.getUserByEmail(req.body.email);
      if (existingEmail) {
        console.log('Email already exists:', req.body.email);
        return res.status(400).json({ message: "Email already exists" });
      }

      try {
        console.log('Attempting to create user with data:', { 
          username: req.body.username, 
          email: req.body.email, 
          role: req.body.role, 
          name: req.body.name 
        });
        
        const hashedPassword = await hashPassword(req.body.password);
        console.log('Password hashed successfully');
        
        const user = await storage.createUser({
          ...req.body,
          password: hashedPassword,
        });

        console.log('User created successfully:', user.id);

        // If user is a company, create a company profile
        if (req.body.role === 'company') {
          try {
            await storage.createCompany({
              userId: user.id,
              name: req.body.name,
              website: req.body.website || '',
              logo: req.body.logo || '',
              description: req.body.description || '',
              location: req.body.location || '',
            });
            console.log('Company profile created for user:', user.id);
          } catch (companyError) {
            console.error('Error creating company profile:', companyError);
            // Continue with login even if company profile creation fails
          }
        }

        req.login(user, (err) => {
          if (err) {
            console.error('Login error after registration:', err);
            return next(err);
          }
          console.log('User logged in after registration:', user.id);
          res.status(201).json(user);
        });
      } catch (dbError) {
        console.error('Database error during user creation:', dbError);
        return res.status(500).json({ message: "Could not create account", error: dbError.message });
      }
    } catch (error) {
      console.error('Unexpected error during registration:', error);
      next(error);
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ 
          message: "Invalid username or password" 
        });
      }
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(200).json(user);
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      let userData = req.user;
      
      // If user is a company, fetch company profile data
      if (req.user?.role === 'company') {
        const company = await storage.getCompanyByUserId(req.user.id);
        if (company) {
          userData = {
            ...req.user,
            company: company.name,
            companyWebsite: company.website,
            companyLogo: company.logo,
            companyDescription: company.description,
            companyLocation: company.location,
          };
        }
      }
      
      res.json(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.json(req.user); // Fallback to basic user data
    }
  });

  app.delete("/api/user", async (req, res, next) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const userId = req.user!.id;
      
      // Delete user and all associated data
      await storage.deleteUser(userId);
      
      // Logout the user
      req.logout((err) => {
        if (err) return next(err);
        res.status(200).json({ message: "Account deleted successfully" });
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: "Failed to delete account" });
    }
  });

  // Test endpoint
  app.get("/api/test", (req, res) => {
    res.json({ message: "Test endpoint working" });
  });

  // Forgot password endpoint
  app.post("/api/forgot-password", async (req, res) => {
    try {
      console.log("Forgot password request body:", req.body);
      const { email } = req.body;
      
      if (!email) {
        console.log("No email provided in request");
        return res.status(400).json({ message: "Email is required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        // Don't reveal if email exists or not for security
        return res.status(200).json({ message: "If an account with that email exists, a password reset link has been sent." });
      }

      // Generate reset token
      const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const expires = new Date(Date.now() + 3600000); // 1 hour expiry
      
      passwordResetTokens.set(resetToken, { userId: user.id, expires });

      // In production, send email here
      console.log(`Password reset token for ${email}: ${resetToken}`);
      console.log(`Reset link: http://localhost:5000/reset-password?token=${resetToken}`);

      res.status(200).json({ message: "If an account with that email exists, a password reset link has been sent." });
    } catch (error) {
      console.error("Forgot password error:", error);
      res.status(500).json({ message: "Failed to process password reset request" });
    }
  });

  // Reset password endpoint
  app.post("/api/reset-password", async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      
      if (!token || !newPassword) {
        return res.status(400).json({ message: "Token and new password are required" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
      }

      const resetData = passwordResetTokens.get(token);
      if (!resetData) {
        return res.status(400).json({ message: "Invalid or expired reset token" });
      }

      if (resetData.expires < new Date()) {
        passwordResetTokens.delete(token);
        return res.status(400).json({ message: "Reset token has expired" });
      }

      // Update user's password
      const hashedPassword = await hashPassword(newPassword);
      await storage.updateUserPassword(resetData.userId, hashedPassword);
      
      // Remove used token
      passwordResetTokens.delete(token);

      res.status(200).json({ message: "Password has been reset successfully" });
    } catch (error) {
      console.error("Reset password error:", error);
      res.status(500).json({ message: "Failed to reset password" });
    }
  });
}
