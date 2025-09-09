export interface Certification {
  id: string;
  title: string;
  issuer: string;
  imageUrl: string;
  link: string;
}

export interface Tech {
  id: string;
  name: string;
  description: string;
}

export interface Hobby {
  id: string;
  name: string;
  description: string;
}

export const certifications: Certification[] = [
  {
    id: 'cert-1',
    title: 'Professional Cloud Architect',
    issuer: 'Google Cloud',
    imageUrl: 'https://picsum.photos/300/200?random=1',
    link: 'https://cloud.google.com/certification/cloud-architect',
  },
  {
    id: 'cert-2',
    title: 'Solutions Architect - Associate',
    issuer: 'Amazon Web Services',
    imageUrl: 'https://picsum.photos/300/200?random=2',
    link: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/',
  },
  {
    id: 'cert-3',
    title: 'Azure Fundamentals',
    issuer: 'Microsoft',
    imageUrl: 'https://picsum.photos/300/200?random=3',
    link: 'https://learn.microsoft.com/en-us/credentials/certification/azure-fundamentals/',
  },
];

export const techStack: Tech[] = [
  {
    id: 'tech-react',
    name: 'React',
    description: 'A JavaScript library for building user interfaces.',
  },
  {
    id: 'tech-nextjs',
    name: 'Next.js',
    description: 'The React Framework for Production.',
  },
  {
    id: 'tech-babylon',
    name: 'Babylon.js',
    description:
      'A powerful, beautiful, simple, and open game and rendering engine.',
  },
  {
    id: 'tech-node',
    name: 'Node.js',
    description: "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
  },
  {
    id: 'tech-ts',
    name: 'TypeScript',
    description:
      'A typed superset of JavaScript that compiles to plain JavaScript.',
  },
];

export const hobbies: Hobby[] = [
  { id: 'hobby-soccer', name: 'Soccer', description: 'The beautiful game.' },
  {
    id: 'hobby-movie',
    name: 'Movies',
    description: 'Action, Sci-Fi, and everything in between.',
  },
  {
    id: 'hobby-popcorn',
    name: 'Popcorn',
    description: 'The perfect movie snack.',
  },
];
