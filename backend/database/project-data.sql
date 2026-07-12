-- Development project data for onurerkoc.dev
-- This script can be run again safely.
-- It only resets the three project records listed below.

BEGIN;

-- Remove existing list data first because these rows belong to projects.

DELETE FROM project_tech_stack
WHERE project_id IN (
    SELECT id
    FROM projects
    WHERE slug IN (
                   'onurerkoc-dev',
                   'portfolio-api',
                   'deployment-lab'
        )
);

DELETE FROM project_key_decisions
WHERE project_id IN (
    SELECT id
    FROM projects
    WHERE slug IN (
                   'onurerkoc-dev',
                   'portfolio-api',
                   'deployment-lab'
        )
);

DELETE FROM project_next_steps
WHERE project_id IN (
    SELECT id
    FROM projects
    WHERE slug IN (
                   'onurerkoc-dev',
                   'portfolio-api',
                   'deployment-lab'
        )
);

-- Remove existing main project records.

DELETE FROM projects
WHERE slug IN (
               'onurerkoc-dev',
               'portfolio-api',
               'deployment-lab'
    );

-- Main project records.

INSERT INTO projects (
    title,
    slug,
    type,
    summary,
    description,
    status,
    github_url,
    live_url,
    featured,
    problem,
    goal,
    architecture,
    updated_at
)
VALUES
    (
        'onurerkoc.dev',
        'onurerkoc-dev',
        'Full-stack platform',
        'Personal full-stack build lab and engineering notebook.',
        'A real-world personal engineering platform built step by step with React, Spring Boot, REST APIs and deployment infrastructure.',
        'active build',
        '',
        '',
        true,
        'Traditional portfolio websites usually display only finished projects and do not show the engineering process, architectural decisions or development progress behind them.',
        'Build a production-oriented personal platform that documents frontend, backend and infrastructure development as an evolving engineering notebook.',
        'A React and Vite frontend communicates with a Java 21 and Spring Boot REST API through a centralized frontend API layer.',
        DATE '2026-07-13'
    ),
    (
        'Portfolio API',
        'portfolio-api',
        'Backend module',
        'Spring Boot API layer for project and system data.',
        'A backend module that provides health information, project lists and individual project detail responses for the personal platform.',
        'building',
        '',
        '',
        true,
        'The frontend needs a structured and reusable source of project data instead of keeping project content directly inside React components.',
        'Provide a clean REST API that can serve project data to the frontend and later support database-backed content management.',
        'The module uses a Spring REST controller for HTTP requests, a service layer for project logic, Spring Data repositories for database access and DTO records for API responses.',
        DATE '2026-07-13'
    ),
    (
        'Deployment Lab',
        'deployment-lab',
        'Infrastructure lab',
        'Linux, Docker, Nginx and DigitalOcean deployment track.',
        'An infrastructure module for packaging, deploying and operating the frontend and backend on a Linux server.',
        'planned',
        '',
        '',
        false,
        'The frontend and backend currently run only in the local development environment and are not yet available through a production domain.',
        'Deploy the full-stack platform to a Linux server with repeatable containers, reverse proxy routing and production environment configuration.',
        'The planned architecture uses separate frontend and backend containers, Nginx as the public reverse proxy and DigitalOcean as the hosting infrastructure.',
        DATE '2026-07-13'
    );

-- Technology lists.

INSERT INTO project_tech_stack (
    project_id,
    item_order,
    technology
)
VALUES
    (
        (SELECT id FROM projects WHERE slug = 'onurerkoc-dev'),
        0,
        'React'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'onurerkoc-dev'),
        1,
        'Vite'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'onurerkoc-dev'),
        2,
        'Java 21'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'onurerkoc-dev'),
        3,
        'Spring Boot'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'onurerkoc-dev'),
        4,
        'REST API'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'onurerkoc-dev'),
        5,
        'PostgreSQL'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'portfolio-api'),
        0,
        'Java 21'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'portfolio-api'),
        1,
        'Spring Boot'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'portfolio-api'),
        2,
        'REST API'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'portfolio-api'),
        3,
        'Spring Data JPA'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'portfolio-api'),
        4,
        'PostgreSQL'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'deployment-lab'),
        0,
        'Linux'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'deployment-lab'),
        1,
        'Docker'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'deployment-lab'),
        2,
        'Nginx'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'deployment-lab'),
        3,
        'DigitalOcean'
    );

-- Engineering decisions.

INSERT INTO project_key_decisions (
    project_id,
    item_order,
    decision
)
VALUES
    (
        (SELECT id FROM projects WHERE slug = 'onurerkoc-dev'),
        0,
        'Separate the frontend and backend into independent applications'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'onurerkoc-dev'),
        1,
        'Centralize frontend API requests under src/api'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'onurerkoc-dev'),
        2,
        'Use slug-based routes for individual project pages'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'onurerkoc-dev'),
        3,
        'Separate controller, service, repository, entity and DTO responsibilities'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'portfolio-api'),
        0,
        'Keep HTTP request handling inside the controller'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'portfolio-api'),
        1,
        'Keep project logic inside the service'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'portfolio-api'),
        2,
        'Use a repository for PostgreSQL access'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'portfolio-api'),
        3,
        'Return 404 Not Found when a project slug does not exist'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'portfolio-api'),
        4,
        'Use DTO records to define the API response structure'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'deployment-lab'),
        0,
        'Containerize frontend and backend separately'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'deployment-lab'),
        1,
        'Use Nginx as the public entry point'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'deployment-lab'),
        2,
        'Keep environment-specific configuration outside the source code'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'deployment-lab'),
        3,
        'Use the domain onurerkoc.dev as the production address'
    );

-- Project roadmaps.

INSERT INTO project_next_steps (
    project_id,
    item_order,
    step
)
VALUES
    (
        (SELECT id FROM projects WHERE slug = 'onurerkoc-dev'),
        0,
        'Create Docker configurations for frontend and backend'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'onurerkoc-dev'),
        1,
        'Add Docker Compose configuration'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'onurerkoc-dev'),
        2,
        'Configure Nginx as a reverse proxy'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'onurerkoc-dev'),
        3,
        'Deploy the platform to DigitalOcean'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'portfolio-api'),
        0,
        'Add basic automated backend tests'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'portfolio-api'),
        1,
        'Add project creation and update endpoints later'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'portfolio-api'),
        2,
        'Add an administration workflow later'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'deployment-lab'),
        0,
        'Create backend Dockerfile'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'deployment-lab'),
        1,
        'Create frontend production Dockerfile'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'deployment-lab'),
        2,
        'Add Docker Compose configuration'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'deployment-lab'),
        3,
        'Configure Nginx routes'
    ),
    (
        (SELECT id FROM projects WHERE slug = 'deployment-lab'),
        4,
        'Connect the domain and enable HTTPS'
    );

COMMIT;