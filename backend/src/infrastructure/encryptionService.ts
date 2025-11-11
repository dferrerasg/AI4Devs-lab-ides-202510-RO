import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '';
const IV_LENGTH = 16;

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
  throw new Error('ENCRYPTION_KEY must be set in environment and be 32 characters long');
}

export function encrypt(text: string): string {
  const key = process.env.ENCRYPTION_KEY || '';
  if (!key || key.length !== 32) {
    throw new Error('ENCRYPTION_KEY must be set in environment and be 32 characters long');
  }
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text: string): string {
  const key = process.env.ENCRYPTION_KEY || '';
  if (!key || key.length !== 32) {
    throw new Error('ENCRYPTION_KEY must be set in environment and be 32 characters long');
  }
  const textParts = text.split(':');
  const iv = Buffer.from(textParts[0], 'hex');
  const encryptedText = Buffer.from(textParts[1], 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
