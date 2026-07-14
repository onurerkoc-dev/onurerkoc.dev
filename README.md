# onurerkoc.dev

**Personal full-stack engineering platform and build journal of Onur Erkoç.**

- Live website: [https://onurerkoc.dev](https://onurerkoc.dev)
- GitHub: [onurerkoc-dev](https://github.com/onurerkoc-dev)

This README is available in two languages:

- [English](#english)
- [Türkçe](#türkçe)

---

# English

## Overview

`onurerkoc.dev` is not a generic portfolio template.

It is a production-deployed engineering platform where I build, test, document, and improve real full-stack systems step by step.

The project brings together:

- Frontend development
- Backend architecture
- REST API design
- PostgreSQL persistence
- Docker-based delivery
- Linux server administration
- Reverse proxy configuration
- Cloudflare and HTTPS
- Contact email notifications
- Technical SEO
- Git feature branches and pull requests

The main goal is not only to show final results, but also to document the engineering decisions and infrastructure behind them.

---

## Current Status

The application is live in production:

```text
https://onurerkoc.dev
```

Completed areas:

- React and Vite frontend
- Java 21 and Spring Boot backend
- PostgreSQL persistence
- Project list and detail APIs
- Backend-driven project case studies
- Contact form persistence
- Gmail SMTP contact notifications
- Docker images for frontend and backend
- Docker Compose orchestration
- Persistent PostgreSQL volume
- DigitalOcean deployment
- Host Nginx reverse proxy
- Cloudflare DNS and proxy
- HTTPS with Let's Encrypt and Certbot
- UFW firewall
- Route-aware SEO metadata
- `robots.txt`
- `sitemap.xml`
- JSON-LD structured data
- Git feature branch and pull request workflow

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
- Maven
- REST API

### Database

- PostgreSQL 18

### Infrastructure

- Docker
- Docker Compose
- Ubuntu 24.04 LTS
- DigitalOcean
- Host Nginx
- Cloudflare
- Let's Encrypt
- Certbot
- UFW

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

Docker Compose runs three services:

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

The frontend container forwards API requests through the Docker network:

```text
Browser
  -> /api
  -> Frontend Nginx
  -> backend:8080
  -> Spring Boot
```

Container ports are bound only to localhost:

```text
Frontend: 127.0.0.1:3000
Backend:  127.0.0.1:8080
```

PostgreSQL is not exposed to the public internet.

---

## Main Features

### Project Platform

- Project list loaded from PostgreSQL
- Slug-based project detail pages
- Backend-driven project content
- Engineering case study sections
- Project technology lists
- Architecture decisions
- Project roadmaps
- Loading, error, and not-found states

### Contact System

- Controlled React contact form
- Backend validation
- Input trimming
- Maximum field lengths
- PostgreSQL persistence
- Automatic creation timestamps
- Gmail SMTP notification emails
- Reply-To support using the sender's address
- Database persistence even if email delivery fails

### SEO Foundation

- Route-specific page titles
- Route-specific meta descriptions
- Dynamic canonical URLs
- Open Graph metadata
- Twitter card metadata
- `robots.txt`
- `sitemap.xml`
- `Person` structured data
- `WebSite` structured data
- Project-specific `SoftwareSourceCode` structured data
- `noindex, nofollow` for not-found routes

### Production Delivery

- Multi-stage backend Docker image
- Multi-stage frontend Docker image
- Nginx frontend container
- Docker Compose service network
- PostgreSQL health check
- Persistent PostgreSQL volume
- DigitalOcean deployment
- Host Nginx reverse proxy
- Cloudflare proxy
- HTTPS certificate renewal
- UFW firewall

---

## Data Flows

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

### Contact Message

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

The database save happens before the notification attempt.

If SMTP delivery fails, the message remains stored in PostgreSQL.

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
│   ├── public/
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   │
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.js
│   │   │   ├── contactApi.js
│   │   │   ├── healthApi.js
│   │   │   └── projectsApi.js
│   │   │
│   │   ├── components/
│   │   │   └── Seo.jsx
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

### Requirements

- Java 21
- Node.js
- npm
- Git
- PostgreSQL

### Create the Database

```sql
CREATE DATABASE onurerkoc_dev;
```

Default settings:

```text
Host:     localhost
Port:     5432
Database: onurerkoc_dev
Username: postgres
```

Set the password in PowerShell:

```powershell
$env:DB_PASSWORD = "your-postgresql-password"
```

Optional variables:

```powershell
$env:DB_URL = "jdbc:postgresql://localhost:5432/onurerkoc_dev"
$env:DB_USERNAME = "postgres"
$env:DB_PASSWORD = "your-postgresql-password"
```

### Load Initial Project Data

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" `
  -U postgres `
  -h localhost `
  -d onurerkoc_dev `
  -f "backend\database\project-data.sql"
```

The script recreates these project records:

- `onurerkoc.dev`
- `Portfolio API`
- `Deployment Lab`

It does not remove contact messages.

### Run the Backend

```powershell
cd backend
$env:DB_PASSWORD = "your-postgresql-password"
.\mvnw.cmd spring-boot:run
```

Backend:

```text
http://localhost:8080
```

### Run the Frontend

```powershell
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Vite forwards `/api` requests to the Spring Boot backend.

---

## Docker Compose

Create a real `.env` file in the repository root:

```env
POSTGRES_PASSWORD=your-database-password

CONTACT_EMAIL_ENABLED=true
MAIL_USERNAME=your-gmail-address@gmail.com
MAIL_PASSWORD=your-google-app-password
CONTACT_NOTIFICATION_TO=your-notification-address@gmail.com
```

Use a Google App Password for `MAIL_PASSWORD`.

The real `.env` file is ignored by Git.

### Validate Configuration

```powershell
docker compose config
```

### Start the Full Stack

```powershell
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

### Delete the PostgreSQL Volume

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
| `CONTACT_EMAIL_ENABLED` | Enables or disables notifications |
| `MAIL_USERNAME` | Gmail sender account |
| `MAIL_PASSWORD` | Google App Password |
| `CONTACT_NOTIFICATION_TO` | Notification recipient |

Real values must not be committed.

---

## API Endpoints

### Health

```http
GET /api/health
```

### Project List

```http
GET /api/projects
```

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

Unknown project slugs return:

```text
404 Not Found
```

### Contact Form

```http
POST /api/contact
```

Example:

```json
{
  "name": "Onur Erkoç",
  "email": "onur@example.com",
  "message": "Hello from the contact form."
}
```

Responses:

```text
201 Created     -> Message validated and stored
400 Bad Request -> Invalid or oversized data
```

Limits:

```text
name    -> 100 characters
email   -> 255 characters
message -> 2000 characters
```

A successful request stores the message and attempts to send a notification email.

---

## Persistence Design

### Projects

Main project data:

```text
projects
```

Collection tables:

```text
project_tech_stack
project_key_decisions
project_next_steps
```

The project uses:

```java
@Transactional(readOnly = true)
```

and:

```properties
spring.jpa.open-in-view=false
```

Entity-to-DTO mapping is completed inside the service transaction.

### Contact Messages

Stored in:

```text
contact_messages
```

Fields:

```text
id
name
email
message
created_at
```

---

## Production Deployment

Live application:

```text
https://onurerkoc.dev
```

Deployment documentation:

```text
docs/production-deployment.md
```

Reusable host Nginx configuration:

```text
infrastructure/nginx/onurerkoc.dev.conf
```

### Production Update

Run on the DigitalOcean server:

```bash
cd ~/onurerkoc.dev
git switch main
git pull origin main
docker compose up --build -d
docker compose ps
```

### Verification

```bash
curl https://onurerkoc.dev/api/health
curl https://onurerkoc.dev/api/projects
curl -I https://onurerkoc.dev/robots.txt
curl -I https://onurerkoc.dev/sitemap.xml
```

### Public Ports

```text
22  -> SSH
80  -> HTTP
443 -> HTTPS
```

Not publicly exposed:

```text
3000
8080
5432
```

### Certificate Renewal Test

```bash
sudo certbot renew --dry-run
```

---

## Git Workflow

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

Create a feature branch:

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

After merge:

```powershell
git switch main
git pull origin main
git branch -d feature/feature-name
```

---

## Security Notes

- Real `.env` files are ignored by Git.
- Database passwords are never committed.
- Gmail uses a Google App Password.
- PostgreSQL is not publicly exposed.
- Frontend and backend ports are bound to localhost.
- Only SSH, HTTP, and HTTPS are public.
- Cloudflare proxies public traffic.
- Contact messages remain stored if email delivery fails.

---

## Roadmap

### Site Design v2

- Improve the information architecture
- Refine navigation
- Improve reusable components
- Redesign project list and detail experiences
- Improve mobile presentation

### Turkish and English Support

- Define a locale strategy
- Add Turkish and English interface content
- Decide multilingual route structure
- Translate validation and status messages
- Add multilingual SEO rules

### Project API v2

- Review the project content model
- Separate localized and shared fields
- Review the PostgreSQL schema
- Update entity, DTO, mapper, service, and repository responsibilities
- Rebuild project pages around the new model

### Reliability and Security

- Add contact spam protection
- Add endpoint rate limiting
- Add backend tests
- Add frontend critical-flow tests
- Add versioned database migrations
- Add deployment automation after the manual workflow is fully understood

### Future Administration

- Add project create and update endpoints
- Add an administration interface
- Add contact message administration

---

# Türkçe

## Genel Bakış

`onurerkoc.dev` sıradan bir portfolyo şablonu değildir.

Gerçek full-stack sistemleri adım adım geliştirdiğim, test ettiğim, production ortamına taşıdığım ve mühendislik kararlarını belgelediğim canlı bir yazılım platformudur.

Proje şu alanları tek sistemde bir araya getirir:

- Frontend geliştirme
- Backend mimarisi
- REST API tasarımı
- PostgreSQL veri kalıcılığı
- Docker tabanlı dağıtım
- Linux sunucu yönetimi
- Reverse proxy yapılandırması
- Cloudflare ve HTTPS
- İletişim formu e-posta bildirimleri
- Teknik SEO
- Git feature branch ve pull request akışı

Amaç yalnızca bitmiş ekranları göstermek değil, bu ekranların arkasındaki yazılım ve altyapı sürecini de ortaya koymaktır.

---

## Güncel Durum

Uygulama production ortamında canlıdır:

```text
https://onurerkoc.dev
```

Tamamlanan ana alanlar:

- React ve Vite frontend
- Java 21 ve Spring Boot backend
- PostgreSQL veri kalıcılığı
- Proje liste ve detay API'leri
- Backend tarafından beslenen proje vaka analizleri
- İletişim formu veri kaydı
- Gmail SMTP e-posta bildirimleri
- Frontend ve backend Docker imajları
- Docker Compose servis yönetimi
- Kalıcı PostgreSQL volume
- DigitalOcean deployment
- Host Nginx reverse proxy
- Cloudflare DNS ve proxy
- Let's Encrypt ve Certbot ile HTTPS
- UFW firewall
- Route bazlı SEO metadata
- `robots.txt`
- `sitemap.xml`
- JSON-LD structured data
- Git feature branch ve pull request düzeni

---

## Teknoloji Yığını

### Frontend

- React
- Vite
- JavaScript
- React Router
- CSS
- Production Nginx container

### Backend

- Java 21
- Spring Boot
- Spring Web MVC
- Spring Data JPA
- Hibernate
- Spring Boot Mail
- Maven
- REST API

### Veritabanı

- PostgreSQL 18

### Altyapı

- Docker
- Docker Compose
- Ubuntu 24.04 LTS
- DigitalOcean
- Host Nginx
- Cloudflare
- Let's Encrypt
- Certbot
- UFW

---

## Production Mimarisi

```text
Kullanıcı
  -> Cloudflare DNS ve proxy
  -> DigitalOcean Ubuntu sunucu
  -> Host Nginx reverse proxy
  -> React frontend container
  -> Spring Boot backend container
  -> PostgreSQL container
```

Docker Compose üç servis çalıştırır:

```text
frontend
backend
database
```

Dış trafik host Nginx üzerinden sisteme girer:

```text
İnternet
  -> 80 / 443 portları
  -> Host Nginx
  -> 127.0.0.1:3000
  -> Frontend container
```

Frontend container API isteklerini Docker ağı üzerinden backend servisine iletir:

```text
Tarayıcı
  -> /api
  -> Frontend Nginx
  -> backend:8080
  -> Spring Boot
```

Container portları yalnızca localhost'a bağlıdır:

```text
Frontend: 127.0.0.1:3000
Backend:  127.0.0.1:8080
```

PostgreSQL internete açık değildir.

---

## Ana Özellikler

### Proje Platformu

- PostgreSQL'den yüklenen proje listesi
- Slug tabanlı proje detay sayfaları
- Backend tarafından yönetilen proje içerikleri
- Mühendislik vaka analizi bölümleri
- Teknoloji listeleri
- Mimari kararlar
- Proje yol haritaları
- Loading, error ve not-found durumları

### İletişim Sistemi

- Kontrollü React iletişim formu
- Backend doğrulaması
- Girdi temizleme
- Maksimum alan uzunlukları
- PostgreSQL veri kaydı
- Otomatik oluşturulma zamanı
- Gmail SMTP bildirim e-postaları
- Gönderen adresi için Reply-To desteği
- Mail gönderilemese bile veritabanı kaydının korunması

### SEO Temeli

- Route bazlı sayfa başlıkları
- Route bazlı meta description
- Dinamik canonical URL
- Open Graph metadata
- Twitter card metadata
- `robots.txt`
- `sitemap.xml`
- `Person` structured data
- `WebSite` structured data
- Projeye özel `SoftwareSourceCode` structured data
- Bulunamayan sayfalar için `noindex, nofollow`

### Production Dağıtımı

- Multi-stage backend Docker imajı
- Multi-stage frontend Docker imajı
- Frontend Nginx container
- Docker Compose servis ağı
- PostgreSQL healthcheck
- Kalıcı PostgreSQL volume
- DigitalOcean deployment
- Host Nginx reverse proxy
- Cloudflare proxy
- HTTPS sertifika yenileme
- UFW firewall

---

## Veri Akışları

### Proje Verisi

```text
PostgreSQL
  -> ProjectRepository
  -> ProjectEntity
  -> ProjectMapper
  -> ProjectDto
  -> ProjectService
  -> ProjectController
  -> JSON yanıtı
  -> React frontend
```

### İletişim Mesajı

```text
React ContactForm
  -> Frontend API katmanı
  -> POST /api/contact
  -> ContactController
  -> ContactService
  -> ContactMessageRepository
  -> PostgreSQL
  -> ContactNotificationService
  -> Gmail SMTP
  -> Bildirim e-postası
```

Önce veritabanı kaydı yapılır, ardından e-posta bildirimi gönderilmeye çalışılır.

SMTP hatası oluşursa mesaj PostgreSQL içinde kalmaya devam eder.

---

## Proje Yapısı

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
│   ├── public/
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   │
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   └── Seo.jsx
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

## Yerel Geliştirme

### Gereksinimler

- Java 21
- Node.js
- npm
- Git
- PostgreSQL

### Veritabanını Oluştur

```sql
CREATE DATABASE onurerkoc_dev;
```

Varsayılan ayarlar:

```text
Host:     localhost
Port:     5432
Database: onurerkoc_dev
Username: postgres
```

PowerShell oturumunda parolayı tanımla:

```powershell
$env:DB_PASSWORD = "postgresql-parolan"
```

İsteğe bağlı değişkenler:

```powershell
$env:DB_URL = "jdbc:postgresql://localhost:5432/onurerkoc_dev"
$env:DB_USERNAME = "postgres"
$env:DB_PASSWORD = "postgresql-parolan"
```

### İlk Proje Verilerini Yükle

```powershell
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" `
  -U postgres `
  -h localhost `
  -d onurerkoc_dev `
  -f "backend\database\project-data.sql"
```

Script şu proje kayıtlarını yeniden oluşturur:

- `onurerkoc.dev`
- `Portfolio API`
- `Deployment Lab`

İletişim mesajlarını silmez.

### Backend'i Çalıştır

```powershell
cd backend
$env:DB_PASSWORD = "postgresql-parolan"
.\mvnw.cmd spring-boot:run
```

Backend:

```text
http://localhost:8080
```

### Frontend'i Çalıştır

```powershell
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Vite, `/api` isteklerini Spring Boot backend'e yönlendirir.

---

## Docker Compose

Proje kökünde gerçek `.env` dosyasını oluştur:

```env
POSTGRES_PASSWORD=veritabani-parolan

CONTACT_EMAIL_ENABLED=true
MAIL_USERNAME=gmail-adresin@gmail.com
MAIL_PASSWORD=google-uygulama-sifren
CONTACT_NOTIFICATION_TO=bildirim-adresin@gmail.com
```

`MAIL_PASSWORD` için normal Google şifresi değil, Google App Password kullanılmalıdır.

Gerçek `.env` dosyası Git tarafından ignore edilir.

### Yapılandırmayı Kontrol Et

```powershell
docker compose config
```

### Tüm Sistemi Başlat

```powershell
docker compose up --build -d
```

### Servisleri Kontrol Et

```powershell
docker compose ps
```

### Backend Loglarını Gör

```powershell
docker compose logs --tail=200 backend
```

### Verileri Silmeden Durdur

```powershell
docker compose down
```

### PostgreSQL Volume'unu Sil

```powershell
docker compose down -v
```

Normal geliştirme ve production güncellemelerinde `-v` kullanma.

---

## Ortam Değişkenleri

### Veritabanı

| Değişken | Açıklama |
|---|---|
| `POSTGRES_PASSWORD` | PostgreSQL container parolası |
| `DB_URL` | JDBC bağlantı adresi |
| `DB_USERNAME` | PostgreSQL kullanıcı adı |
| `DB_PASSWORD` | Backend veritabanı parolası |

### İletişim E-postası

| Değişken | Açıklama |
|---|---|
| `CONTACT_EMAIL_ENABLED` | Bildirimleri açar veya kapatır |
| `MAIL_USERNAME` | Gönderici Gmail hesabı |
| `MAIL_PASSWORD` | Google App Password |
| `CONTACT_NOTIFICATION_TO` | Bildirimin gönderileceği adres |

Gerçek değerler GitHub'a gönderilmemelidir.

---

## API Endpointleri

### Health

```http
GET /api/health
```

### Proje Listesi

```http
GET /api/projects
```

### Proje Detayı

```http
GET /api/projects/{slug}
```

Örnekler:

```text
GET /api/projects/onurerkoc-dev
GET /api/projects/portfolio-api
GET /api/projects/deployment-lab
```

Olmayan slug için:

```text
404 Not Found
```

### İletişim Formu

```http
POST /api/contact
```

Örnek:

```json
{
  "name": "Onur Erkoç",
  "email": "onur@example.com",
  "message": "İletişim formundan gönderilen test mesajı."
}
```

Yanıtlar:

```text
201 Created     -> Mesaj doğrulandı ve kaydedildi
400 Bad Request -> Geçersiz veya fazla uzun veri
```

Limitler:

```text
name    -> 100 karakter
email   -> 255 karakter
message -> 2000 karakter
```

Başarılı istek mesajı PostgreSQL'e kaydeder ve e-posta bildirimi göndermeyi dener.

---

## Veri Kalıcılığı Tasarımı

### Projeler

Ana tablo:

```text
projects
```

Liste tabloları:

```text
project_tech_stack
project_key_decisions
project_next_steps
```

Proje okuma işlemlerinde:

```java
@Transactional(readOnly = true)
```

kullanılır.

Ayrıca:

```properties
spring.jpa.open-in-view=false
```

ayarına sahiptir.

Entity-to-DTO dönüşümü service transaction içinde tamamlanır.

### İletişim Mesajları

Tablo:

```text
contact_messages
```

Alanlar:

```text
id
name
email
message
created_at
```

---

## Production Deployment

Canlı uygulama:

```text
https://onurerkoc.dev
```

Deployment dokümanı:

```text
docs/production-deployment.md
```

Tekrar kullanılabilir host Nginx ayarı:

```text
infrastructure/nginx/onurerkoc.dev.conf
```

### Production Güncelleme

DigitalOcean sunucusunda:

```bash
cd ~/onurerkoc.dev
git switch main
git pull origin main
docker compose up --build -d
docker compose ps
```

### Doğrulama

```bash
curl https://onurerkoc.dev/api/health
curl https://onurerkoc.dev/api/projects
curl -I https://onurerkoc.dev/robots.txt
curl -I https://onurerkoc.dev/sitemap.xml
```

### Açık Portlar

```text
22  -> SSH
80  -> HTTP
443 -> HTTPS
```

İnternete açık olmayan portlar:

```text
3000
8080
5432
```

### Sertifika Yenileme Testi

```bash
sudo certbot renew --dry-run
```

---

## Git Akışı

```text
main
  -> feature branch
  -> commit
  -> push
  -> pull request
  -> review
  -> merge
  -> local main güncelleme
```

Feature branch oluştur:

```powershell
git switch main
git pull origin main
git switch -c feature/feature-name
```

Kontrol ve commit:

```powershell
git status
git diff
git add .
git diff --staged
git commit -m "Tamamlanan özelliği açıkla"
```

Push:

```powershell
git push -u origin feature/feature-name
```

Merge sonrasında:

```powershell
git switch main
git pull origin main
git branch -d feature/feature-name
```

---

## Güvenlik Notları

- Gerçek `.env` dosyaları Git tarafından ignore edilir.
- Veritabanı parolaları commit edilmez.
- Gmail için Google App Password kullanılır.
- PostgreSQL internete açılmaz.
- Frontend ve backend portları localhost'a bağlıdır.
- Yalnızca SSH, HTTP ve HTTPS dışarıya açıktır.
- Cloudflare dış trafiği proxy üzerinden geçirir.
- E-posta gönderilemese bile iletişim mesajı veritabanında kalır.

---

## Yol Haritası

### Site Tasarımı v2

- Bilgi mimarisini iyileştirme
- Navigasyonu sadeleştirme
- Tekrar kullanılabilir componentleri iyileştirme
- Proje liste ve detay deneyimini yeniden tasarlama
- Mobil görünümü geliştirme

### Türkçe ve İngilizce Desteği

- Locale stratejisi belirleme
- Türkçe ve İngilizce arayüz içeriği ekleme
- Çoklu dil route yapısını belirleme
- Validation ve durum mesajlarını çevirme
- Çoklu dil SEO kurallarını ekleme

### Project API v2

- Proje içerik modelini gözden geçirme
- Ortak ve çevrilebilir alanları ayırma
- PostgreSQL şemasını gözden geçirme
- Entity, DTO, mapper, service ve repository sorumluluklarını güncelleme
- Proje sayfalarını yeni modele göre yeniden kurma

### Güvenilirlik ve Güvenlik

- İletişim formuna spam koruması
- Endpoint rate limiting
- Backend testleri
- Kritik frontend akış testleri
- Versiyonlu database migration
- Manuel süreç öğrenildikten sonra deployment otomasyonu

### Gelecek Yönetim Özellikleri

- Proje ekleme ve güncelleme endpointleri
- Yönetim arayüzü
- İletişim mesajı yönetimi

---

## Canlı Site

[https://onurerkoc.dev](https://onurerkoc.dev)