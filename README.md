# JobJet

A comprehensive full-stack job board platform built with React, Express.js, and in-memory storage. Features role-based authentication, job posting/browsing, company profiles, and learning resources.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure registration/login with role-based access (Job Seeker, Company, Admin)
- **Job Management**: Companies can post, edit, and manage job listings
- **Job Applications**: Job seekers can browse and apply to jobs
- **Company Profiles**: Detailed company pages with job listings and information
- **Learning Resources**: Curated educational resources for career development
- **Search & Filtering**: Advanced job search capabilities
- **Responsive Design**: Mobile-first design that works on all devices

### User Roles
- **Job Seekers**: Browse jobs, apply to positions, manage applications
- **Companies**: Post jobs, manage listings, view applications
- **Admin**: Platform management and oversight

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/ui** components
- **Wouter** for client-side routing
- **TanStack Query** for data fetching
- **React Hook Form** with Zod validation
- **Framer Motion** for animations

### Backend
- **Express.js** with TypeScript
- **Passport.js** for authentication
- **Session-based authentication** with express-session
- **In-memory storage** (MemoryStore) for development
- **Zod** for schema validation
- **crypto.scrypt** for password hashing

### Development Tools
- **Vite** for development server and build
- **TypeScript** for type safety
- **ESBuild** for production builds
- **Drizzle ORM** schema definitions (ready for database migration)

## 📋 Prerequisites

Before running this application locally, ensure you have:

- **Node.js** (version 18 or higher)
- **npm** (version 8 or higher)
- **Git** for cloning the repository

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

### 3. Environment Setup (Optional)
Create a `.env` file in the root directory for custom configuration:
```env
# Optional: Custom session secret (defaults to 'jobboard-secret')
SESSION_SECRET=your-custom-session-secret

# Optional: Custom port (defaults to 5000)
PORT=5000
```

### 4. Start Development Server
```bash
npm run dev
```

**Important**: Use this command instead of `npm start` for local development.

The application will be available at: **http://localhost:5000**

### 5. Alternative Local Run Command
If you encounter any issues with the development server, you can also run:
```bash
node -r tsx/esm server/index.ts
```

## 📁 Project Structure

```
jobjet/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # Shadcn/ui components
│   │   │   ├── layout/     # Layout components (Navbar, Footer)
│   │   │   ├── jobs/       # Job-related components
│   │   │   └── companies/  # Company-related components
│   │   ├── pages/          # Page components
│   │   │   ├── home-page.tsx
│   │   │   ├── auth-page.tsx
│   │   │   ├── job-listings.tsx
│   │   │   ├── companies.tsx
│   │   │   ├── resources.tsx
│   │   │   └── ...
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions and configurations
│   │   ├── store/          # Zustand stores
│   │   ├── App.tsx         # Main App component
│   │   └── main.tsx        # React entry point
│   └── index.html          # HTML template
├── server/                 # Backend Express application
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   ├── auth.ts             # Authentication setup
│   ├── storage.ts          # In-memory storage implementation
│   └── vite.ts             # Vite integration
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schemas and types
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server (RECOMMENDED)

# Building
npm run build        # Build for production
npm run start        # Start production server

# Type Checking
npm run check        # TypeScript type checking

# Database (when using PostgreSQL)
npm run db:push      # Push schema changes to database
```

## 🎨 Design System

The application uses a consistent purple theme throughout:
- **Primary Color**: `hsl(238 77% 64%)` (Purple)
- **Design System**: Shadcn/ui components with Tailwind CSS
- **Theme**: Professional variant with light appearance
- **Typography**: Inter font family
- **Icons**: Lucide React icons

## 🔐 Authentication System

### No External Services Required
This application uses **built-in authentication** - no Clerk, Auth0, or other external services needed.

### Features
- **Session-based authentication** using Passport.js
- **Password hashing** with crypto.scrypt
- **Role-based access control**
- **Protected routes** for authenticated users
- **Automatic company profile creation** for company users

### Available Endpoints
```
POST /api/register    # User registration
POST /api/login       # User login
POST /api/logout      # User logout
GET  /api/user        # Get current user
```

## 💾 Data Storage

