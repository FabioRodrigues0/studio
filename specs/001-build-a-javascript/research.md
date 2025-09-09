# Research: 3D JavaScript Portfolio Bedroom

**Date**: 2025-09-09

This document summarizes the research and decisions made to resolve the `NEEDS CLARIFICATION` items from the feature specification.

## 1. Navigation Controls

**Decision**: Use `OrbitControls` from Three.js.

**Rationale**: `OrbitControls` provides a user-friendly way to navigate a 3D scene. It allows users to orbit around a central point, zoom in and out, and pan the camera. This is ideal for exploring a room-sized environment without the steep learning curve of more complex controls like `FlyControls` or the FPS-style interaction of `PointerLockControls`.

**Alternatives considered**:
- `PointerLockControls`: More suited for first-person games, which is not the desired experience.
- `FlyControls`: Can be disorienting for users not accustomed to 3D navigation.
- `TrackballControls`: Similar to `OrbitControls`, but allows for more free-form rotation, which can lead to a confusing user experience.

## 2. Displaying Project Details

**Decision**: Display project details in a 2D UI modal that appears when the user interacts with the computer model in the 3D scene.

**Rationale**: A 2D UI is the most effective way to present detailed information like project descriptions, technologies used, and links. It's a familiar interaction for users and avoids the complexity of rendering and interacting with text in a 3D environment.

**Alternatives considered**:
- Displaying text directly in the 3D scene: This is difficult to read and interact with, and can be computationally expensive.
- A 3D "cityscape" visualization: While creative, this is overly complex for the scope of this project.

## 3. Representing Certifications

**Decision**: Represent certifications as paintings on the wall of the 3D bedroom. When a user clicks on a painting, a UI element will display the certification details.

**Rationale**: This is a literal and intuitive representation that fits the bedroom theme. It allows for a clean and visually appealing presentation of the certifications.

**Alternatives considered**:
- 3D models of trophies or medals: This could be visually cluttered and might not be as easily recognizable as paintings.
- Abstract representations: These could be confusing for the user.

## 4. Representing the Tech Stack

**Decision**: Represent the tech stack as a collection of books on a bookshelf. Each book's spine will feature the logo of a technology. Clicking on a book will reveal more information.

**Rationale**: This is a creative and thematic way to visualize the tech stack. It's more engaging than a simple list and fits well within the bedroom environment.

**Alternatives considered**:
- A simple 2D list: Less engaging and doesn't take advantage of the 3D environment.
- Other 3D objects: Books are a natural fit for a bookshelf and are easily associated with knowledge and learning.

## 5. Representing Hobbies

**Decision**: Use literal 3D object representations for hobbies.

**Rationale**: Direct, recognizable objects are the clearest way to communicate hobbies. For example, a game controller for gaming, a book for reading, or a musical instrument for music. These objects will be placed naturally within the 3D room to add to the ambiance.

**Alternatives considered**:
- Abstract visualizations: These can be ambiguous and less impactful than direct representations.
- Interactive dioramas: While immersive, creating a detailed diorama for each hobby is beyond the current scope.

## 6. Metrics for a Fluid and Enjoyable User Experience

**Decision**: Focus on both performance and engagement metrics.

**Rationale**: A good user experience is a combination of a technically performant application and an engaging interface.

**Performance Metrics (Fluidity)**:
- **Frame Rate (FPS)**: Target 60 FPS for smooth visuals.
- **Loading Time**: Aim for an initial load time of less than 5 seconds.
- **Draw Calls & Memory Usage**: Monitor and optimize to ensure the application runs efficiently on a variety of devices.

**Engagement Metrics (Enjoyment)**:
- **Session Duration**: Track how long users spend in the application.
- **Interaction with 3D Elements**: Monitor which objects users interact with to understand what they find most engaging.