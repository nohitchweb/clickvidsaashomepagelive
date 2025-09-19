# ClickVids SaaS Landing Page

This is a Next.js application for a SaaS landing page with authentication and settings management.

## Features

- Authentication system with Lucia
- Settings management API
- Admin dashboard with settings page
- PostgreSQL database integration
- Responsive UI components

## Setup Instructions

### Option 1: Using Docker (Recommended)
1. Clone the repository
2. Run the application with Docker:
   ```bash
   docker-compose up
   ```
   This will start both the PostgreSQL database and the application.

### Option 2: Manual Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Install PostgreSQL locally
   - Update `.env` with your database credentials
   - Run the initialization script:
   ```bash
   psql -U username -d database_name -f init.sql
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/settings` - Get current user settings
- `POST /api/settings` - Save user settings

## Admin Pages

- `/admin/settings` - Settings management page

## Database Schema

The application uses PostgreSQL with the following tables:
- `users` - User accounts
- `sessions` - Active user sessions
- `settings` - User-specific settings

## Component Integration

All web page builder components are now integrated with the settings system:
- Navigation bar respects theme settings
- Footer displays language-specific content
- Hero section adapts to user preferences
- Pricing section shows appropriate language content

## Security

- All settings operations require valid authentication
- Settings are tied to individual user accounts
- Secure token-based authentication using Lucia
