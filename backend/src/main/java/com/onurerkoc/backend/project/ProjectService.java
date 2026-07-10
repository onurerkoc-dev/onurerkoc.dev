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
                        "A real-world personal engineering platform built step by step with React, Spring Boot, REST APIs and future deployment infrastructure.",
                        List.of("React", "Vite", "Java 21", "Spring Boot", "REST API"),
                        "active build",
                        "https://github.com/onurerkoc-dev/onurerkoc.dev",
                        "onurerkoc.dev",
                        true
                ),
                new ProjectDto(
                        "portfolio-api",
                        "Portfolio API",
                        "portfolio-api",
                        "Backend module",
                        "Spring Boot API layer for project and system data.",
                        "Backend module that serves project data, health checks and future admin-driven content for the personal platform.",
                        List.of("Java", "Spring Boot", "REST API"),
                        "building",
                        "",
                        "",
                        true
                ),
                new ProjectDto(
                        "deployment-lab",
                        "Deployment Lab",
                        "deployment-lab",
                        "Infrastructure lab",
                        "Linux, Docker, Nginx and DigitalOcean deployment track.",
                        "Infrastructure module planned for deploying the frontend and backend to a Linux server with Docker, Nginx and production-ready reverse proxy configuration.",
                        List.of("Linux", "Docker", "Nginx", "DigitalOcean"),
                        "planned",
                        "",
                        "",
                        false
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