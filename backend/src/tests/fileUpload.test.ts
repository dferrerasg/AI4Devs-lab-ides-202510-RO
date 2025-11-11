import request from 'supertest';
import express from 'express';
import path from 'path';
import { upload } from '../infrastructure/fileUpload';

describe('File Upload Middleware', () => {
  const app = express();
  app.post('/upload', upload.single('cv'), (req, res) => {
    if ((req as any).fileValidationError) {
      return res.status(400).send((req as any).fileValidationError);
    }
    if (!req.file) return res.status(400).send('No file uploaded');
    res.status(200).json({ filePath: req.file.path });
  });

  it('should accept PDF files', async () => {
    const res = await request(app)
      .post('/upload')
      .attach('cv', path.join(__dirname, 'test.pdf'));
    expect(res.status).toBe(200);
    expect(res.body.filePath).toMatch(/uploads/);
  });

  it('should reject unsupported file types', async () => {
    const res = await request(app)
      .post('/upload')
      .attach('cv', path.join(__dirname, 'test.txt'));
    expect(res.status).toBe(400);
  });

  it('should reject files larger than 3MB', async () => {
    // Simulate large file upload
    // ...
  });
});
