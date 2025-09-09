import { getCertifications } from '../../src/services/api';

describe('getCertifications', () => {
  it('should return an array of certifications', async () => {
    const certifications = await getCertifications();
    expect(Array.isArray(certifications)).toBe(true);
    expect(certifications.length).toBeGreaterThan(0);
    expect(certifications[0]).toHaveProperty('name');
    expect(certifications[0]).toHaveProperty('issuer');
    expect(certifications[0]).toHaveProperty('url');
  });
});