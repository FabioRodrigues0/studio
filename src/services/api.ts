import { promises as fs } from 'fs';
import path from 'path';

export async function getProjects() {
  const filePath = path.join(process.cwd(), 'src', 'app', 'data', 'projects.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const projects = JSON.parse(fileContents);
  return projects;
}

export async function getCertifications() {
  const filePath = path.join(process.cwd(), 'src', 'app', 'data', 'certifications.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const certifications = JSON.parse(fileContents);
  return certifications;
}
