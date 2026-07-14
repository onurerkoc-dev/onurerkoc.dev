# onurerkoc.dev

Personal full-stack build lab and engineering notebook of **Onur Erkoç**.

**Live website:** [https://onurerkoc.dev](https://onurerkoc.dev)

`onurerkoc.dev` is a production-deployed full-stack platform built to document real engineering work instead of presenting only finished portfolio cards.

The project combines frontend development, backend architecture, database persistence, Docker-based delivery, Linux server administration, production networking, and ongoing project documentation in one evolving system.

---

## Project Goals

This project is built to practice and demonstrate:

- React and Vite frontend development
- Java 21 and Spring Boot backend development
- REST API design
- React Router and client-side routing
- Centralized frontend API communication
- Controller, service, repository, entity, mapper, and DTO separation
- PostgreSQL persistence
- Spring Data JPA and Hibernate
- Full-stack form handling
- Email notifications with Gmail SMTP
- Docker and Docker Compose
- Linux server administration
- Nginx reverse proxy configuration
- Cloudflare DNS and proxy configuration
- HTTPS with Let's Encrypt and Certbot
- Git feature branches and pull requests
- Production deployment on DigitalOcean

---

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
- Spring Web MVC
- Spring Data JPA
- Hibernate
- Spring Boot Mail
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

---

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

Public traffic enters through the host Nginx server:

```text
Internet
  -> Ports 80 / 443
  -> Host Nginx
  -> 127.0.0.1:3000
  -> Frontend container
```

The frontend container forwards API requests through the internal Docker Compose network:

```text
Browser request
  -> /api
  -> Frontend Nginx
  -> backend:8080
  -> Spring Boot
```

The frontend and backend ports are bound only to localhost:

```text
Frontend: 127.0.0.1:3000
Backend:  127.0.0.1:8080
```

PostgreSQL is not exposed to the public internet. It is available only inside the Docker Compose network.

---

## Main Features

### Project Platform

- Project list loaded from PostgreSQL
- Slug-based project detail pages
- Engineering case study sections
- Technology lists
- Architecture decisions
- Project roadmaps
- Backend-driven project content
- Loading, error, and not-found states

### Contact System

- Controlled React contact form
- Backend validation
- Field-length limits
- Input trimming
- PostgreSQL persistence
- Automatic creation timestamps
- Gmail SMTP notifications
- Reply-To support using the visitor's email address
- Database persistence even if mail delivery fails

### Production Delivery

- Separate frontend and backend images
- PostgreSQL container with persistent volume
- PostgreSQL health check
- Docker Compose service orchestration
- Host Nginx reverse proxy
- Cloudflare DNS and proxy
- HTTPS with Let's Encrypt
- Automatic certificate renewal
- UFW firewall rules
- Live production domain

---

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
  -> PostgreSQL
  -> ContactNotificationService
  -> Gmail SMTP
  -> Notification email
```

The message is saved before the email notification is attempted.

If SMTP delivery fails, the database record remains available and the failure is written to the backend logs.

---

## Repository Structure

```text
onurerkoc.dev/
├── backend/
│   ├── database/
│   │   └── project-data.sql
│   │
│   ├── src/main/java/com/onurerkoc/backend/
│   │   ├── contact/
│   │   │   ├── ContactController.java
│   │   │   ├── ContactMessage.java
│   │   │   ├── ContactMessageRepository.java
│   │   │   ├── ContactNotificationService.java
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
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── mvnw
│   ├── mvnw.cmd
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.js
│   │   │   ├── contactApi.js
│   │   │   ├── healthApi.js
│   │   │   └── projectsApi.js
│   │   │
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
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

---

## Local Development

### Prerequisites

- Java 21
- Node.js
- npm
- Git
- PostgreSQL

### Database Setup

Create the local database:

```sql
CREATE DATABASE onurerkoc_dev;
```

Default local database settings:

```text
Host:     localhost
Port:     5432
Database: onurerkoc_dev
Username: postgres
```

Set the database password in the PowerShell session that runs the backend:

```powershell
$env:DB_PASSWORD = "your-postgresql-password"
```

Optional database variables:

```powershell
$env:DB_URL = "jdbc:postgresql://localhost:5432/onurerkoc_dev"
$env:DB_USERNAME = "postgres"
$env:DB_PASSWORD = "your-postgresql-password"
```

Real credentials must never be committed.

### Initial Project Data

Initial project records are stored in:

```text
backend/database/project-data.sql
```

Run the script from the repository root:

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

It is safe to run again. It resets only these project records and their related collection data. Contact messages are not deleted.

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

Vite forwards `/api` requests to the Spring Boot backend during development.

---

## Docker Compose

The full stack can run locally with Docker Compose.

### Environment File

Create a real `.env` file in the repository root:

```env
POSTGRES_PASSWORD=your-database-password

CONTACT_EMAIL_ENABLED=true
MAIL_USERNAME=your-gmail-address@gmail.com
MAIL_PASSWORD=your-google-app-password
CONTACT_NOTIFICATION_TO=your-notification-address@gmail.com
```

`MAIL_PASSWORD` must be a Google App Password, not the normal Google account password.

The real `.env` file is ignored by Git.

### Start the Application

```powershell
docker compose config
docker compose up --build -d
```

### Check Services

```powershell
docker compose ps
```

### Read Backend Logs

```powershell
docker compose logs --tail=200 backend
```

### Stop Without Deleting Data

```powershell
docker compose down
```

### Delete Containers and PostgreSQL Data

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

---

## Environment Variables

### Database

| Variable | Purpose |
|---|---|
| `POSTGRES_PASSWORD` | PostgreSQL container password |
| `DB_URL` | JDBC connection URL |
| `DB_USERNAME` | PostgreSQL username |
| `DB_PASSWORD` | Backend database password |

### Contact Email

| Variable | Purpose |
|---|---|
| `CONTACT_EMAIL_ENABLED` | Enables or disables mail notifications |
| `MAIL_USERNAME` | Gmail account used to send notifications |
| `MAIL_PASSWORD` | Google App Password |
| `CONTACT_NOTIFICATION_TO` | Address that receives contact notifications |

The repository contains only placeholder values in `.env.example`.

---

## API Endpoints

### Health

```http
GET /api/health
```

Returns the backend status.

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

An unknown slug returns:

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

A successful request stores the message in PostgreSQL and attempts to send an email notification.

---

## Frontend API Layer

Frontend requests are centralized under:

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

React components use dedicated functions instead of containing direct request logic:

```js
getBackendHealth()
getProjects()
getProjectBySlug(slug)
submitContactForm(contactData)
```

This keeps components focused on:

- Rendering
- Local state
- Loading states
- Success states
- Error states
- User interaction

---

## Frontend Routing

Current routes:

```text
/                       -> Home page
/projects/:slug         -> Project detail page
*                       -> Not found page
```

React Router fallback is configured in the frontend Nginx container, so direct page refreshes continue to work in production.

---

## Persistence Design

### Projects

`ProjectEntity` represents the PostgreSQL model.

`ProjectDto` represents the public API response.

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

Project read operations use:

```java
@Transactional(readOnly = true)
```

Entity-to-DTO mapping is completed while the transaction is active.

The project also uses:

```properties
spring.jpa.open-in-view=false
```

This prevents database access from leaking into the web layer.

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

The backend validates and trims input before saving the entity.

---

## Production Deployment

The application is live at:

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

Detailed deployment instructions:

```text
docs/production-deployment.md
```

Reusable host Nginx configuration:

```text
infrastructure/nginx/onurerkoc.dev.conf
```

### Production Environment

Production credentials are stored only in the server-local `.env` file:

```env
POSTGRES_PASSWORD=production-database-password

CONTACT_EMAIL_ENABLED=true
MAIL_USERNAME=production-gmail-address@gmail.com
MAIL_PASSWORD=production-google-app-password
CONTACT_NOTIFICATION_TO=notification-address@gmail.com
```

Real secrets must never be committed.

### Production Update Flow

Run on the DigitalOcean server:

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

Check backend logs:

```bash
docker compose logs --tail=200 backend
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

---

## SEO Status

The current frontend includes a basic SEO foundation:

- Page title
- Meta description
- Author metadata
- Robots directive
- Canonical URL
- Open Graph title and description
- Basic Twitter card metadata

Planned SEO v2 work:

- Route-specific titles and descriptions
- Project-specific canonical URLs
- `robots.txt`
- `sitemap.xml`
- Structured data
- Improved Open Graph metadata
- Preferred `www` redirect
- Google Search Console
- Production sitemap submission

---

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

### Start a Feature

```powershell
git switch main
git pull origin main
git switch -c feature/feature-name
```

### Review and Commit

```powershell
git status
git diff
git add .
git diff --staged
git commit -m "Describe the completed feature"
```

### Push

```powershell
git push -u origin feature/feature-name
```

### After Merge

```powershell
git switch main
git pull origin main
git branch -d feature/feature-name
```

---

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
- Gmail SMTP contact notifications
- Reply-To support for contact senders
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
- Persistent PostgreSQL volume
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

---

## Roadmap

### Site Structure and Design v2

- Review the information architecture
- Finalize the main navigation
- Refine the visual system
- Simplify reusable frontend components
- Improve home page sections
- Improve project list and detail experiences

### Turkish and English Support

- Define a locale strategy
- Add Turkish and English interface content
- Decide the multilingual route structure
- Translate validation and status messages
- Keep language logic outside presentation components

### Project Model and API v2

- Redesign the project content model
- Separate localized content from shared technical data
- Review the PostgreSQL schema
- Create Project API v2
- Update entity, DTO, mapper, service, and repository responsibilities
- Rebuild project pages around the new model

### SEO v2

- Add route-specific metadata
- Add project-specific canonical URLs
- Add `robots.txt`
- Add `sitemap.xml`
- Add structured data
- Improve social sharing metadata
- Configure preferred domain redirects
- Connect Google Search Console
- Submit the production sitemap

### Reliability and Security

- Add spam protection
- Add contact endpoint rate limiting
- Add automated backend tests
- Add frontend tests for critical flows
- Add versioned database migrations
- Add deployment automation after the manual workflow is fully understood

### Future Administration

- Add project creation and update endpoints
- Add an administration workflow
- Add contact message administration

---

## Security Notes

- Real `.env` files are ignored by Git.
- Database passwords are never committed.
- Gmail credentials use a Google App Password.
- PostgreSQL is not exposed publicly.
- Frontend and backend container ports are bound to localhost.
- Only SSH, HTTP, and HTTPS are allowed through the firewall.
- Cloudflare proxies public traffic before it reaches the server.

---

## Live Website

[https://onurerkoc.dev](https://onurerkoc.dev)