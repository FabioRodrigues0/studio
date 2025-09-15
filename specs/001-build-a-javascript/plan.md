# Implementation Plan: 3D JavaScript Portfolio Bedroom

**Branch**: `001-build-a-javascript` | **Date**: 2025-09-10 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/001-build-a-javascript/spec.md`

## Execution Flow (/plan command scope)

```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
4. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
5. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, or `GEMINI.md` for Gemini CLI).
6. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
7. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
8. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:

- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary

This feature will create an interactive 3D portfolio representing a bedroom. Users can explore the room to find and interact with objects representing the owner's projects, certifications, and skills. The primary technical approach is to use Next.js and Babylon.js to create the 3D experience, with data for the portfolio items stored in local JSON files.

## Technical Context

**Language/Version**: TypeScript (v5)
**Primary Dependencies**: Next.js, React, Babylon.js
**Storage**: JSON files (`projects.json`, `certifications.json`)
**Testing**: Jest
**Target Platform**: Web Browser
**Project Type**: Web Application
**Performance Goals**: >30fps, <5s load time
**Constraints**: Build (`npm run build`) must succeed after any code change.
**Scale/Scope**: Single-page portfolio application.

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

**Simplicity**:

- Projects: 1 (Next.js app)
- Using framework directly? Yes
- Single data model? Yes
- Avoiding patterns? Yes

**Architecture**:

- EVERY feature as library? No, this is a single application.
- Libraries listed: N/A
- CLI per library: N/A
- Library docs: N/A

**Testing (NON-NEGOTIABLE)**:

- RED-GREEN-Refactor cycle enforced? Yes
- Git commits show tests before implementation? Yes
- Order: Contract→Integration→E2E→Unit strictly followed? Yes
- Real dependencies used? Yes
- Integration tests for: new libraries, contract changes, shared schemas? Yes
- FORBIDDEN: Implementation before test, skipping RED phase. Yes

**Observability**:

- Structured logging included? No
- Frontend logs → backend? No
- Error context sufficient? Yes

**Versioning**:

- Version number assigned? No
- BUILD increments on every change? No
- Breaking changes handled? N/A

## Project Structure

### Documentation (this feature)

```
specs/001-build-a-javascript/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
│   ├── project.schema.json
│   ├── certification.schema.json
│   ├── technology.schema.json
│   └── hobby.schema.json
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)

```
# Option 2: Web application (when "frontend" + "backend" detected)
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/
```

**Structure Decision**: Option 2: Web Application. The project is a Next.js application, which acts as both frontend and backend.

## Phase 0: Outline & Research

Completed. See `research.md`.

## Phase 1: Design & Contracts

Completed. See `data-model.md`, `contracts/`, and `quickstart.md`.

## Phase 2: Task Planning Approach

_This section describes what the /tasks command will do - DO NOT execute during /plan_

**Task Generation Strategy**:

- Load `/templates/tasks-template.md` as base.
- Generate tasks from the `quickstart.md` verification steps.
- For each data model in `data-model.md`, create a task to validate the corresponding JSON file against its schema in `contracts/`.
- Create tasks for implementing the UI components and interactions described in the spec.
- For each code modification, include a step to run `npm run build` to ensure the build is not broken.

**Ordering Strategy**:

- TDD order: Tests before implementation.
- Dependency order: Data schemas and models first, then UI components, then interactions.
- Mark [P] for parallel execution (e.g., creating multiple components that don't depend on each other).

**Estimated Output**: ~15-20 numbered, ordered tasks in `tasks.md`.

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation

_These phases are beyond the scope of the /plan command_

**Phase 3**: Task execution (/tasks command creates tasks.md)
**Phase 4**: Implementation (execute tasks.md following constitutional principles)
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking

No violations to report.

## Progress Tracking

_This checklist is updated during execution flow_

**Phase Status**:

- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:

- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented

---

_Based on Constitution v2.1.1 - See `/memory/constitution.md`_