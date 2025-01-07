import crypto from 'crypto';

export const generateNameHash = (message) => {
  const hash = crypto.createHash('md5');
  hash.update(message);
  return hash.digest('hex');
}
