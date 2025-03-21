import { users, User, InsertUser, companies, Company, InsertCompany, jobs, Job, InsertJob, applications, Application, InsertApplication, categories, Category } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Company management
  createCompany(company: InsertCompany): Promise<Company>;
  getCompany(id: number): Promise<Company | undefined>;
  getCompanies(): Promise<Company[]>;
  getCompanyByUserId(userId: number): Promise<Company | undefined>;
  updateCompany(id: number, company: Partial<Company>): Promise<Company>;
  
  // Job management
  getJobs(filters?: { search?: string, location?: string, type?: string, category?: string }): Promise<Job[]>;
  getJob(id: number): Promise<Job | undefined>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: number, job: Partial<Job>): Promise<Job>;
  deleteJob(id: number): Promise<void>;
  getJobsByCompany(userId: number): Promise<Job[]>;
  
  // Application management
  createApplication(application: InsertApplication): Promise<Application>;
  getApplicationsByUser(userId: number): Promise<Application[]>;
  getApplicationsByCompany(companyId: number): Promise<Application[]>;
  getAllApplications(): Promise<Application[]>;
  
  // Category management
  getCategories(): Promise<Category[]>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private usersData: Map<number, User>;
  private companiesData: Map<number, Company>;
  private jobsData: Map<number, Job>;
  private applicationsData: Map<number, Application>;
  private categoriesData: Map<number, Category>;
  
  public sessionStore: session.SessionStore;
  
  private userIdCounter: number;
  private companyIdCounter: number;
  private jobIdCounter: number;
  private applicationIdCounter: number;
  private categoryIdCounter: number;

  constructor() {
    this.usersData = new Map();
    this.companiesData = new Map();
    this.jobsData = new Map();
    this.applicationsData = new Map();
    this.categoriesData = new Map();
    
    this.userIdCounter = 1;
    this.companyIdCounter = 1;
    this.jobIdCounter = 1;
    this.applicationIdCounter = 1;
    this.categoryIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    
    // Seed some initial categories
    this.seedCategories();
  }

  private seedCategories() {
    const categoryData = [
      { name: "Software Development", icon: "CodeIcon" },
      { name: "Design", icon: "PaletteIcon" },
      { name: "Marketing", icon: "TrendingUpIcon" },
      { name: "Management", icon: "UsersIcon" },
      { name: "Data Science", icon: "BarChartIcon" },
      { name: "Customer Service", icon: "HeadphonesIcon" },
      { name: "Finance", icon: "DollarSignIcon" },
      { name: "Healthcare", icon: "HeartIcon" }
    ];
    
    categoryData.forEach(category => {
      const id = this.categoryIdCounter++;
      this.categoriesData.set(id, {
        id,
        ...category
      });
    });
  }

  // User management
  async getUser(id: number): Promise<User | undefined> {
    return this.usersData.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.usersData.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.usersData.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: now
    };
    this.usersData.set(id, user);
    return user;
  }

  // Company management
  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = this.companyIdCounter++;
    const company: Company = { ...insertCompany, id };
    this.companiesData.set(id, company);
    return company;
  }

  async getCompany(id: number): Promise<Company | undefined> {
    return this.companiesData.get(id);
  }

  async getCompanies(): Promise<Company[]> {
    return Array.from(this.companiesData.values());
  }

  async getCompanyByUserId(userId: number): Promise<Company | undefined> {
    return Array.from(this.companiesData.values()).find(
      (company) => company.userId === userId,
    );
  }

  async updateCompany(id: number, companyUpdate: Partial<Company>): Promise<Company> {
    const company = this.companiesData.get(id);
    if (!company) {
      throw new Error(`Company with id ${id} not found`);
    }
    
    const updatedCompany = { ...company, ...companyUpdate };
    this.companiesData.set(id, updatedCompany);
    return updatedCompany;
  }

  // Job management
  async getJobs(filters?: { search?: string, location?: string, type?: string, category?: string }): Promise<Job[]> {
    let jobs = Array.from(this.jobsData.values());
    
    if (filters) {
      // Filter by search term (title, description)
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        jobs = jobs.filter(job => 
          job.title.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm)
        );
      }
      
      // Filter by location
      if (filters.location) {
        const locationTerm = filters.location.toLowerCase();
        jobs = jobs.filter(job => 
          job.location.toLowerCase().includes(locationTerm)
        );
      }
      
      // Filter by job type
      if (filters.type) {
        jobs = jobs.filter(job => job.jobType === filters.type);
      }
      
      // We'll implement category filtering later when we have category-job relationships
    }
    
    // Sort by newest first
    return jobs.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getJob(id: number): Promise<Job | undefined> {
    return this.jobsData.get(id);
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = this.jobIdCounter++;
    const now = new Date();
    const job: Job = { 
      ...insertJob, 
      id, 
      createdAt: now,
      isActive: true
    };
    this.jobsData.set(id, job);
    return job;
  }

  async updateJob(id: number, jobUpdate: Partial<Job>): Promise<Job> {
    const job = this.jobsData.get(id);
    if (!job) {
      throw new Error(`Job with id ${id} not found`);
    }
    
    const updatedJob = { ...job, ...jobUpdate };
    this.jobsData.set(id, updatedJob);
    return updatedJob;
  }

  async deleteJob(id: number): Promise<void> {
    if (!this.jobsData.has(id)) {
      throw new Error(`Job with id ${id} not found`);
    }
    
    this.jobsData.delete(id);
  }

  async getJobsByCompany(userId: number): Promise<Job[]> {
    const company = await this.getCompanyByUserId(userId);
    if (!company) {
      return [];
    }
    
    return Array.from(this.jobsData.values())
      .filter(job => job.companyId === company.id)
      .sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  // Application management
  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = this.applicationIdCounter++;
    const now = new Date();
    const application: Application = { 
      ...insertApplication, 
      id,
      status: "pending",
      submittedAt: now
    };
    this.applicationsData.set(id, application);
    return application;
  }

  async getApplicationsByUser(userId: number): Promise<Application[]> {
    return Array.from(this.applicationsData.values())
      .filter(application => application.userId === userId)
      .sort((a, b) => 
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
  }

  async getApplicationsByCompany(userId: number): Promise<Application[]> {
    const company = await this.getCompanyByUserId(userId);
    if (!company) {
      return [];
    }
    
    // Get all company's jobs
    const companyJobs = Array.from(this.jobsData.values())
      .filter(job => job.companyId === company.id)
      .map(job => job.id);
    
    // Get applications for those jobs
    return Array.from(this.applicationsData.values())
      .filter(application => companyJobs.includes(application.jobId))
      .sort((a, b) => 
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
  }

  async getAllApplications(): Promise<Application[]> {
    return Array.from(this.applicationsData.values())
      .sort((a, b) => 
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      );
  }

  // Category management
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categoriesData.values());
  }
}

export const storage = new MemStorage();
