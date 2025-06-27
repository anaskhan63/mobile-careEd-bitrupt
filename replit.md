# Mobile Care Dentistry - Replit Project Guide

## Overview

This is a full-stack web application for California Dental Board approved continuing education courses in mobile dentistry. The platform allows dental practitioners to browse courses, view course details, register for courses, and submit inquiries. It features a modern, responsive design with integrated payment processing capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with React Router (wouter)
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful APIs with JSON responses
- **Session Management**: Express sessions with PostgreSQL store

### Project Structure
- `client/` - React frontend application
- `server/` - Express.js backend server
- `shared/` - Shared TypeScript types and schemas
- `attached_assets/` - Static assets (logo, images)
- Database migrations handled by Drizzle Kit

## Key Components

### Database Schema
The application uses five main tables:
- **users**: Admin authentication (username/password)
- **courses**: Course catalog with pricing, CE credits, and features
- **courseSchedules**: Course scheduling with date ranges and participant limits
- **registrations**: Student registrations with payment tracking
- **inquiries**: Contact form submissions
- **testimonials**: Student testimonials and reviews

### Authentication & Authorization
- Session-based authentication for admin users
- No authentication required for course browsing and registration
- Payment processing integration with STAX payment gateway

### Course Management
- Dynamic course catalog with pricing and scheduling
- Course features stored as PostgreSQL arrays
- CE credit tracking for California Dental Board compliance
- Image support for course marketing materials

### Registration System
- Multi-step registration process with form validation
- Integrated payment processing
- Email and phone contact collection
- Dental license number verification required

## Data Flow

1. **Course Discovery**: Users browse courses via `/api/courses` endpoint
2. **Course Details**: Individual course data fetched via `/api/courses/:id`
3. **Registration**: Form submission to `/api/registrations` with payment processing
4. **Inquiries**: Contact form submissions to `/api/inquiries`
5. **Payment Processing**: Integrated STAX payment gateway for secure transactions

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe SQL query builder
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling and validation
- **zod**: Runtime type validation and schema definition

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives (20+ components)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Dependencies
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds
- **vite**: Frontend build tool and development server

## Deployment Strategy

### Development Environment
- Development server runs on port 5000
- Vite dev server with HMR (Hot Module Replacement)
- PostgreSQL database connection via environment variable
- Runtime error overlay for debugging

### Production Build Process
1. Frontend: `vite build` creates optimized static assets
2. Backend: `esbuild` bundles server code with external dependencies
3. Database: Drizzle migrations applied via `npm run db:push`
4. Deployment: Autoscale deployment target on Replit

### Environment Configuration
- **NODE_ENV**: Set to 'development' or 'production'
- **DATABASE_URL**: PostgreSQL connection string (required)
- Port configuration: Internal 5000, External 80

## Changelog

Changelog:
- June 27, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.