Currently uses **in-memory storage** for development simplicity:
- **MemoryStore** for session storage
- **JavaScript objects** for data persistence
- **Sample data** pre-loaded for demonstration
- **No database setup required** for local development

### Sample Data Included
- **5 Companies**: TechCorp Solutions, Digital Innovations Inc, Global Finance Partners, HealthTech Solutions, EcoGreen Industries
- **8 Learning Resources**: GeeksforGeeks, LeetCode, Stack Overflow, GitHub, Coursera, edX, Udemy, FreeCodeCamp
- **Job Categories**: Software Development, Data Science, Marketing, Design, etc.

## 🌐 API Endpoints

### Users & Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user` - Get current user

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create new job (company only)
- `GET /api/jobs/:id` - Get job by ID
- `PUT /api/jobs/:id` - Update job (company only)
- `DELETE /api/jobs/:id` - Delete job (company only)

### Companies
- `GET /api/companies` - Get all companies
- `GET /api/companies/:id` - Get company by ID

### Applications
- `GET /api/applications` - Get user's applications
- `POST /api/applications` - Submit job application

### Categories & Resources
- `GET /api/categories` - Get job categories
- `GET /api/resources` - Get learning resources

## 🎯 Key Features Implemented

### ✅ Authentication & Authorization
- User registration/login with validation
- Role-based access control (Job Seeker, Company, Admin)
- Session management
- Protected routes

### ✅ Job Management
- Job posting for companies
- Job browsing for job seekers
- Job search and filtering
- Application submission

### ✅ Company Features
- Company profile creation during registration
- Company job listings
- Company information display
- 5 sample companies included

### ✅ User Experience
- Responsive design
- Loading states
- Error handling
- Form validation
- Consistent purple theme
- Mobile-first design

### ✅ Learning Resources
- 8 curated learning platforms
- Categorized resources (Programming Tutorials, Q&A Community, Coding Practice, Learning Platforms)
- External links to educational content

## 🚀 Running in Production

### Build the Application
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
SESSION_SECRET=your-secure-session-secret
PORT=5000
```

## 🔄 Migration to Database

The codebase is ready for database migration:

1. **Schema is defined** in `shared/schema.ts` using Drizzle ORM
2. **Storage interface** in `server/storage.ts` can be swapped
3. **Drizzle configuration** ready in `drizzle.config.ts`

To migrate to PostgreSQL:
1. Set up PostgreSQL database
2. Configure `DATABASE_URL` environment variable
3. Replace `MemStorage` with `DbStorage` in `server/storage.ts`
4. Run `npm run db:push` to create tables

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 5000 (macOS/Linux)
   lsof -ti:5000 | xargs kill -9
   
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

2. **Dependencies issues**
   ```bash
   # Clear npm cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors**
   ```bash
   # Run type checking
   npm run check
   ```

4. **Server not starting**
   - Make sure you're using `npm run dev` for development
   - Check if port 5000 is available
   - Try the alternative command: `node -r tsx/esm server/index.ts`

## 📱 Testing the Application

### Sample User Accounts
You can register new accounts with these roles:
- **Job Seeker**: Select "Find a job" during registration
- **Company**: Select "Hire talent" during registration

### Testing Features
1. **Registration**: Create accounts for both job seekers and companies
2. **Job Posting**: Login as a company and post new jobs
3. **Job Application**: Login as a job seeker and apply to jobs
4. **Company Browsing**: Visit `/companies` to see all registered companies
5. **Learning Resources**: Visit `/resources` to explore educational content

## 🎨 Customization

### Changing the Theme
Edit `theme.json` to customize colors:
```json
{
  "variant": "professional",
  "primary": "hsl(238 77% 64%)",
  "appearance": "light",
  "radius": 0.5
}
```

### Adding New Pages
1. Create new page component in `client/src/pages/`
2. Add route in `client/src/App.tsx`
3. Update navigation in `client/src/components/layout/navbar.tsx`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Additional Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui Components](https://ui.shadcn.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Passport.js](http://www.passportjs.org/)

---

**Note**: This application uses in-memory storage for development simplicity. No external database or authentication services required. For production deployment, consider migrating to a persistent database like PostgreSQL.