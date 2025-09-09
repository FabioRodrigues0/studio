import { getProjects } from '../../src/services/api';

describe('getProjects', () => {
  it('should return an array of projects', async () => {
    const projects = await getProjects();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0]).toHaveProperty('name');
    expect(projects[0]).toHaveProperty('description');
    expect(projects[0]).toHaveProperty('technologies');
    expect(projects[0]).toHaveProperty('url');
    expect(projects[0]).toHaveProperty('githubUrl');
  });
});