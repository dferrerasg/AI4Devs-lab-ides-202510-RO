import multer, { StorageEngine, FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';
import fs from 'fs';

const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage: StorageEngine = multer.diskStorage({
  destination: function (req: any, file: any, cb: (error: Error | null, destination: string) => void) {
    cb(null, uploadDir);
  },
  filename: function (req: any, file: any, cb: (error: Error | null, filename: string) => void) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

function fileFilter(req: any, file: any, cb: FileFilterCallback) {
  const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
  if (!allowedTypes.includes(file.mimetype)) {
    req.fileValidationError = 'Unsupported file type';
    return cb(null, false);
  }
  cb(null, true);
}

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB
});
