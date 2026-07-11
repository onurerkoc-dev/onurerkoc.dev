# onurerkoc.dev

Personal full-stack build lab and engineering notebook of Onur Erkoç.

`onurerkoc.dev` is not designed as a generic portfolio. It is an evolving engineering space where frontend development, backend systems, architectural decisions, deployment experiments, and real-world projects are documented together.

## About the Project

The goal of this project is to build a production-oriented personal platform step by step while documenting the engineering process behind it.

The project is being developed to practice and demonstrate:

- React and Vite frontend development
- Java 21 and Spring Boot backend development
- REST API design
- Client-side routing
- Frontend API architecture
- Full-stack form handling
- Git and GitHub pull request workflow
- PostgreSQL persistence
- Docker-based deployment
- Linux server management
- Nginx reverse proxy configuration
- Production deployment on DigitalOcean

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- React Router
- CSS

### Backend

- Java 21
- Spring Boot
- REST API

### Planned Infrastructure

- PostgreSQL
- Docker
- Docker Compose
- Nginx
- DigitalOcean
- HTTPS

## Current Architecture

```text
React Frontend
  -> Frontend API Layer
  -> Vite Development Proxy
  -> Spring Boot REST Controller
  -> Service Layer
  -> DTO
  -> In-memory Data
```

Project data is currently stored in memory inside `ProjectService`.

Contact form requests are currently validated and processed by the backend, but they are not yet stored permanently.

A future iteration will replace the in-memory data with PostgreSQL persistence.

## Project Structure

```text
onurerkoc.dev/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.js
│   │   │   ├── contactApi.js
│   │   │   ├── healthApi.js
│   │   │   └── projectsApi.js
│   │   │
│   │   ├── components/
│   │   │   ├── BackendStatus.jsx
│   │   │   ├── ContactForm.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProjectsSection.jsx
│   │   │   ├── Section.jsx
│   │   │   ├── StackList.jsx
│   │   │   ├── TerminalCard.jsx
│   │   │   └── WorkCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── NotFoundPage.jsx
│   │   │   └── ProjectDetailPage.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── backend/
│   ├── src/main/java/com/onurerkoc/backend/
│   │   ├── contact/
│   │   │   ├── ContactController.java
│   │   │   ├── ContactRequestDto.java
│   │   │   └── ContactService.java
│   │   │
│   │   ├── controller/
│   │   │   └── HealthController.java
│   │   │
│   │   └── project/
│   │       ├── ProjectController.java
│   │       ├── ProjectDto.java
│   │       └── ProjectService.java
│   │
│   └── pom.xml
│
└── README.md
```

## Local Development

The frontend and backend run as separate applications during development.

### Prerequisites

Make sure the following tools are installed:

- Java 21
- Node.js
- npm
- Git

### 1. Start the Backend

Open PowerShell in the project root:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

If Maven is installed globally, you can also use:

```powershell
mvn spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

### 2. Start the Frontend

Open a second PowerShell window in the project root:

```powershell
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

### 3. Create a Production Build

From the `frontend` directory:

```powershell
npm run build
```

The generated production files are written to:

```text
frontend/dist
```

## API Endpoints

### Backend Health

```http
GET /api/health
```

Returns the current backend status.

### Project List

```http
GET /api/projects
```

Returns all project modules.

### Project Detail

```http
GET /api/projects/{slug}
```

Returns a single project based on its slug.

Example requests:

```text
GET /api/projects/onurerkoc-dev
GET /api/projects/portfolio-api
GET /api/projects/deployment-lab
```

When a project cannot be found, the backend returns:

```text
404 Not Found
```

### Contact Form

```http
POST /api/contact
```

Accepts contact form data from the React frontend.

Example request body:

```json
{
  "name": "Onur",
  "email": "onur@example.com",
  "message": "Hello from the contact form."
}
```

Response behavior:

```text
200 OK          -> Valid contact request
400 Bad Request -> Missing or invalid form data
```

Contact messages are currently processed in memory and are not yet stored in a database.

## Frontend API Layer

Frontend API calls are centralized under:

```text
frontend/src/api
```

Current API files:

```text
client.js       -> Shared API request helper
contactApi.js   -> Contact form requests
healthApi.js    -> Backend health request
projectsApi.js  -> Project list and project detail requests
```

React components should not call backend endpoints directly with:

```js
fetch('/api/...')
```

Instead, components use dedicated API functions:

```js
getBackendHealth()
getProjects()
getProjectBySlug(slug)
submitContactForm(contactData)
```

This keeps React components focused on:

- User interface rendering
- State management
- Loading states
- Success states
- Error states
- User interaction

API communication remains inside a dedicated frontend layer.

### Request Flow

```text
React Component
  -> API Function
  -> Shared API Client
  -> Vite Proxy
  -> Spring Boot Endpoint
```

## Frontend Routing

The frontend uses React Router for client-side navigation.

### Current Routes

```text
/                       -> Home page
/projects/:slug         -> Project detail page
*                       -> Not found page
```

### Example Project Routes

```text
/projects/onurerkoc-dev
/projects/portfolio-api
/projects/deployment-lab
```

Project cards use each project's `slug` to create their detail page URL.

### Project Detail Flow

