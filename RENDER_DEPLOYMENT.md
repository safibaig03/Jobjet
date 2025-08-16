# Deploying JobJet to Render

This guide provides step-by-step instructions for deploying the JobJet application to Render, an alternative to Vercel that provides better support for full-stack applications with both frontend and backend components.

## Prerequisites

1. A Render account (sign up at https://render.com)
2. A PostgreSQL database (you can use Render's PostgreSQL service or an external provider like Neon)

## Deployment Steps

### 1. Set Up a PostgreSQL Database

#### Option A: Using Render's PostgreSQL Service

1. Log in to your Render dashboard
2. Click on "New" and select "PostgreSQL"
3. Configure your database:
   - Name: `jobjet-db`
   - Database: `jobjet`
   - User: `jobjet_user`
   - Select a region close to your users
   - Choose a plan (Free tier is available for testing)
4. Click "Create Database"
5. Once created, note the "External Database URL" - you'll need this for the next step

#### Option B: Using Neon (or another PostgreSQL provider)

1. Create a PostgreSQL database with your provider
2. Note the connection string

### 2. Deploy the Web Service

1. From your Render dashboard, click "New" and select "Web Service"
2. Connect your GitHub repository
3. Configure the web service:
   - Name: `jobjet`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
4. Add the following environment variables:
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: Your PostgreSQL connection string from step 1
   - `SESSION_SECRET`: A secure random string for session encryption
   - `SERVER_URL`: Leave blank for now (will update after deployment)
5. Click "Create Web Service"

### 3. Update SERVER_URL

After your service is deployed:

1. Go to your web service settings
2. Note the URL of your deployed application (e.g., `https://jobjet.onrender.com`)
3. Update the `SERVER_URL` environment variable with this URL
4. Save changes and trigger a manual deploy

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues:

1. Verify your `DATABASE_URL` is correct
2. Ensure your database allows connections from Render's IP addresses
3. Check that the database user has appropriate permissions

### Session Management

The application uses a memory store for sessions in production, which is suitable for a single instance. For a multi-instance setup, consider using a Redis-based session store.

### Registration Issues

If user registration fails:

1. Check the server logs for specific error messages
2. Verify that the database connection is working properly
3. Ensure that the database schema is correctly set up (run migrations if needed)

## Monitoring

Render provides built-in logging and monitoring tools:

1. Navigate to your web service in the Render dashboard
2. Click on "Logs" to view application logs
3. Set up alerts for service health and performance

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Node.js on Render](https://render.com/docs/deploy-node-express-app)
- [PostgreSQL on Render](https://render.com/docs/databases)