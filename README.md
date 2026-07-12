# onurerkoc.dev

Personal full-stack build lab and engineering notebook of Onur Erkoç.

`onurerkoc.dev` is not designed as a generic portfolio. It is an evolving engineering space where frontend development, backend systems, database persistence, architectural decisions, deployment experiments, and real-world projects are documented together.

## About the Project

The goal of this project is to build a production-oriented personal platform step by step while documenting the engineering process behind it.

The project is being developed to practice and demonstrate:

- React and Vite frontend development
- Java 21 and Spring Boot backend development
- REST API design
- Client-side routing
- Frontend API architecture
- Controller, service, repository, entity, and DTO separation
- PostgreSQL persistence
- Spring Data JPA and Hibernate
- Full-stack form handling
- Git and GitHub pull request workflow
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
- Spring Data JPA
- Hibernate
- REST API

### Database

- PostgreSQL

### Planned Infrastructure

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
  -> Repository Layer
  -> JPA / Hibernate
  -> PostgreSQL
```

Both project content and contact form submissions are stored permanently in PostgreSQL.

### Project Data Flow

```text
PostgreSQL
  -> ProjectRepository
  -> ProjectEntity
  -> ProjectMapper
  -> ProjectDto
  -> ProjectService
  -> ProjectController
  -> JSON Response
  -> React Frontend
```

### Contact Message Flow

```text
React ContactForm
  -> Frontend API Layer
  -> POST /api/contact
  -> ContactController
  -> ContactService
  -> ContactMessageRepository
  -> JPA / Hibernate
  -> PostgreSQL
```

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
│   ├── database/
│   │   └── project-data.sql
│   │
│   ├── src/main/java/com/onurerkoc/backend/
│   │   ├── contact/
│   │   │   ├── ContactController.java
│   │   │   ├── ContactMessage.java
│   │   │   ├── ContactMessageRepository.java
│   │   │   ├── ContactRequestDto.java
│   │   │   └── ContactService.java
│   │   │
│   │   ├── controller/
│   │   │   └── HealthController.java
│   │   │
│   │   └── project/
│   │       ├── ProjectController.java
│   │       ├── ProjectDto.java
│   │       ├── ProjectEntity.java
│   │       ├── ProjectMapper.java
│   │       ├── ProjectRepository.java
│   │       └── ProjectService.java
│   │
│   ├── src/main/resources/
│   │   └── application.properties
│   │
│   ├── mvnw
│   ├── mvnw.cmd
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
- PostgreSQL

## Database Setup

Create the local PostgreSQL database:

```sql
CREATE DATABASE onurerkoc_dev;
```

The default local database configuration is:

```text
Host:     localhost
Port:     5432
Database: onurerkoc_dev
Username: postgres
```

The database password is not stored inside the repository.

Set the password as an environment variable in the PowerShell session that will run the backend:

```powershell
$env:DB_PASSWORD = "your-postgresql-password"
```

Optional database environment variables:

```powershell
$env:DB_URL = "jdbc:postgresql://localhost:5432/onurerkoc_dev"
$env:DB_USERNAME = "postgres"
$env:DB_PASSWORD = "your-postgresql-password"
```

Do not commit real database credentials to Git.

### Initial Project Data

The initial project records are stored in:

```text
backend/database/project-data.sql
```

Run the SQL script from the project root:

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" `
  -U postgres `
  -h localhost `
  -d onurerkoc_dev `
  -f "backend\database\project-data.sql"
```

The script recreates the current project records:

- `onurerkoc.dev`
- `Portfolio API`
- `Deployment Lab`

The script can be run again safely. It only resets these three project records and their related list data.

It does not delete or modify contact messages.

## Start the Backend

Open PowerShell in the project root:

