# Overview

JobJet is a comprehensive full-stack job board platform that enables job seekers to find opportunities and companies to post jobs. The application features role-based authentication, job management, company profiles, and learning resources. Built with a modern React frontend and Express.js backend, it uses in-memory storage for simplicity while maintaining a clean architecture that can be easily migrated to a persistent database.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for type safety and modern development
- **Component-based design** using Shadcn/ui for consistent UI components
- **Client-side routing** with Wouter for lightweight navigation
- **State management** using Zustand for job filtering and search state
- **Data fetching** with TanStack Query for efficient server state management
- **Form handling** with React Hook Form and Zod validation
- **Styling** with Tailwind CSS and custom theme system supporting light/dark modes

## Backend Architecture
- **Express.js** server with TypeScript for API endpoints
- **Session-based authentication** using Passport.js with LocalStrategy
- **In-memory storage** for development simplicity using MemoryStore
- **RESTful API design** with proper HTTP status codes and error handling
- **Schema validation** using Zod for request/response validation
- **Role-based access control** with three user types: job_seeker, company, admin

## Data Storage
- **In-memory storage** with MemoryStore for sessions and data persistence
- **Drizzle ORM** schema definitions prepared for future database migration
- **PostgreSQL-ready** with migration scripts configured for production deployment
- **Structured data models** for users, companies, jobs, applications, categories, and resources

## Authentication & Authorization
- **Password hashing** using Node.js crypto.scrypt for security
- **Session management** with express-session and secure cookie configuration
- **Role-based permissions** enforced at route level with middleware
- **Protected routes** on frontend with redirect logic for unauthorized access

## API Structure
- **RESTful endpoints** following standard conventions (GET, POST, PUT, DELETE)
- **Consistent error handling** with proper HTTP status codes
- **Request/response validation** using Zod schemas
- **Middleware pattern** for authentication and authorization checks
- **Query parameter support** for filtering and searching jobs

# External Dependencies

## Core Framework Dependencies
- **React ecosystem**: React 18, React DOM, TypeScript support
- **Backend framework**: Express.js with TypeScript compilation via tsx
- **Build tools**: Vite for development and production builds, ESBuild for server bundling

## UI & Styling
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom theme configuration
- **Lucide React**: Icon library for consistent iconography
- **Framer Motion**: Animation library for enhanced user experience

## Data Management
- **TanStack Query**: Server state management and caching
- **Drizzle ORM**: Type-safe database operations and schema management
- **Zod**: Schema validation for both client and server
- **React Hook Form**: Form state management with validation

## Development Tools
- **TypeScript**: Static type checking across the entire application
- **Vite plugins**: Development enhancements including theme support and error overlays
- **ESLint/Prettier**: Code formatting and linting (implied by modern React setup)

## Authentication & Security
- **Passport.js**: Authentication middleware with local strategy
- **express-session**: Session management with memory store
- **Node.js crypto**: Built-in cryptographic functions for password hashing

## Utility Libraries
- **date-fns**: Date manipulation and formatting
- **class-variance-authority**: Utility for managing CSS class variants
- **clsx**: Conditional CSS class name utility
- **wouter**: Lightweight client-side routing

Note: The application is designed to be deployment-ready with minimal configuration changes. While currently using in-memory storage, the Drizzle schema and PostgreSQL configuration indicate preparation for database persistence in production environments.