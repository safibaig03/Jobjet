# JobJet 🚀

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

A modern, full-stack job board platform connecting job seekers and companies. Built with React, Express.js, and PostgreSQL, it features distinct roles, company profiles, learning resources, and a clean, mobile-friendly UI/UX.

---

### ✨ **[Live Demo](https://jobjet-beryl.vercel.app/)** ✨

![JobJet Screenshot](https://via.placeholder.com/800x450.png?text=JobJet+Application+Screenshot)

## 🌟 Key Features

- Dual User Roles: Distinct dashboards and functionalities for Job Seekers and Companies.
- Company Profiles: Companies can register and manage their own profile and job postings.
- Job Management: Companies can create, read, update, and delete job listings.
- Job Search & Apply: Job seekers can browse, search, and apply for jobs.
- Secure Authentication: Session-based authentication with password hashing and role-based access control.
- Forgot Password: Secure, token-based password reset functionality.
- Learning Resources: A dedicated section with curated resources to help job seekers.

## 🛠️ Tech Stack

This project is built with a modern, decoupled architecture, ensuring scalability and maintainability.

| Category        | Technology                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| 🎨 Frontend     | React, TypeScript, Vite, TanStack Query, Zustand, Wouter, React Hook Form, Zod, Shadcn/UI, Tailwind CSS      |
| ⚙️ Backend      | Node.js, Express.js, TypeScript, Passport.js                                                                 |
| 💾 Database     | PostgreSQL, Neon (Hosting), Drizzle ORM                                                                      |
| 🚀 Deployment   | Vercel (Frontend), Render (Backend)                                                                          |

## 🚀 Getting Started (Local Development)

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Node.js (v18 or later)
- Git
- A free Neon account for the PostgreSQL database.

### Installation & Setup

1. Clone the repository:
   git clone https://github.com/safibaig03/jobjet.git
   cd jobjet

2. Set up the Backend Server:
   cd server
   npm install
   cp .env.example .env
   (Now, open the newly created /server/.env file and add your Neon database URL and a session secret.)

3. Set up the Frontend Client:
   cd ../client
   npm install
   (The frontend client does not require an .env file for local development, as it will proxy requests using vite.config.js.)

### Running the Application

1. Start the Backend Server:
   cd server
   npm run dev
   (Your backend API will be running on http://localhost:5000 or the port you specified in .env.)

2. Start the Frontend Development Server:
   cd client
   npm run dev
   (Your React application will be available at http://localhost:5173.)

## 🔑 Environment Variables

To run this project, you will need to create a `.env` file in the `/server` directory.

#### Backend (`/server/.env.example`)

DATABASE_URL="postgresql://user:password@host:port/dbname"
SESSION_SECRET="your_super_secret_session_key"
PORT=5000

## ⚙️ API & System Design

The backend is a robust RESTful API built with Express.js.

- Authentication: Utilizes Passport.js for session-based authentication with a local username/password strategy. Passwords are securely hashed using crypto.scrypt.
- Authorization: Role-based access control (RBAC) middleware protects routes, ensuring only authorized users (e.g., job_seeker, company) can access specific endpoints.
- Database Interaction: Uses Drizzle ORM for type-safe SQL queries, interacting with the PostgreSQL database hosted on Neon.
- Validation: Leverages Zod for schema validation on both request bodies and environment variables, ensuring data integrity.
- API Endpoints: Provides a full suite of CRUD operations for Jobs, Companies, Applications, and Resources.

## 🚀 Deployment

This application is deployed using a dual-hosting strategy for optimal performance and scalability:

- The Backend is deployed as a Web Service on Render. It connects to the production Neon database via environment variables.
- The Frontend is deployed on Vercel. A vercel.json file automatically proxies all /api requests to the live backend on Render, creating a seamless full-stack experience.

---

## 👨‍💻 About the Author

Created by **Mirza Safiulla Baig**  
- 🎓 B.Tech in CSE (AI & ML), Keshav Memorial Institute of Technology  
- 💡 Passionate about building modern web apps, AI/ML solutions, and scalable software systems  
- 🌐 LinkedIn: https://www.linkedin.com/in/safibaig03  
- 💻 GitHub: https://github.com/safibaig03
