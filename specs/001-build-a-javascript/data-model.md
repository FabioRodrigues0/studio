# Data Model for 3D JavaScript Portfolio

**Feature**: 3D JavaScript Portfolio Bedroom

This document defines the data structures for the key entities in the feature.

## 1. Project

Represents a professional or learning project.

- **`name`**: `string` - The name of the project.
- **`description`**: `string` - A brief description of the project.
- **`technologies`**: `string[]` - A list of technologies used in the project.
- **`url`**: `string` (URL) - A link to the live project.
- **`githubUrl`**: `string` (URL) - A link to the project's GitHub repository.

**Validation Rules**:
- `name` and `url` are required.

**Example**:
```json
{
  "name": "Project 1",
  "description": "This is the first project.",
  "technologies": ["React", "TypeScript"],
  "url": "https://example.com/project1",
  "githubUrl": "https://github.com/user/project1"
}
```

## 2. Certification

Represents a professional certification.

- **`title`**: `string` - The name of the certification.
- **`issuer`**: `string` - The organization that issued the certification.
- **`date`**: `string` - The date the certification was obtained.
- **`link`**: `string` (URL) - A link to the certification credential.

**Validation Rules**:
- `title` and `link` are required.

**Example**:
```json
{
  "title": "Certified Kubernetes Administrator (CKA)",
  "issuer": "The Linux Foundation",
  "date": "2023-01-15",
  "link": "https://www.credly.com/badges/badge-id"
}
```

## 3. Technology

Represents a technology in the tech stack.

- **`id`**: `string` - A unique identifier for the technology.
- **`name`**: `string` - The name of the technology.

**Validation Rules**:
- `id` and `name` are required.

**Example**:
```json
{
  "id": "react",
  "name": "React"
}
```

## 4. Hobby

Represents a hobby.

- **`id`**: `string` - A unique identifier for the hobby.
- **`name`**: `string` - The name of the hobby.

**Validation Rules**:
- `id` and `name` are required.

**Example**:
```json
{
  "id": "soccer",
  "name": "Soccer"
}
```
