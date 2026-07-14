\# Production Deployment



The onurerkoc.dev platform is deployed on a DigitalOcean Ubuntu server.



\## Live Environment



\- Website: https://onurerkoc.dev

\- Hosting: DigitalOcean

\- DNS and proxy: Cloudflare

\- HTTPS: Let's Encrypt and Certbot

\- Reverse proxy: Nginx

\- Application runtime: Docker Compose

\- Database: PostgreSQL 18



\## Production Architecture



```text

User

&#x20; -> Cloudflare

&#x20; -> DigitalOcean

&#x20; -> Host Nginx

&#x20; -> Frontend container

&#x20; -> Spring Boot backend container

&#x20; -> PostgreSQL container

Docker Compose Services

The production environment runs three services:

database
backend
frontend

The frontend and backend ports are bound only to localhost:

Frontend: 127.0.0.1:3000
Backend:  127.0.0.1:8080

PostgreSQL is not exposed to the public internet.

Production Environment Variables

Production credentials are stored inside a local .env file on the server.

POSTGRES_PASSWORD=production-password

Initial Startup

From the project directory:

docker compose up --build -d

Check the services:

docker compose ps
Load Initial Project Data

Copy the project data script into the PostgreSQL container:

docker compose cp backend/database/project-data.sql database:/tmp/project-data.sql

Run the script:

docker compose exec database psql \
  -U postgres \
  -d onurerkoc_dev \
  -f /tmp/project-data.sql
Application Verification

Backend health:

curl http://127.0.0.1:8080/api/health

Frontend:

curl -I http://127.0.0.1:3000

Frontend to backend proxy:

curl http://127.0.0.1:3000/api/projects

Public production endpoint:

curl https://onurerkoc.dev/api/health
Updating Production

Pull the latest main branch:

cd ~/onurerkoc.dev
git switch main
git pull origin main

Rebuild and restart the application:

docker compose up --build -d

Check container status:

docker compose ps
Persistent Database Volume

Normal shutdown:

docker compose down

This does not delete PostgreSQL data.

The following command deletes the PostgreSQL volume:

docker compose down -v

Do not use -v during normal deployments.

Firewall

Publicly accessible ports:

22  -> SSH
80  -> HTTP
443 -> HTTPS

Application and database ports are not publicly exposed.

HTTPS

Certificates are managed using Certbot.

Test certificate renewal:

sudo certbot renew --dry-run
