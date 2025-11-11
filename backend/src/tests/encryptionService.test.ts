process.env.ENCRYPTION_KEY = '12345678901234567890123456789012'; // 32 chars
import { encrypt, decrypt } from '../infrastructure/encryptionService';

describe('encryptionService', () => {
  const key = '12345678901234567890123456789012'; // 32 chars
  const originalEnv = process.env.ENCRYPTION_KEY;

  beforeAll(() => {
    process.env.ENCRYPTION_KEY = key;
  });

  afterAll(() => {
    process.env.ENCRYPTION_KEY = originalEnv;
  });

  it('should encrypt and decrypt text correctly', () => {
    const text = 'Sensitive Data';
    const encrypted = encrypt(text);
    expect(encrypted).not.toEqual(text);
    const decrypted = decrypt(encrypted);
    expect(decrypted).toEqual(text);
  });

  it('should throw error if key is missing or invalid', () => {
    process.env.ENCRYPTION_KEY = '';
    expect(() => encrypt('test')).toThrow();
    process.env.ENCRYPTION_KEY = key;
  });
});
