import { db } from "./db";
import { users, companies, jobs, applications, categories, resources, insertUserSchema, insertCompanySchema, insertJobSchema, insertApplicationSchema } from "@shared/schema";
import { eq, like, and, or } from "drizzle-orm";
import type { User, Company, Job, Application } from "@shared/schema";
import connectPgSimple from "connect-pg-simple";
import session from "express-session";
import { Pool } from "pg";

export class PostgresStorage {
  // Session store
  sessionStore: session.Store;

  constructor() {
    const pgSession = connectPgSimple(session);
    
    // Use PostgreSQL for session store
    console.log('Using PostgreSQL for session store');
    const sessionPool = new Pool({ connectionString: process.env.DATABASE_URL });
    
    // Create session table if it doesn't exist
    sessionPool.query(`
    CREATE TABLE IF NOT EXISTS "session" (
      "sid" varchar NOT NULL COLLATE "default",
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL,
      CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
    );
    CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
    `).catch(err => console.error('Error creating session table:', err));
    
    this.sessionStore = new pgSession({
      pool: sessionPool,
      tableName: 'session',
      createTableIfMissing: true
    });

  }

  // Users
  async createUser(user: User) {
    try {
      console.log('PostgresStorage.createUser: Inserting user into database');
      const [u] = await db.insert(users).values(user).returning();
      console.log('PostgresStorage.createUser: User inserted successfully, returning user with ID:', u.id);
      return u;
    } catch (error) {
      console.error('PostgresStorage.createUser: Error creating user:', error);
      throw error;
    }
  }

  async getUserById(id: number) {
    return db.query.users.findFirst({ where: eq(users.id, id) });
  }

  async getUserByEmail(email: string) {
    return db.query.users.findFirst({ where: eq(users.email, email) });
  }

  async getUserByUsername(username: string) {
    return db.query.users.findFirst({ where: eq(users.username, username) });
  }

  async getUser(id: number) {
    return this.getUserById(id);
  }

  // Companies
  async createCompany(company: Company) {
    const [c] = await db.insert(companies).values(company).returning();
    return c;
  }

  async getCompanyById(id: number) {
    return db.query.companies.findFirst({ where: eq(companies.id, id) });
  }

  async getCompanyByUserId(userId: number) {
    return db.query.companies.findFirst({ where: eq(companies.userId, userId) });
  }

  async listCompanies() {
    return db.select().from(companies);
  }

  async getCompanies() {
    return this.listCompanies();
  }

  // Jobs
  async createJob(job: Job) {
    const [j] = await db.insert(jobs).values(job).returning();
    return j;
  }

  async getJobById(id: number) {
    const result = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);

    return result[0];
  }
  // async getJobById(id: number) {
  //   return db.query.jobs.findFirst({ where: eq(jobs.id, id) });
  // }
  async listJobs() {
    return db.select().from(jobs);
  }

  async getJobs(filters: { search?: string, location?: string, type?: string, category?: string }) {
    let conditions = [];
    
    if (filters.search) {
      conditions.push(
        or(
          like(jobs.title, `%${filters.search}%`),
          like(jobs.description, `%${filters.search}%`)
        )
      );
    }
    
    if (filters.location) {
      conditions.push(like(jobs.location, `%${filters.location}%`));
    }
    
    if (filters.type) {
      conditions.push(eq(jobs.job_type, filters.type));
    }
    
    // For category filtering, we would need to join with job_categories table
    // This is a simplified version
    
    if (conditions.length > 0) {
      return db.select().from(jobs).where(and(...conditions));
    }
    
    return this.listJobs();
  }

  async getJob(id: number) {
    return this.getJobById(id);
  }

  async updateJob(id: number, data: Partial<Job>) {
    const [updated] = await db.update(jobs)
      .set(data)
      .where(eq(jobs.id, id))
      .returning();
    return updated;
  }

  // Applications
  async createApplication(app: Application) {
    const [a] = await db.insert(applications).values(app).returning();
    return a;
  }

  async getApplicationById(id: number) {
    return db.query.applications.findFirst({ where: eq(applications.id, id) });
  }

  async listApplications() {
    return db.select().from(applications);
  }

  async getApplicationsByUser(userId: number) {
    return db.select().from(applications).where(eq(applications.userId, userId));
  }

  async getApplicationsByCompany(companyId: number) {
    // First get all jobs posted by this company
    const companyJobs = await db.select().from(jobs).where(eq(jobs.companyId, companyId));
    const jobIds = companyJobs.map(job => job.id);
    
    // Then get applications for these jobs
    if (jobIds.length === 0) return [];
    
    return db.select().from(applications).where(eq(applications.jobId, jobIds[0]));
  }

  async getAllApplications() {
    return this.listApplications();
  }

  // Categories
  async getCategories() {
    return db.select().from(categories);
  }

  // Resources
  async getResources() {
    // Check if resources exist
    const existingResources = await db.select().from(resources);
    
    // If no resources exist, create default ones
    if (existingResources.length === 0) {
      const defaultResources = [
        {
          name: 'GeeksforGeeks',
          description: 'Computer science portal with tutorials, courses, and interview preparation resources',
          url: 'https://www.geeksforgeeks.org/',
          category: 'Learning Platforms',
          icon: 'code',
          tags: ['algorithms', 'data structures', 'programming']
        },
        {
          name: 'Stack Overflow',
          description: 'Q&A community for developers',
          url: 'https://stackoverflow.com/',
          category: 'Community Resources',
          icon: 'message-circle',
          tags: ['questions', 'answers', 'community']
        },
        {
          name: 'LeetCode',
          description: 'Platform to help you enhance your skills and prepare for technical interviews',
          url: 'https://leetcode.com/',
          category: 'Interview Preparation',
          icon: 'code',
          tags: ['algorithms', 'coding challenges', 'interviews']
        },
        {
          name: 'freeCodeCamp',
          description: 'Learn to code for free with interactive tutorials',
          url: 'https://www.freecodecamp.org/',
          category: 'Learning Platforms',
          icon: 'code',
          tags: ['web development', 'javascript', 'free']
        },
        {
          name: 'Coursera',
          description: 'Online courses from top universities',
          url: 'https://www.coursera.org/',
          category: 'Online Courses',
          icon: 'graduation-cap',
          tags: ['courses', 'certificates', 'education']
        },
        {
          name: 'GitHub',
          description: 'Platform for version control and collaboration',
          url: 'https://github.com/',
          category: 'Development Tools',
          icon: 'github',
          tags: ['git', 'repositories', 'open source']
        },
        {
          name: 'MDN Web Docs',
          description: 'Resources for developers, by developers',
          url: 'https://developer.mozilla.org/',
          category: 'Documentation',
          icon: 'book-open',
          tags: ['web', 'javascript', 'html', 'css']
        },
        {
          name: 'HackerRank',
          description: 'Coding challenges and competitions',
          url: 'https://www.hackerrank.com/',
          category: 'Interview Preparation',
          icon: 'code',
          tags: ['coding challenges', 'competitions', 'interviews']
        }
      ];
      
      // Insert default resources
      await db.insert(resources).values(defaultResources);
      
      // Return the newly created resources
      return db.select().from(resources);
    }
    
    // Return existing resources
    return existingResources;
  }

  // Jobs
  async deleteJob(id: number) {
    return db.delete(jobs).where(eq(jobs.id, id));
  }
}

export const storage = new PostgresStorage();
