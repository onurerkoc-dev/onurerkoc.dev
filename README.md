# onurerkoc.dev

Personal full-stack build lab and engineering notebook of **Onur Erkoç**.

**Live website:** [https://onurerkoc.dev](https://onurerkoc.dev)

`onurerkoc.dev` is not designed as a generic portfolio. It is a production-oriented engineering platform where frontend development, backend systems, database persistence, architectural decisions, deployment work, and project evolution are documented together.

## Project Goal

The goal of this project is to build and operate a real full-stack platform while learning the engineering decisions behind it.

The project currently demonstrates:

- React and Vite frontend development
- Java 21 and Spring Boot backend development
- REST API design
- React Router and client-side navigation
- Centralized frontend API communication
- Controller, service, repository, entity, mapper, and DTO separation
- PostgreSQL persistence
- Spring Data JPA and Hibernate
- Full-stack form handling
- Docker and Docker Compose
- Linux server administration
- Nginx reverse proxy configuration
- Cloudflare DNS and proxy configuration
- HTTPS with Let's Encrypt and Certbot
- Git feature branches and pull requests
- Production deployment on DigitalOcean

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- React Router
- CSS
- Nginx production container

### Backend

- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate
- REST API
- Maven

### Database

- PostgreSQL 18

### Infrastructure

- Docker
- Docker Compose
- Ubuntu 24.04 LTS
- DigitalOcean
- Host Nginx reverse proxy
- Cloudflare
- Let's Encrypt
- Certbot
- UFW firewall

## Production Architecture

```text
User
  -> Cloudflare DNS and proxy
  -> DigitalOcean Ubuntu server
  -> Host Nginx reverse proxy
  -> React frontend container
  -> Spring Boot backend container
  -> PostgreSQL container
```

The application runs as three Docker Compose services:

```text
frontend
backend
database
```

Public traffic enters through the host Nginx server.

```text
Internet
  -> 80 / 443
  -> Host Nginx
  -> 127.0.0.1:3000
  -> Frontend container
```

The frontend container proxies `/api` requests to the backend service through the Docker Compose network.

```text
Browser request
  -> /api
  -> Frontend Nginx
  -> backend:8080
  -> Spring Boot
```

The backend and frontend container ports are bound only to localhost:

```text
Frontend: 127.0.0.1:3000
Backend:  127.0.0.1:8080
```

PostgreSQL is not exposed to the public internet. It is accessible only inside the Docker Compose network.

## Application Data Flows

### Project Data

```text
PostgreSQL
  -> ProjectRepository
  -> ProjectEntity
  -> ProjectMapper
  -> ProjectDto
  -> ProjectService
  -> ProjectController
  -> JSON response
  -> React frontend
```

### Contact Messages

```text
React ContactForm
  -> Frontend API layer
  -> POST /api/contact
  -> ContactController
  -> ContactService
  -> ContactMessageRepository
  -> JPA / Hibernate
  -> PostgreSQL
```

Contact messages are currently stored permanently in PostgreSQL. Email notifications will be added in a later feature without removing database persistence.

## Repository Structure

```text
onurerkoc.dev/
├── backend/
│   ├── database/
│   │   └── project-data.sql
│   ├── src/main/java/com/onurerkoc/backend/
│   │   ├── contact/
│   │   ├── controller/
│   │   └── project/
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── mvnw
│   ├── mvnw.cmd
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── index.html
│   ├── nginx.conf
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   └── production-deployment.md
│
├── infrastructure/
│   └── nginx/
│       └── onurerkoc.dev.conf
│
├── .env.example
├── .gitignore
├── compose.yaml
└── README.md
```

## Local Development

The frontend and backend can run as separate applications during development.

### Prerequisites

- Java 21
- Node.js
- npm
- Git
- PostgreSQL

### Database Setup

Create the local PostgreSQL database:

```sql
CREATE DATABASE onurerkoc_dev;
```

Default local database configuration:

```text
Host:     localhost
Port:     5432
Database: onurerkoc_dev
Username: postgres
```

The real database password must not be stored in the repository.

Set it in the PowerShell session used to run the backend:

```powershell
$env:DB_PASSWORD = "your-postgresql-password"
```

Optional database environment variables:

```powershell
$env:DB_URL = "jdbc:postgresql://localhost:5432/onurerkoc_dev"
$env:DB_USERNAME = "postgres"
$env:DB_PASSWORD = "your-postgresql-password"
```

### Initial Project Data

Initial project records are stored in:

```text
backend/database/project-data.sql
```

Run the script from the project root:

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" `
  -U postgres `
  -h localhost `
  -d onurerkoc_dev `
  -f "backend\database\project-data.sql"
```

The script recreates the current records for:

- `onurerkoc.dev`
- `Portfolio API`
- `Deployment Lab`

It can be run again safely. It resets only these project records and their related collection data. It does not delete contact messages.

### Run the Backend

```powershell
cd backend
$env:DB_PASSWORD = "your-postgresql-password"
.\mvnw.cmd spring-boot:run
```

Backend address:

```text
http://localhost:8080
```

### Run the Frontend

Open another PowerShell window:

```powershell
cd frontend
npm install
npm run dev
```

Frontend address:

```text
http://localhost:5173
```

During development, Vite proxies `/api` requests to the Spring Boot backend.

## Docker Compose

The complete application can also run locally with Docker Compose.

Create a real `.env` file from `.env.example`:

```env
POSTGRES_PASSWORD=your-local-postgresql-password
```

The real `.env` file is ignored by Git.

Start the complete environment:

```powershell
docker compose up --build -d
```

Check service status:

```powershell
docker compose ps
```

Stop the environment without deleting PostgreSQL data:

```powershell
docker compose down
```

The following command also deletes the PostgreSQL volume and its data:

```powershell
docker compose down -v
```

Do not use `-v` during normal development or production updates.

### Load Project Data into Docker PostgreSQL

```powershell
docker compose cp backend/database/project-data.sql database:/tmp/project-data.sql
```

```powershell
docker compose exec database psql `
  -U postgres `
  -d onurerkoc_dev `
  -f /tmp/project-data.sql
```

## API Endpoints

### Health

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

Examples:

```text
GET /api/projects/onurerkoc-dev
GET /api/projects/portfolio-api
GET /api/projects/deployment-lab
```

An unknown project slug returns:

```text
404 Not Found
```

### Contact Form

```http
POST /api/contact
```

Example request:

```json
{
  "name": "Onur Erkoç",
  "email": "onur@example.com",
  "message": "Hello from the contact form."
}
```

Response behavior:

```text
201 Created     -> Message validated and stored
400 Bad Request -> Invalid, missing, or oversized data
```

Current field limits:

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

Current modules:

```text
client.js       -> Shared request helper
contactApi.js   -> Contact form requests
healthApi.js    -> Backend health request
projectsApi.js  -> Project list and detail requests
```

React components do not contain direct backend request logic. They use dedicated API functions:

```js
getBackendHealth()
getProjects()
getProjectBySlug(slug)
submitContactForm(contactData)
```

This keeps UI components focused on rendering, state, loading, success, error, and user interaction.

## Frontend Routing

Current routes:

```text
/                       -> Home page
/projects/:slug         -> Project detail page
*                       -> Not found page
```

React Router fallback is configured in the frontend Nginx container, so direct page refreshes continue to work in production.

## Persistence Design

### Projects

`ProjectEntity` represents the PostgreSQL model.

`ProjectDto` represents the public JSON response.

`ProjectMapper` converts the entity into the DTO:

```text
ProjectEntity
  -> ProjectMapper
  -> ProjectDto
```

Main project data is stored in:

```text
projects
```

Collection fields are stored in:

```text
project_tech_stack
project_key_decisions
project_next_steps
```

`item_order` preserves list order.

### Read-Only Transactions

Project reads use:

```java
@Transactional(readOnly = true)
```

Entities and their collection fields are mapped to DTOs while the transaction is active.

The project keeps:

```properties
spring.jpa.open-in-view=false
```

This prevents database access from leaking into the web layer and avoids lazy-loading errors by completing mapping inside the service layer.

### Contact Messages

Contact messages are stored in:

```text
contact_messages
```

Stored fields:

```text
id
name
email
message
created_at
```

The backend validates and trims form input before creating and saving a `ContactMessage` entity.

## Production Deployment

The application is deployed at:

```text
https://onurerkoc.dev
```

Production components:

- DigitalOcean Ubuntu server
- Docker Compose
- PostgreSQL persistent volume
- Host Nginx reverse proxy
- Cloudflare DNS and proxy
- Let's Encrypt SSL certificate
- Certbot certificate renewal
- UFW firewall

Detailed deployment instructions are stored in:

```text
docs/production-deployment.md
```

The reusable host Nginx configuration is stored in:

```text
infrastructure/nginx/onurerkoc.dev.conf
```

### Production Environment Variables

Production credentials are stored in a server-local `.env` file.

```env
POSTGRES_PASSWORD=production-password
```

Real secrets must never be committed.

### Production Update Flow

On the server:

```bash
cd ~/onurerkoc.dev
git switch main
git pull origin main
docker compose up --build -d
docker compose ps
```

### Production Verification

```bash
curl https://onurerkoc.dev/api/health
curl https://onurerkoc.dev/api/projects
```

### Firewall

Public ports:

```text
22  -> SSH
80  -> HTTP
443 -> HTTPS
```

Ports `3000`, `8080`, and `5432` are not publicly exposed.

### HTTPS Renewal Test

```bash
sudo certbot renew --dry-run
```

## SEO Status

The current frontend includes a basic SEO foundation in `frontend/index.html`:

- Page title
- Meta description
- Author metadata
- Robots directive
- Canonical URL
- Open Graph title and description
- Basic Twitter card metadata

Advanced SEO work is intentionally scheduled after the site structure, project model, and multilingual route strategy are finalized.

## Git Workflow

The project uses feature branches and pull requests:

```text
main
  -> feature branch
  -> commit
  -> push
  -> pull request
  -> review
  -> merge
  -> update local main
```

Start a feature:

```powershell
git switch main
git pull origin main
git switch -c feature/feature-name
```

Review and commit:

```powershell
git status
git diff
git add .
git diff --staged
git commit -m "Describe the completed feature"
```

Push:

```powershell
git push -u origin feature/feature-name
```

After merging:

```powershell
git switch main
git pull origin main
git branch -d feature/feature-name
```

## Current Status

### Completed

- React and Vite frontend
- Java 21 and Spring Boot backend
- Centralized frontend API layer
- React Router integration
- Project list and detail pages
- Engineering case study sections
- Backend health endpoint
- Contact form API
- PostgreSQL contact persistence
- PostgreSQL project persistence
- Spring Data JPA and Hibernate
- Entity, repository, mapper, DTO, service, and controller separation
- Read-only service transactions
- Re-runnable project seed script
- Backend Docker image
- Frontend production Docker image
- Frontend Nginx configuration
- Docker Compose environment
- PostgreSQL health check
- Persistent PostgreSQL Docker volume
- DigitalOcean production deployment
- Host Nginx reverse proxy
- Cloudflare DNS and proxy
- HTTPS with Let's Encrypt and Certbot
- UFW firewall
- Live production domain
- Basic SEO metadata
- Feature branch and pull request workflow

### Current Project Modules

- `onurerkoc.dev`
- `Portfolio API`
- `Deployment Lab`

## Roadmap

The next phase will not add random features one by one. The project will be reorganized in a controlled order so that design, content, API, language support, and SEO do not conflict with each other.

### Phase 1 — Site Structure and Design v2

- Review the current information architecture
- Decide the final main navigation
- Redesign the visual system
- Simplify reusable frontend components
- Define the home page sections
- Redesign project list and detail experiences
- Preserve working API and production behavior during the redesign

### Phase 2 — Turkish and English Support

- Add a clear locale strategy
- Add Turkish and English interface content
- Decide multilingual route structure
- Translate navigation, page content, validation, and status messages
- Keep language logic outside presentation components where possible

### Phase 3 — Project Model and API v2

- Redesign the project content model
- Separate localized project content from shared technical data
- Review the PostgreSQL project schema
- Create Project API v2
- Update entity, DTO, mapper, service, and repository responsibilities
- Update project seed data
- Rebuild project list and detail pages around the new API

### Phase 4 — Contact Email Notifications

- Keep PostgreSQL as the permanent message record
- Send an email notification after a valid message is stored
- Store mail credentials only in environment variables
- Handle mail delivery failures without losing the database record
- Add basic spam protection
- Add rate limiting

### Phase 5 — SEO v2

- Add route-specific titles and descriptions
- Add project-specific canonical URLs
- Add multilingual canonical and alternate-language strategy
- Add `robots.txt`
- Add `sitemap.xml`
- Add structured data
- Improve Open Graph and Twitter metadata
- Configure the preferred `www` redirect
- Connect Google Search Console
- Submit the production sitemap

### Later Improvements

- Add automated backend tests
- Add frontend tests for critical flows
- Add versioned database migrations
- Add project creation and update endpoints
- Add an administration workflow
- Add contact message administration
- Add deployment automation after the manual workflow is fully understood