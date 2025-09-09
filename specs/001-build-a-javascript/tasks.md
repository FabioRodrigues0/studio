# Tasks: 3D JavaScript Portfolio Bedroom

**Input**: Design documents from `/specs/001-build-a-javascript/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Frontend Tasks

### Phase 3.1: Setup

- [x] T013 Create project structure using Next.js. (This is likely already done, but good to verify).
- [x] T014 Install dependencies: `babylonjs`, `@babylonjs/core`, `@babylonjs/loaders`, `@babylonjs/gui`.
- [x] T015 [P] Configure linting and formatting tools (ESLint, Prettier).

### Phase 3.2: Tests First

- [x] T016 [P] Create integration test for fetching projects in `tests/integration/test_fetch_projects.test.ts`.
- [x] T017 [P] Create integration test for fetching certifications in `tests/integration/test_fetch_certifications.test.ts`.

### Phase 3.3: Core Implementation

- [x] T018 Create a service to fetch data in `src/services/api.ts`.
- [x] T019 [P] Create the basic 3D scene with a camera and lighting in `src/components/polyfolio/OfficeScene.tsx`.
- [x] T020 [P] Implement first-person and orbital camera controls in `src/components/polyfolio/Controls.tsx`.
- [x] T021 [P] Create the 3D model for the computer.
- [x] T022 [P] Create the 3D model for the bookshelf.
- [x] T023 [P] Create the 3D models for the certification frames.
- [ ] T024 [P] Create the 3D models for the hobby objects (soccer ball, movie posters, popcorn).
- [ ] T025 Implement the logic to display projects when the computer is clicked in `src/components/polyfolio/AITool.tsx`.
- [ ] T026 Implement the logic to display certifications when the frames are clicked.
- [ ] T027 Implement the logic to display the tech stack on the bookshelf.
- [ ] T028 Implement the logic to display the hobby objects.

### Phase 3.4: Integration

- [ ] T029 Integrate the data fetching service with the components.

### Phase 3.5: Polish

- [ ] T031 [P] Write unit tests for components.
- [ ] T033 Optimize 3D assets for performance.
- [ ] T034 [P] Update `README.md` with instructions on how to run the project.