```powershell
cd backend
$env:DB_PASSWORD = "your-postgresql-password"
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

## Start the Frontend

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

## Build Verification

### Backend

From the `backend` directory:

```powershell
$env:DB_PASSWORD = "your-postgresql-password"
.\mvnw.cmd test
```

A working PostgreSQL connection is required while loading the Spring application context.

### Frontend

From the `frontend` directory:

```powershell
npm run build
```

The production files are generated under:

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

Returns all projects stored in PostgreSQL.

### Project Detail

```http
GET /api/projects/{slug}
```

Returns a single project based on its unique slug.

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

Accepts contact form data from the React frontend, validates it, and stores it in PostgreSQL.

Example request body:

```json
{
  "name": "Onur Erkoç",
  "email": "onur@example.com",
  "message": "Hello from the contact form."
}
```

Example success response:

```text
Message received from Onur Erkoç
```

Response behavior:

```text
201 Created     -> Contact message was validated and stored
400 Bad Request -> Missing, invalid, or oversized form data
```

Current contact field limits:

```text
name    -> 100 characters
email   -> 255 characters
message -> 2000 characters
```

## Frontend API Layer

Frontend API calls are centralized under:

```text
frontend/src/api
```

Current API modules:

```text
client.js       -> Shared API request helper
contactApi.js   -> Contact form requests
healthApi.js    -> Backend health request
projectsApi.js  -> Project list and project detail requests
```

React components do not contain direct backend communication logic.

Instead of calling:

```js
fetch('/api/...')
```

inside UI components, the application uses dedicated functions:

```js
getBackendHealth()
getProjects()
getProjectBySlug(slug)
submitContactForm(contactData)
```

This keeps React components focused on:

- Interface rendering
- State management
- Loading states
- Success states
- Error states
- User interaction

### Frontend Request Flow

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

Project cards use each project's `slug` value to create detail page URLs.

### Project Detail Flow

```text
WorkCard
  -> React Router Link
  -> ProjectDetailPage
  -> useParams
  -> getProjectBySlug
  -> GET /api/projects/{slug}
  -> Spring Boot Backend
  -> PostgreSQL
```

An unknown general route is handled by `NotFoundPage`.

An unknown project slug is handled inside `ProjectDetailPage` after the backend returns `404 Not Found`.

## Project Persistence

Project records are represented by the `ProjectEntity` JPA entity.

```text
ProjectEntity Java object
  -> Hibernate mapping
  -> PostgreSQL project tables
```

### Main Project Table

Single-value project fields are stored in:

```text
projects
```

The table contains fields such as:

```text
id
title
slug
type
summary
description
status
github_url
live_url
featured
problem
goal
architecture
updated_at
```

### Project Collection Tables

The following fields contain multiple values:

```text
techStack
keyDecisions
nextSteps
```

They are stored in separate collection tables:

```text
project_tech_stack
project_key_decisions
project_next_steps
```

Each collection row is connected to a project through `project_id`.

The `item_order` column preserves the original order of each list.

### Project Repository

`ProjectRepository` extends Spring Data JPA's `JpaRepository`.

It provides database operations such as:

```text
findAll
findById
findBySlug
save
saveAll
deleteById
count
```

The project service currently uses:

```text
findAll
findBySlug
```

### Entity-to-DTO Mapping

`ProjectEntity` represents the PostgreSQL data model.

`ProjectDto` represents the JSON structure sent to the frontend.

`ProjectMapper` converts between them:

```text
ProjectEntity
  -> ProjectMapper
  -> ProjectDto
```

This keeps the database model separate from the public API response model.

### Read-Only Transactions

Project collection fields are loaded while the service transaction is active.

```java
@Transactional(readOnly = true)
```

The service reads the entity, loads its lists, converts it into a DTO, and then closes the transaction.

```text
Repository reads entity
  -> Collection fields are loaded
  -> Entity is mapped into DTO
  -> Transaction closes
  -> Controller returns prepared DTO
```

This prevents lazy-loading errors while keeping:

```properties
spring.jpa.open-in-view=false
```

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

The case study interface separates project content into dedicated sections:

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
PostgreSQL
  -> ProjectRepository
  -> ProjectEntity
  -> ProjectMapper
  -> ProjectDto
  -> ProjectService
  -> ProjectController
  -> Frontend API Layer
  -> ProjectDetailPage
  -> Engineering Case Study UI
```

## Contact Persistence

