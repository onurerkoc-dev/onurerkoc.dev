# onurerkoc.dev

Personal full-stack build lab and engineering notebook of Onur Erkoç.

This project is not designed as a generic portfolio. It is structured as a professional engineering space where frontend experiments, backend systems, deployment notes, and real projects can evolve together.

## Goal

The goal of this project is to build a real-world full-stack personal platform step by step.

It is being developed to practice and document:

- React and Vite frontend development
- Java 21 and Spring Boot backend development
- REST API design
- Git and GitHub pull request workflow
- Docker-based deployment
- Linux server management
- Nginx reverse proxy setup
- PostgreSQL integration in future iterations

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Java 21
- Spring Boot
- REST API

### Planned Infrastructure

- PostgreSQL
- Docker
- Nginx
- DigitalOcean

## Project Structure


onurerkoc.dev/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.js
│   │   │   ├── healthApi.js
│   │   │   └── projectsApi.js
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/main/java/com/onurerkoc/backend/
│   │   ├── controller/
│   │   └── project/
│   └── pom.xml
│
└── README.md

Local Development

The frontend and backend run as separate applications during development.

1. Start the backend

Open a terminal in the project root:

cd backend
.\mvnw.cmd spring-boot:run

If Maven is installed globally, this can also be used:

mvn spring-boot:run

The backend runs on:

http://localhost:8080

Available API endpoints:

GET /api/health
GET /api/projects
GET /api/projects/{slug}
2. Start the frontend

Open a second terminal in the project root:

cd frontend
npm install
npm run dev

The frontend runs on:

http://localhost:5173
Frontend API Layer

Frontend API calls are centralized under:

frontend/src/api

Current API files:

client.js       -> shared API request helper
healthApi.js    -> backend health endpoint
projectsApi.js  -> project list and project detail endpoints

Components should not call backend endpoints directly with fetch('/api/...').

Instead, components should use API functions such as:

getBackendHealth()
getProjects()

This keeps React components focused on UI and state management, while API communication stays in one dedicated layer.

Current request flow:

React Component
  -> API function
  -> shared client
  -> Vite proxy
  -> Spring Boot endpoint
Environment Variables

Frontend environment variables are documented in:

frontend/.env.example

Current frontend environment variable:

VITE_API_BASE_URL=/api

During local development, Vite proxies /api requests to the Spring Boot backend:

Frontend: http://localhost:5173
Backend:  http://localhost:8080

So a frontend request to:

/api/projects

is proxied to:

http://localhost:8080/api/projects
Git Workflow

This project uses a feature branch workflow:

feature branch -> commit -> push -> pull request -> merge -> pull main

Example:

git checkout main
git pull origin main
git checkout -b feature/frontend-api-layer

After completing the work:

git add .
git commit -m "Add frontend API layer"
git push -u origin feature/frontend-api-layer

Then open a pull request on GitHub and merge it into main.

Current Status

Implemented:

React + Vite frontend
Java 21 + Spring Boot backend
/api/health endpoint
/api/projects endpoint
Frontend project modules section
Vite proxy for local API calls
Frontend API layer

Next planned improvements:

Improve backend project data model
Add project detail pages
Add PostgreSQL persistence
Add Docker setup
Deploy frontend and backend to a Linux server
