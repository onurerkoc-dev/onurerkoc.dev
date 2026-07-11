package com.onurerkoc.backend.project;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    public List<ProjectDto> getProjects() {
        return List.of(
                new ProjectDto(
                        "onurerkoc-dev",
                        "onurerkoc.dev",
                        "onurerkoc-dev",
                        "Full-stack platform",
                        "Personal full-stack build lab and engineering notebook.",
                        "A real-world personal engineering platform built step by step with React, Spring Boot, REST APIs and deployment infrastructure.",
                        List.of(
                                "React",
                                "Vite",
                                "Java 21",
                                "Spring Boot",
                                "REST API"
                        ),
                        "active build",
                        "",
                        "",
                        true,
                        "Traditional portfolio websites usually display only finished projects and do not show the engineering process, architectural decisions or development progress behind them.",
                        "Build a production-oriented personal platform that documents frontend, backend and infrastructure development as an evolving engineering notebook.",
                        "A React and Vite frontend communicates with a Java 21 and Spring Boot REST API through a centralized frontend API layer. Vite proxies local API requests to the backend.",
                        List.of(
                                "Separate the frontend and backend into independent applications",
                                "Centralize frontend API requests under src/api",
                                "Use slug-based routes for individual project pages",
                                "Separate controller, service and DTO responsibilities"
                        ),
                        List.of(
                                "Add PostgreSQL persistence",
                                "Create Docker configurations for frontend and backend",
                                "Configure Nginx as a reverse proxy",
                                "Deploy the platform to DigitalOcean"
                        ),
                        "2026-07-11"
                ),

                new ProjectDto(
                        "portfolio-api",
                        "Portfolio API",
                        "portfolio-api",
                        "Backend module",
                        "Spring Boot API layer for project and system data.",
                        "A backend module that provides health information, project lists and individual project detail responses for the personal platform.",
                        List.of(
                                "Java 21",
                                "Spring Boot",
                                "REST API"
                        ),
                        "building",
                        "",
                        "",
                        true,
                        "The frontend needs a structured and reusable source of project data instead of keeping project content directly inside React components.",
                        "Provide a clean REST API that can serve project data to the frontend and later support database-backed content management.",
                        "The module uses a Spring REST controller for HTTP requests, a service layer for project lookup logic and ProjectDto records for transferring project data.",
                        List.of(
                                "Keep HTTP request handling inside the controller",
                                "Keep project lookup logic inside the service",
                                "Return 404 Not Found when a project slug does not exist",
                                "Use DTO records to define the API response structure"
                        ),
                        List.of(
                                "Move project data from List.of into PostgreSQL",
                                "Add repository and entity layers",
                                "Add request validation",
                                "Add automated service and controller tests"
                        ),
                        "2026-07-11"
                ),

                new ProjectDto(
                        "deployment-lab",
                        "Deployment Lab",
                        "deployment-lab",
                        "Infrastructure lab",
                        "Linux, Docker, Nginx and DigitalOcean deployment track.",
                        "An infrastructure module for packaging, deploying and operating the frontend and backend on a Linux server.",
                        List.of(
                                "Linux",
                                "Docker",
                                "Nginx",
                                "DigitalOcean"
                        ),
                        "planned",
                        "",
                        "",
                        false,
                        "The frontend and backend currently run only in the local development environment and are not yet available through a production domain.",
                        "Deploy the full-stack platform to a Linux server with repeatable containers, reverse proxy routing and production environment configuration.",
                        "The planned architecture uses separate frontend and backend containers, Nginx as the public reverse proxy and DigitalOcean as the hosting infrastructure.",
                        List.of(
                                "Containerize frontend and backend separately",
                                "Use Nginx as the public entry point",
                                "Keep environment-specific configuration outside the source code",
                                "Use the domain onurerkoc.dev as the production address"
                        ),
                        List.of(
                                "Create backend Dockerfile",
                                "Create frontend production Dockerfile",
                                "Add Docker Compose configuration",
                                "Configure Nginx routes",
                                "Connect the domain and enable HTTPS"
                        ),
                        "2026-07-11"
                )
        );
    }

    public Optional<ProjectDto> getProjectBySlug(String slug) {
        List<ProjectDto> projects = getProjects();

        for (ProjectDto project : projects) {
            if (project.slug().equals(slug)) {
                return Optional.of(project);
            }
        }

        return Optional.empty();
    }
}