Contact messages are represented by the `ContactMessage` JPA entity.

```text
ContactMessage Java object
  -> Hibernate mapping
  -> contact_messages PostgreSQL table
```

The contact table stores:

```text
id
name
email
message
created_at
```

`ContactMessageRepository` extends Spring Data JPA's `JpaRepository`.

The contact service:

- Validates incoming request data
- Trims form values
- Creates a `ContactMessage` entity
- Saves the entity to PostgreSQL
- Returns a success response

### Contact Request Flow

```text
ContactForm
  -> submitContactForm
  -> POST /api/contact
  -> ContactController
  -> ContactService
  -> ContactMessage
  -> ContactMessageRepository
  -> JPA / Hibernate
  -> PostgreSQL
  -> 201 Created
```

The React form includes:

- Controlled input fields
- Required field checks
- Maximum input lengths
- Message character counter
- Submit loading state
- Success feedback
- Error feedback

The Spring Boot backend includes:

- Request body conversion
- Name validation
- Basic email validation
- Message validation
- Maximum field-length validation
- Input trimming
- JPA entity mapping
- Repository persistence
- Automatic creation timestamps
- `201 Created` success response
- `400 Bad Request` validation response

The current contact system does not yet include:

- Email notifications
- Spam protection
- Rate limiting
- Administration interface

## Database Configuration

Backend database configuration is stored in:

```text
backend/src/main/resources/application.properties
```

The configuration supports the following environment variables:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
```

Example configuration:

```properties
spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:5432/onurerkoc_dev}
spring.datasource.username=${DB_USERNAME:postgres}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.open-in-view=false
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

Hibernate currently manages local schema updates through:

```properties
spring.jpa.hibernate.ddl-auto=update
```

A future production iteration can replace automatic schema updates with versioned database migrations.

## Frontend Environment Variables

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

For example:

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

The frontend currently includes basic metadata inside:

```text
frontend/index.html
```

Implemented metadata:

- Page title
- Meta description
- Author
- Robots directive
- Canonical URL
- Open Graph title and description
- Basic Twitter card metadata

Advanced SEO work will be completed after production deployment.

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

After the feature branch is merged, delete the local feature branch:

```powershell
git branch -d feature/feature-name
```

## Current Status

### Implemented

- React and Vite frontend
- Java 21 and Spring Boot backend
- PostgreSQL database integration
- Spring Data JPA and Hibernate integration
- Backend health endpoint
- Project list endpoint
- Slug-based project detail endpoint
- PostgreSQL-backed project storage
- `ProjectEntity` database mapping
- `ProjectRepository` database access
- Entity-to-DTO conversion with `ProjectMapper`
- Persistent project technology lists
- Persistent engineering decision lists
- Persistent project roadmap lists
- Read-only project service transactions
- Re-runnable initial project data SQL script
- Contact form API endpoint
- Full-stack contact form
- Persistent contact message storage
- Contact message entity and repository
- Automatic contact message timestamps
- Backend contact validation
- Maximum backend field-length validation
- Synchronized frontend, backend, and database field limits
- `201 Created` response for stored contact messages
- Centralized frontend API layer
- Vite development proxy
- React Router integration
- Dynamic project detail pages
- General frontend 404 page
- Loading, success, and error states
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

- Create a backend Dockerfile
- Create a frontend production Dockerfile
- Add Docker Compose configuration
- Run PostgreSQL through Docker Compose
- Configure container environment variables
- Verify the full-stack application inside containers

### Deployment Phase

- Configure Nginx as a reverse proxy
- Prepare the DigitalOcean server
- Deploy the frontend, backend, and PostgreSQL services
- Connect the `onurerkoc.dev` domain
- Enable HTTPS
- Configure production environment variables

### Future Improvements

- Add basic automated backend tests
- Add project creation and update endpoints
- Add an administration workflow
- Add contact message administration
- Add email notifications for contact messages
- Add spam protection and rate limiting
- Add project changelog and timeline sections
- Add versioned database migrations
- Add dynamic SEO metadata
- Add structured data
- Add sitemap and robots files
- Connect the website to Google Search Console