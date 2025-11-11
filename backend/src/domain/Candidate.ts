export interface Candidate {
  id?: number;
  name: string;
  lastName: string;
  email: string; // encrypted
  phone: string; // encrypted
  address: string; // encrypted
  education: string;
  workingExperience: string;
  cvFilePath?: string;
  createdAt?: Date;
}
