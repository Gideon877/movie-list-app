
# Movie App

## Overview
The **Movie App** is a React application built using TypeScript and Material-UI (MUI). It manages user interactions, displays movies, and interfaces with a NestJS backend API for handling a user's favorite movies. Zustand is used for lightweight and efficient state management, ensuring seamless user authentication and movie data handling.

## Features
- User authentication and session management.
- Display of movies with options to view, add, or remove from favorites.
- Responsive UI using Material-UI.
- State management with Zustand for efficient data flow.
- Integration with a NestJS API for backend operations.

## Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/movie-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd movie-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

4. Start the development server:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

5. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
movie-app/
│
├── src/
│   ├── components/          # Reusable UI components
│   ├── api/                 # API interaction functions
│   ├── store/               # Zustand state management
│   ├── utils/               # Helper functions and types
│   ├── pages/               # Main app pages
│   ├── App.tsx              # Main app component
│   └── index.tsx            # Entry point of the React app
│
├── public/                  # Public assets (e.g., index.html)
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation
```

## Usage

### Authentication
Users can log in to the app using their credentials, with authentication handled by the Zustand store. User data and authentication states are managed for a seamless experience.

### Movie Display
Movies can be viewed in a card format that shows the movie's poster and title. Additional information such as ratings, release dates, and genres is conditionally displayed when available.

### CRUD Operations
- **Add to Favorites**: Users can add movies to their favorite list.
- **Remove from Favorites**: Users can remove movies from their favorite list.
- **View Movie Details**: Clicking on a movie card opens a modal with detailed information.

## Technologies Used
- **React**: Frontend library for building user interfaces.
- **TypeScript**: Type-safe JavaScript for enhanced development.
- **Material-UI**: UI framework for styled components.
- **Zustand**: Lightweight state management library.
- **NestJS**: Backend framework (not included in this repo but part of the full project).

## Future Enhancements
- Add pagination or infinite scrolling for the movie list.
- Implement user profile management and movie recommendations.
- Integrate a search functionality for finding movies by title or genre.

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.