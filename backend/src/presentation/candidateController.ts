import express, { Request, Response, NextFunction } from 'express';
import { CandidateService } from '../application/CandidateService';
import { upload } from '../infrastructure/fileUpload';

const router = express.Router();
const candidateService = new CandidateService();

router.post('/candidates', upload.single('cv'), async (req: any, res: any, next: any) => {
  try {
    // Validate file
    if (req.file) {
      if (req.file.size > 3 * 1024 * 1024) {
        return res.status(413).json({ error: 'File too large' });
      }
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
      if (!allowedTypes.includes(req.file.mimetype)) {
        return res.status(415).json({ error: 'Unsupported file type' });
      }
    }
    // Validate body
    const candidateData = {
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      education: req.body.education,
      workingExperience: req.body.workingExperience,
      cvFilePath: req.file ? req.file.path : undefined,
    };
    const result = await candidateService.createCandidate(candidateData, candidateData.cvFilePath);
    if (result.errors) {
      return res.status(result.status).json({ errors: result.errors });
    }
    return res.status(result.status).json({ candidate: result.candidate });
  } catch (error) {
    next(error);
  }
});

export default router;
