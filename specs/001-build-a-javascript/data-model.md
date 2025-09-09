# Data Model: 3D JavaScript Portfolio Bedroom

**Date**: 2025-09-09

This document defines the data structures for the key entities in the 3D JavaScript Portfolio Bedroom feature.

## 1. Project

Represents a professional or learning project.

**Attributes**:

- `id` (string, required): A unique identifier for the project.
- `name` (string, required): The name of the project.
- `description` (string, required): A detailed description of the project.
- `technologies` (array of strings, required): A list of technology IDs used in the project.
- `imageUrl` (string, required): URL for an image representing the project.
- `projectUrl` (string, optional): A link to the live project.
- `repositoryUrl` (string, optional): A link to the project's source code repository.

**Example**:

```json
{
  "id": "proj-001",
  "name": "3D Portfolio",
  "description": "An interactive 3D portfolio website built with Three.js and React.",
  "technologies": ["tech-001", "tech-002", "tech-003"],
  "imageUrl": "/images/projects/portfolio.png",
  "projectUrl": "https://portfolio.example.com",
  "repositoryUrl": "https://github.com/user/portfolio"
}
```

## 2. Certification

Represents a professional certification.

**Attributes**:

- `id` (string, required): A unique identifier for the certification.
- `name` (string, required): The name of the certification.
- `issuingOrganization` (string, required): The organization that issued the certification.
- `dateObtained` (string, required): The date the certification was obtained (YYYY-MM-DD).
- `imageUrl` (string, required): URL for an image of the certificate or logo.
- `verificationUrl` (string, optional): A link to verify the certification.

**Example**:

```json
{
  "id": "cert-001",
  "name": "Certified JavaScript Developer",
  "issuingOrganization": "JavaScript Institute",
  "dateObtained": "2024-08-15",
  "imageUrl": "/images/certifications/js-developer.png",
  "verificationUrl": "https://certificates.example.com/verify/12345"
}
```

## 3. Technology

Represents a technology in the tech stack.

**Attributes**:

- `id` (string, required): A unique identifier for the technology.
- `name` (string, required): The name of the technology.
- `type` (string, required): The type of technology (e.g., "Language", "Framework", "Library", "Database").
- `logoUrl` (string, required): URL for the technology's logo.

**Example**:

```json
{
  "id": "tech-001",
  "name": "React",
  "type": "Library",
  "logoUrl": "/images/tech/react.svg"
}
```

## 4. Hobby

Represents a hobby or interest.

**Attributes**:

- `id` (string, required): A unique identifier for the hobby.
- `name` (string, required): The name of the hobby.
- `description` (string, required): A short description of the hobby.
- `modelUrl` (string, required): URL for the 3D model representing the hobby.

**Example**:

```json
{
  "id": "hobby-001",
  "name": "Gaming",
  "description": "I enjoy playing a variety of video games in my free time.",
  "modelUrl": "/models/hobbies/game-controller.glb"
}
```