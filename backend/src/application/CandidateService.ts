import { CandidateRepository } from '../infrastructure/CandidateRepository';
import { Candidate } from '../domain/Candidate';

export class CandidateService {
  private repo: CandidateRepository;

  constructor(repo?: CandidateRepository) {
    this.repo = repo || new CandidateRepository();
  }

  validate(candidate: Candidate): string[] {
    const errors: string[] = [];
    if (!candidate.name || typeof candidate.name !== 'string') errors.push('Invalid name');
    if (!candidate.lastName || typeof candidate.lastName !== 'string') errors.push('Invalid lastName');
    if (!candidate.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(candidate.email)) errors.push('Invalid email');
    if (!candidate.phone || typeof candidate.phone !== 'string') errors.push('Invalid phone');
    if (!candidate.address || typeof candidate.address !== 'string') errors.push('Invalid address');
    if (!candidate.education || typeof candidate.education !== 'string') errors.push('Invalid education');
    if (!candidate.workingExperience || typeof candidate.workingExperience !== 'string') errors.push('Invalid workingExperience');
    // cvFilePath is optional
    return errors;
  }

  async createCandidate(candidate: Candidate, cvFilePath?: string): Promise<{ candidate?: Candidate; errors?: string[]; status: number }> {
    const errors = this.validate(candidate);
    if (errors.length) return { errors, status: 400 };
    try {
      const candidateData = { ...candidate, cvFilePath };
      const created = await this.repo.create(candidateData);
      return { candidate: created, status: 201 };
    } catch (error: any) {
      return { errors: [error.message], status: 500 };
    }
  }
}
