process.env.ENCRYPTION_KEY = '12345678901234567890123456789012';
import { CandidateService } from '../application/CandidateService';
import { Candidate } from '../domain/Candidate';

describe('CandidateService', () => {
  let service: CandidateService;

  beforeAll(() => {
    service = new CandidateService();
  });

  it('should validate candidate fields', () => {
    const candidate: Candidate = {
      name: '',
      lastName: '',
      email: 'invalid',
      phone: '',
      address: '',
      education: '',
      workingExperience: '',
      cvFilePath: undefined,
    };
    const errors = service.validate(candidate);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should return 400 for invalid candidate', async () => {
    const candidate: Candidate = {
      name: '',
      lastName: '',
      email: 'invalid',
      phone: '',
      address: '',
      education: '',
      workingExperience: '',
      cvFilePath: undefined,
    };
    const result = await service.createCandidate(candidate);
    expect(result.status).toBe(400);
    expect(result.errors).toBeDefined();
  });

  it('should return 201 for valid candidate', async () => {
    const candidate: Candidate = {
      name: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      phone: '1234567890',
      address: '456 Main St',
      education: 'MSc Engineering',
      workingExperience: '3 years at DevInc',
      cvFilePath: undefined,
    };
    // Mock repo.create if needed
    // ...
    // expect result.status toBe 201
  });

  it('should handle DB errors', async () => {
    // Simulate DB error and expect status 500
    // ...
  });
});
