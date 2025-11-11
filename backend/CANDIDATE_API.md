# Candidate Creation API Documentation

## Endpoint

- **Path:** `/candidates`
- **Method:** `POST`

## Request

- **Content-Type:** `multipart/form-data`
- **Fields:**
  - `name` (string, required)
  - `lastName` (string, required)
  - `email` (string, required, encrypted)
  - `phone` (string, required, encrypted)
  - `address` (string, required, encrypted)
  - `education` (string, required)
  - `workingExperience` (string, required)
  - `cv` (file, optional, PDF/DOCX, max 3MB)

## Validation

- All fields are validated for type and format.
- Only PDF/DOCX files accepted for `cv`.
- Max file size: 3MB.

## Example Request

```http
POST /candidates
Content-Type: multipart/form-data

name=Jane
lastName=Doe
email=jane.doe@example.com
phone=1234567890
address=123 Main St
education=MSc Engineering
workingExperience=3 years at DevInc
cv=@/path/to/cv.pdf
```

## Example Response

- **Success (201):**

```json
{
  "candidate": {
    "id": 1,
    "name": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "phone": "1234567890",
    "address": "123 Main St",
    "education": "MSc Engineering",
    "workingExperience": "3 years at DevInc",
    "cvFilePath": "uploads/123456789-cv.pdf",
    "createdAt": "2025-11-11T10:00:00.000Z"
  }
}
```

- **Validation Error (400):**

```json
{
  "errors": ["Invalid email"]
}
```

- **File Too Large (413):**

```json
{
  "error": "File too large"
}
```

- **Unsupported File Type (415):**

```json
{
  "error": "Unsupported file type"
}
```

- **Server/DB Error (500):**

```json
{
  "errors": ["Database connection error"]
}
```

## Security

- Sensitive fields (`email`, `phone`, `address`) are encrypted before storage.
- All user input is validated and sanitized.

## Notes

- Uploaded files are stored in `backend/uploads/` with unique filenames.
- Only recruiters with proper authorization should access this endpoint (future enhancement).
# Candidate Creation API Documentation

## Endpoint
- **Path:** `/candidates`
- **Method:** `POST`

## Request
- **Content-Type:** `multipart/form-data`
- **Fields:**
  - `name` (string, required)
  - `lastName` (string, required)
  - `email` (string, required, encrypted)
  - `phone` (string, required, encrypted)
  - `address` (string, required, encrypted)
  - `education` (string, required)
  - `workingExperience` (string, required)
  - `cv` (file, optional, PDF/DOCX, max 3MB)

## Validation
- All fields are validated for type and format.
- Only PDF/DOCX files accepted for `cv`.
- Max file size: 3MB.

## Example Request
```http
POST /candidates
Content-Type: multipart/form-data

name=Jane
lastName=Doe
email=jane.doe@example.com
phone=1234567890
address=123 Main St
education=MSc Engineering
workingExperience=3 years at DevInc
cv=@/path/to/cv.pdf
```

## Example Response
- **Success (201):**
```json
{
  "candidate": {
    "id": 1,
    "name": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "phone": "1234567890",
    "address": "123 Main St",
    "education": "MSc Engineering",
    "workingExperience": "3 years at DevInc",
    "cvFilePath": "uploads/123456789-cv.pdf",
    "createdAt": "2025-11-11T10:00:00.000Z"
  }
}
```
- **Validation Error (400):**
```json
{
  "errors": ["Invalid email"]
}
```
- **File Too Large (413):**
```json
{
  "error": "File too large"
}
```
- **Unsupported File Type (415):**
```json
{
  "error": "Unsupported file type"
}
```
- **Server/DB Error (500):**
```json
{
  "errors": ["Database connection error"]
}
```

## Security
- Sensitive fields (`email`, `phone`, `address`) are encrypted before storage.
- All user input is validated and sanitized.

## Notes
- Uploaded files are stored in `backend/uploads/` with unique filenames.
- Only recruiters with proper authorization should access this endpoint (future enhancement).
