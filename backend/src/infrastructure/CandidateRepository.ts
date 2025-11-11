import { PrismaClient } from '@prisma/client';
import { Candidate } from '../domain/Candidate';
import { encrypt, decrypt } from './encryptionService';

const prisma = new PrismaClient();

export class CandidateRepository {
  async create(candidate: Candidate): Promise<Candidate> {
    try {
      const encryptedCandidate = {
        ...candidate,
        email: encrypt(candidate.email),
        phone: encrypt(candidate.phone),
        address: encrypt(candidate.address),
      };
      const created = await prisma.candidate.create({ data: encryptedCandidate });
      return {
        ...created,
        email: decrypt(created.email),
        phone: decrypt(created.phone),
        address: decrypt(created.address),
        cvFilePath: created.cvFilePath ?? undefined,
      };
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number): Promise<Candidate | null> {
    const candidate = await prisma.candidate.findUnique({ where: { id } });
    if (!candidate) return null;
    return {
      ...candidate,
      email: decrypt(candidate.email),
      phone: decrypt(candidate.phone),
      address: decrypt(candidate.address),
      cvFilePath: candidate.cvFilePath ?? undefined,
    };
  }

  // Add more repository methods as needed
}
