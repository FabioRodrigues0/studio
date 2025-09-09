# Quickstart: 3D JavaScript Portfolio Bedroom

**Date**: 2025-09-09

This guide provides instructions on how to set up and run the 3D JavaScript Portfolio Bedroom project.

## Prerequisites

- Node.js (v18 or later)
- npm or yarn

## Installation

1. Clone the repository.
2. Install the dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

## Running the Application

To start the development server, run:

```bash
npm run dev
```

or

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Testing

To run the tests, use the following command:

```bash
npm test
```

or

```bash
yarn test
```

This will run both component and integration tests.

## Data

The application's data is sourced from JSON files located in the `src/app/data` directory:

- `projects.json`: Contains information about the projects displayed on the computer.
- `certifications.json`: Contains information about the certifications displayed on the wall.
- `technologies.json`: Contains information about the technologies displayed on the bookshelf.
- `hobbies.json`: Contains information about the hobbies represented in the room.

These files must conform to the JSON schemas defined in `specs/001-build-a-javascript/contracts/`.