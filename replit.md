# MoshiDoki - Japan Discovery Platform

## Overview

MoshiDoki is a Japan-focused discovery platform that combines AI-powered search capabilities with real-time information and trending content. The application allows users to explore Japanese culture, anime, travel destinations, and language through an intelligent search interface powered by Perplexity AI. Built as a full-stack TypeScript application, it features a modern React frontend with shadcn/ui components and an Express.js backend with PostgreSQL database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript in SPA (Single Page Application) mode
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation resolvers
- **Animations**: GSAP loaded dynamically for smooth animations and scroll triggers

### Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Architecture**: RESTful API design with structured error handling
- **Session Management**: Express sessions with PostgreSQL session store
- **Build System**: Vite for frontend, esbuild for backend bundling

### Data Storage Solutions
- **Primary Database**: PostgreSQL configured through Neon Database serverless
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle Kit for database schema management
- **Session Storage**: PostgreSQL-backed session management using connect-pg-simple
- **Development Storage**: In-memory storage fallback for development scenarios

### Authentication and Authorization
- **Session-based Authentication**: Express sessions with PostgreSQL persistence
- **User Management**: Custom user storage interface with in-memory fallback
- **API Security**: Request validation using Zod schemas for type safety

### External Service Integrations
- **AI Search**: Perplexity AI integration for Japan-focused content discovery
- **Search Categories**: Specialized prompts for general, anime, travel, and language queries
- **API Configuration**: Environment-based API key management with fallback values

### Development and Build Configuration
- **Development**: Hot module replacement with Vite dev server integration
- **Production Build**: Optimized builds with code splitting and asset optimization
- **Type Safety**: Strict TypeScript configuration with path mapping for clean imports
- **Code Quality**: ESLint and TypeScript strict mode for code quality enforcement

### Key Design Patterns
- **Separation of Concerns**: Clear separation between client, server, and shared code
- **Type-safe API**: Shared Zod schemas between frontend and backend for consistent validation
- **Component Architecture**: Modular React components with shadcn/ui design system
- **Error Handling**: Centralized error handling with user-friendly toast notifications
- **Responsive Design**: Mobile-first approach with Tailwind CSS responsive utilities

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless database connectivity
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React routing solution
- **zod**: Runtime type validation and schema definition

### UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Type-safe variant-based styling
- **lucide-react**: Modern icon library for React applications

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking and modern JavaScript features
- **esbuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution environment for development

### Third-party Services
- **Perplexity AI API**: AI-powered search and content generation
- **GSAP**: Professional-grade animation library loaded via CDN
- **Google Fonts**: Web font delivery for typography

### Database and Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **drizzle-kit**: Database migration and schema management tool