```text
WorkCard
  -> React Router Link
  -> ProjectDetailPage
  -> useParams
  -> getProjectBySlug
  -> GET /api/projects/{slug}
  -> Spring Boot Backend
```

An unknown route is handled by `NotFoundPage`.

An unknown project slug is handled inside `ProjectDetailPage` after the backend returns `404 Not Found`.

## Project Case Studies

Project detail pages are designed as engineering case studies rather than standard portfolio descriptions.

Each project currently includes:

```text
id
title
slug
type
summary
description
techStack
status
githubUrl
liveUrl
featured
problem
goal
architecture
keyDecisions
nextSteps
updatedAt
```

The case study interface separates project information into dedicated sections:

```text
01 / Context       -> Problem
02 / Direction     -> Goal
03 / System Design -> Architecture
04 / Engineering   -> Key Decisions
05 / Roadmap       -> Next Steps
06 / Overview      -> Module Description
```

### Case Study Data Flow

```text
ProjectService
  -> ProjectDto
  -> ProjectController
  -> GET /api/projects/{slug}
  -> Frontend API Layer
  -> ProjectDetailPage
  -> Engineering Case Study UI
```

## Full-Stack Contact Form

The contact form connects the React frontend to the Spring Boot backend.

### Contact Request Flow

```text
ContactForm
  -> submitContactForm
  -> POST /api/contact
  -> ContactController
  -> ContactService
  -> Validation
  -> HTTP Response
```

The React form includes:

- Controlled input fields
- Submit loading state
- Success feedback
- Error feedback
- Required field checks

The Spring Boot backend includes:

- Request body conversion
- Name validation
- Basic email validation
- Message validation
- `200 OK` success response
- `400 Bad Request` validation response

The current version does not yet:

- Store messages permanently
- Send email notifications
- Include spam protection
- Include rate limiting

These improvements are planned for later iterations.

## Environment Variables

Frontend environment variables are documented in:

```text
frontend/.env.example
```

Current configuration:

```env
VITE_API_BASE_URL=/api
```

The shared API client reads this value through Vite:

```js
import.meta.env.VITE_API_BASE_URL
```

During local development, Vite proxies `/api` requests to the Spring Boot backend.

```text
Frontend: http://localhost:5173
Backend:  http://localhost:8080
```

For example, a frontend request to:

```text
/api/projects
```

is forwarded to:

```text
http://localhost:8080/api/projects
```

A contact request to:

```text
/api/contact
```

is forwarded to:

```text
http://localhost:8080/api/contact
```

## Basic SEO Foundation

The frontend currently includes basic metadata inside `frontend/index.html`.

Implemented metadata:

- Page title
- Meta description
- Author
- Robots directive
- Canonical URL
- Open Graph title and description
- Basic Twitter card metadata

Advanced SEO work will be completed after deployment.

Planned SEO improvements include:

- Dynamic page metadata
- Project-specific titles and descriptions
- Structured data
- `robots.txt`
- `sitemap.xml`
- Google Search Console integration
- Social profile connections

## Git Workflow

This project uses a feature branch and pull request workflow:

```text
main
  -> feature branch
  -> commit
  -> push
  -> pull request
  -> review
  -> merge
  -> pull main
```

### Start a New Feature

```powershell
git checkout main
git pull origin main
git checkout -b feature/feature-name
```

### Review and Commit Changes

```powershell
git status
git diff
git add .
git status
git diff --staged
git commit -m "Describe the completed feature"
```

### Push the Feature Branch

```powershell
git push -u origin feature/feature-name
```

After pushing, open a pull request and merge the feature branch into `main`.

### Update the Local Main Branch

```powershell
git checkout main
git pull origin main
git status
```

After the feature branch is merged, the local branch can be deleted:

```powershell
git branch -d feature/feature-name
```

## Current Status

### Implemented

- React and Vite frontend
- Java 21 and Spring Boot backend
- Backend health endpoint
- Project list endpoint
- Slug-based project detail endpoint
- Contact form API endpoint
- Full-stack contact form
- Basic backend contact validation
- Centralized frontend API layer
- Vite development proxy
- React Router integration
- Dynamic project detail pages
- General frontend 404 page
- Loading, success, and error states
- Backend-driven project data model
- Engineering case study sections
- Responsive project detail interface
- Basic SEO metadata
- Git feature branch and pull request workflow
- Local development documentation

### Current Project Modules

- `onurerkoc.dev`
- `Portfolio API`
- `Deployment Lab`

## Roadmap

### Next Main Phase

- Introduce PostgreSQL
- Replace in-memory project data
- Store contact form messages permanently
- Add entity and repository layers
- Separate entity models from API DTOs

### Infrastructure

- Create backend Dockerfile
- Create frontend Dockerfile
- Add Docker Compose configuration
- Add PostgreSQL container
- Configure Nginx as a reverse proxy
- Deploy the platform to DigitalOcean
- Connect the `onurerkoc.dev` domain
- Enable HTTPS

### Future Improvements

- Add automated backend tests
- Add project changelog and timeline sections
- Add GitHub and live project links
- Add email notifications for contact messages
- Add spam protection and rate limiting
- Add an admin or content management workflow
- Add dynamic SEO metadata
- Add structured data
- Add sitemap and robots files
- Connect the site to Google Search Console