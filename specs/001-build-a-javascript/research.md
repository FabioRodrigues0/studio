# Research & Decisions for 3D JavaScript Portfolio

**Feature**: 3D JavaScript Portfolio Bedroom
**Spec**: `spec.md`

This document resolves ambiguities found in the feature specification and outlines the technical direction.

## 1. Navigation Controls

- **Decision**: Navigation will be controlled via keyboard (W, A, S, D) for movement and mouse for camera rotation.
- **Rationale**: This is a standard and intuitive control scheme for first-person 3D experiences on the web. The existing `OfficeScene.tsx` component already implements a basic version of this.
- **Alternatives Considered**: Mouse-only navigation (less immersive), gamepad support (out of scope for initial version).

## 2. Project Details (`FR-004`)

- **Decision**: The project browser will display the following fields for each project: `name`, `description`, `technologies`, `url`, and `githubUrl`.
- **Rationale**: This information is already available in the `src/app/data/projects.json` file and provides a comprehensive overview of each project.
- **Alternatives Considered**: Displaying more or fewer details. The current set is a good balance of information without being overwhelming.

## 3. Certifications (`FR-005`)

- **Decision**: Certifications will be represented by their `title`, `issuer`, and `date`. A link to the certificate will be opened in a new tab when the representation is clicked.
- **Rationale**: The data is available in `src/app/data/certifications.json`. Displaying these key details is sufficient for the portfolio.
- **Alternatives Considered**: Embedding the certificate image directly (could be complex to manage and layout).

## 4. Tech Stack (`FR-006`)

- **Decision**: The tech stack will be represented by books on a bookshelf. Each book will correspond to a technology from the `techStack` array in `src/lib/constants.ts`.
- **Rationale**: This is a creative and visually interesting way to represent the tech stack, as suggested in the user description. The data is readily available.
- **Alternatives Considered**: A simple list (less engaging).

## 5. Hobbies (`FR-007`)

- **Decision**: Hobbies will be represented by objects in the room, as defined in the `hobbies` array in `src/lib/constants.ts`.
- **Rationale**: This adds personality to the scene and makes it more engaging, as requested by the user. The data is readily available.
- **Alternatives Considered**: A dedicated "hobbies" section with text descriptions (less immersive).

## 6. Performance Metrics (`FR-008`)

- **Decision**: The target frame rate is a minimum of 30fps on modern hardware. Loading time should be under 5 seconds on a standard broadband connection.
- **Rationale**: These are reasonable performance targets for a web-based 3D application to ensure a "fluid and enjoyable" experience.
- **Alternatives Considered**: Higher frame rate targets (might require more optimization than is feasible for the initial version).

## 7. Technical Build Context

- **User provided constraint**: It is not necessary to run the development server (`npm run dev`) for every task.
- **Decision**: The build command (`npm run build`) MUST be run after any code change to ensure the project still compiles and there are no build errors. This will be a required step in the task list for any code modification tasks.
