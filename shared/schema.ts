import { pgTable, text, serial, integer, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User-related schemas
export const userRoleEnum = pgEnum('user_role', ['job_seeker', 'company', 'admin']);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  role: userRoleEnum("role").notNull().default('job_seeker'),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  role: true,
  name: true,
});

// Company profiles
export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  website: text("website"),
  logo: text("logo"),
  description: text("description"),
  location: text("location"),
});

export const insertCompanySchema = createInsertSchema(companies).pick({
  userId: true,
  name: true,
  website: true,
  logo: true,
  description: true,
  location: true,
});

// Job listings
export const jobTypeEnum = pgEnum('job_type', ['full_time', 'part_time', 'contract', 'remote', 'internship']);

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => companies.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  location: text("location").notNull(),
  salary: text("salary"),
  jobType: jobTypeEnum("job_type").notNull(),
  experience: text("experience"),
  createdAt: timestamp("created_at").defaultNow(),
  postedBy: integer("posted_by").notNull().references(() => users.id),
  isActive: boolean("is_active").default(true),
});

export const insertJobSchema = createInsertSchema(jobs).pick({
  companyId: true,
  title: true,
  description: true,
  requirements: true,
  location: true,
  salary: true,
  jobType: true,
  experience: true,
  postedBy: true,
});

// Job applications
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").notNull().references(() => jobs.id),
  userId: integer("user_id").notNull().references(() => users.id),
  resume: text("resume"),
  coverLetter: text("cover_letter"),
  status: text("status").default("pending"),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertApplicationSchema = createInsertSchema(applications).pick({
  jobId: true,
  userId: true,
  resume: true,
  coverLetter: true,
});

// Job categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  icon: text("icon"),
});

export const jobCategories = pgTable("job_categories", {
  jobId: integer("job_id").notNull().references(() => jobs.id),
  categoryId: integer("category_id").notNull().references(() => categories.id),
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;

export type Job = typeof jobs.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;

export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;

export type Category = typeof categories.$inferSelect;

// Learning resources
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  category: text("category").notNull(),
  icon: text("icon"),
  tags: text("tags").array(),
});

export const insertResourceSchema = createInsertSchema(resources).pick({
  name: true,
  description: true,
  url: true,
  category: true,
  icon: true,
  tags: true,
});

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;
