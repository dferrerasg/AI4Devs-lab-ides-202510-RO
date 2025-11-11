# Candidate Creation Feature: Backend Implementation Plan

## Overview
This plan details the steps to implement the backend functionality for allowing a recruiter to add a job candidate to the system, following DDD, TDD, and project security guidelines.

## Steps

### 1. Design Candidate Domain Model
- Define a `Candidate` entity in `backend/src/domain/` with fields:
  - name (string)
  - lastName (string)
  - email (string, encrypted)
  - phone (string, encrypted)
  - address (string, encrypted)
  - education (string, long text)
  - workingExperience (string, long text)
  - cvFilePath (string, optional)

### 2. Update Prisma Schema
- Add a `Candidate` model to `backend/prisma/schema.prisma`:
  - id (Int, auto-increment, primary key)
  - name (String)
  - lastName (String)
  - email (String, encrypted before saving)
  - phone (String, encrypted before saving)
  - address (String, encrypted before saving)
  - education (String)
  - workingExperience (String)
  - cvFilePath (String, optional)
  - createdAt (DateTime, default now)

### 3. Implement Encryption Utility
- Create a service in `backend/src/infrastructure/` for encrypting/decrypting sensitive fields using AES.
- Store encryption key in environment variables.
- Utility exposes encrypt/decrypt functions for use in repository/service.

### 4. Create Candidate Repository
- Implement repository pattern in `backend/src/infrastructure/` using Prisma Client.
- Handle encryption before saving and decryption when reading.
- Include error handling for DB connection issues.

### 5. Develop Application Service
- Service in `backend/src/application/` to handle candidate creation:
  - Validate all input fields (type, format, required)
  - Encrypt sensitive fields
  - Handle file upload logic
  - Return validation errors/status codes
  - Catch and handle DB errors

### 6. Implement File Upload Handling
- Use Express middleware (e.g., multer) for file uploads.
- Accept only PDF/DOCX files, max size 3 MB.
- Store files in `backend/uploads/` with unique filename.
- Pass file path to service/repository.

### 7. Create Express Controller & Route
- Add POST endpoint in `backend/src/presentation/` for candidate creation.
- Use file upload middleware.
- Validate request data and file type/size.
- Call application service.
- Return errors/status codes/messages.

### 8. Error Handling
- Centralized error handling middleware in Express.
- Return:
  - 400 for validation errors
  - 413 for file too large
  - 415 for unsupported file type
  - 500 for DB/server errors

### 9. Write Tests (TDD)
- Jest tests in `backend/src/tests/` for:
  - Domain model validation
  - Service logic (validation, encryption, file handling)
  - Repository (CRUD, error scenarios)
  - API endpoint (supertest)
  - Edge cases (invalid data, large files, unsupported types, DB errors)

### 10. Update Documentation
- Document endpoint in backend API docs:
  - Path and method (POST)
  - Required/optional fields, validation
  - File upload requirements
  - Example request/response
  - Error codes/messages

---

## Confirmation
Each step will be confirmed before implementation, as per your instructions.
