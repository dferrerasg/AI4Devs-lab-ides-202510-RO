# Project-Specific Copilot Instructions

## Project Overview
This is a full-stack Talent Tracking System (LTI) with:
- **Backend**: Node.js/Express with TypeScript, Prisma ORM, PostgreSQL
- **Frontend**: React with TypeScript, Create React App
- **Architecture**: Domain-Driven Design (DDD) and Test-Driven Development (TDD)

## Backend Guidelines

### Architecture & Structure
- Follow **Domain-Driven Design (DDD)** principles:
  - Organize code in `backend/src` with folders: `domain/`, `application/`, `infrastructure/`, `presentation/`
  - Place entities, value objects, and aggregates in `domain/`
  - Keep business logic separate from infrastructure concerns
  - Use repositories pattern for data access

### Code Style
- Use TypeScript with strict type checking (as configured in backend/tsconfig.json)
- Follow Express middleware patterns as shown in `backend/src/index.ts`
- Use Prisma Client for database operations
- Apply error handling middleware pattern
- Format code with Prettier using settings from `backend/.prettierrc`

### Testing (TDD)
- Write tests **before** implementation using Jest
- Place tests in `backend/src/tests` following jest.config.js
- Use supertest for API endpoint testing as shown in `backend/src/tests/app.test.ts`
- Aim for high test coverage of business logic

### Database
- Define models in `backend/prisma/schema.prisma`
- Use proper PostgreSQL relations (one-to-many, many-to-many)
- Never store sensitive data in plain text (use encryption/hashing)
- Use environment variables from `backend/.env` for database connection
- Follow Prisma naming conventions for models and fields

## Frontend Guidelines

### React Best Practices
- Use functional components with TypeScript
- Follow component structure from `frontend/src/App.tsx`
- Keep components modular and reusable
- Use React hooks appropriately
- Place tests in `frontend/src/tests` using React Testing Library as shown in `frontend/src/tests/App.test.tsx`

### Accessibility (a11y)
- Include semantic HTML elements
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Maintain proper color contrast ratios
- Test with screen readers

### Responsive Design
- Use CSS media queries for different breakpoints
- Implement mobile-first approach
- Test on various device sizes
- Use flexible layouts (flexbox, grid)
- Follow styling patterns from `frontend/src/App.css`

### TypeScript
- Use strict type checking from `frontend/tsconfig.json`
- Define interfaces for props and state
- Avoid `any` type unless absolutely necessary

## General Guidelines

### Environment & Configuration
- Use Docker Compose as configured in `docker-compose.yml` for PostgreSQL
- Respect `.gitignore` rules
- Never commit sensitive data or `.env` files

### Code Quality
- Run linting before committing
- Follow existing code formatting
- Write clear, self-documenting code
- Add comments for complex business logic

### Development Workflow
- Start backend: `cd backend && npm run dev`
- Start frontend: `cd frontend && npm start`
- Run backend tests: `cd backend && npm test`
- Run frontend tests: `cd frontend && npm test`
- Build production: Follow scripts in `backend/package.json` and `frontend/package.json`

## Suggested Code Patterns

When generating code:
1. **Backend controllers**: Use async/await with proper error handling
2. **Prisma queries**: Use type-safe client methods
3. **React components**: Export functional components with typed props
4. **Tests**: Follow AAA pattern (Arrange, Act, Assert)
5. **API routes**: Define in Express router with proper HTTP methods

## Security Reminders
- Validate all user inputs
- Sanitize database queries (Prisma handles this)
- Use environment variables for secrets
- Implement authentication/authorization when needed
- Use HTTPS in production
