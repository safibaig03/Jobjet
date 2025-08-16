# JobJet

A modern full-stack job board platform built with React, Express.js, and PostgreSQL. Features job seeker and recruiter (company) roles, job posting/browsing, company profiles, learning resources, and a consistent, mobile-friendly UI/UX.

## 📋 Prerequisites

- Node.js 18+ and npm 8+
- Git repository with your JobJet code
- Neon Postgres database account (already set up in your .env file)

## 🚀 Local Setup Instructions

### 1. Clone or Download the Repository
```bash
git clone <repository-url>
cd jobjet
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory for custom configuration:
```env
DATABASE_URL=your-neon-postgres-url
SESSION_SECRET=your-custom-session-secret
PORT=5000
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at: **http://localhost:5000**

## 🛠️ How It Works

### System Architecture

#### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Component-based design** using Shadcn/ui for consistent UI components
- **Client-side routing** with Wouter for lightweight navigation
- **State management** using Zustand for job filtering and search state
- **Data fetching** with TanStack Query for efficient server state management
- **Form handling** with React Hook Form and Zod validation
- **Styling** with Tailwind CSS and custom theme system

#### Backend Architecture
- **Express.js** server with TypeScript for API endpoints
- **Session-based authentication** using Passport.js with LocalStrategy
- **PostgreSQL database** with Drizzle ORM for data persistence
- **RESTful API design** with proper HTTP status codes and error handling
- **Schema validation** using Zod for request/response validation
- **Role-based access control** with user types: job_seeker, company, admin

### Authentication System

The application uses built-in authentication with session-based management:

- **Session-based authentication** using Passport.js (Local Strategy)
- **Password hashing** with crypto.scrypt for security
- **Role-based access control** (Job Seeker, Company)
- **Protected routes** for authenticated users
- **Automatic company profile creation** for company users
- **Forgot Password** functionality with secure token-based reset

Authentication routes are defined in `server/auth.ts` and include:

```typescript
// Authentication endpoints
app.post("/api/register", async (req, res) => { /* User registration logic */ });
app.post("/api/login", passport.authenticate("local"), (req, res) => { /* Login logic */ });
app.post("/api/logout", (req, res) => { /* Logout logic */ });
app.get("/api/user", (req, res) => { /* Get current user logic */ });
app.post("/api/forgot-password", async (req, res) => { /* Password reset request logic */ });
app.post("/api/reset-password", async (req, res) => { /* Password reset logic */ });
```

### API Routes and Functions

The application provides a comprehensive set of API endpoints defined in `server/routes.ts`:

#### Jobs API

```typescript
// Get all jobs with optional filtering
app.get("/api/jobs", async (req, res) => { /* Get jobs with filtering logic */ });

// Get job by ID
app.get("/api/jobs/:id", async (req, res) => { /* Get job details logic */ });

// Create new job (company role only)
app.post("/api/jobs", isAuthenticated, hasRole(['company', 'admin']), async (req, res) => { /* Create job logic */ });

// Update job (company role only)
app.put("/api/jobs/:id", isAuthenticated, hasRole(['company', 'admin']), async (req, res) => { /* Update job logic */ });

// Delete job (company role only)
app.delete("/api/jobs/:id", isAuthenticated, hasRole(['company', 'admin']), async (req, res) => { /* Delete job logic */ });
```

#### Companies API

```typescript
// Get all companies
app.get("/api/companies", async (req, res) => { /* Get companies logic */ });

// Get company by ID
app.get("/api/companies/:id", async (req, res) => { /* Get company details logic */ });

// Update company (company role only)
app.put("/api/companies/:id", isAuthenticated, hasRole(['company', 'admin']), async (req, res) => { /* Update company logic */ });
```

#### Applications API

```typescript
// Apply to job (job seeker role only)
app.post("/api/jobs/:id/apply", isAuthenticated, hasRole(['job_seeker']), async (req, res) => { /* Apply to job logic */ });

// Get applications for a job (company role only)
app.get("/api/jobs/:id/applications", isAuthenticated, hasRole(['company', 'admin']), async (req, res) => { /* Get applications logic */ });

// Get user's applications (job seeker role only)
app.get("/api/applications", isAuthenticated, hasRole(['job_seeker']), async (req, res) => { /* Get user applications logic */ });
```

#### Resources API

```typescript
// Get learning resources
app.get("/api/resources", async (req, res) => { /* Get resources logic */ });
```

### Database Schema

The application uses Drizzle ORM with PostgreSQL. Key tables include:

- **users**: User accounts with authentication details
- **companies**: Company profiles linked to company user accounts
- **jobs**: Job listings with details and requirements
- **applications**: Job applications linking users to jobs
- **categories**: Job categories for classification
- **resources**: Learning resources for career development
- **session**: Session storage for authentication

### Middleware

The application uses several middleware functions for authentication and authorization:

```typescript
// Check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

// Check if user has a specific role
const hasRole = (roles) => (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  if (roles.includes(req.user.role)) {
    return next();
  }
  
  res.status(403).json({ message: "Forbidden" });
};
```

## 🚀 Deployment 

 Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Login to Vercel: `vercel login`
3. Deploy: `vercel`
4. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `SESSION_SECRET`


## 📊 Database 

### Using Neon Postgres

Your application is already configured to use Neon Postgres. Make sure your database URL is correctly set in the environment variables of your hosting platform.

### Running Migrations

After deploying, you may need to run database migrations:


