package com.onurerkoc.backend.project;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    public List<ProjectDto> getProjects() {
        return List.of(
                new ProjectDto(
                        "onurerkoc.dev",
                        "Personal full-stack developer platform built step by step with React, Spring Boot, PostgreSQL and Docker.",
                        List.of("React", "Spring Boot", "Docker"),
                        "in-progress"
                ),
                new ProjectDto(
                        "Portfolio API",
                        "Backend API that serves projects, skills, health status and future admin features.",
                        List.of("Java", "REST API", "Spring Boot"),
                        "building"
                ),
                new ProjectDto(
                        "Deployment Lab",
                        "Linux server and Docker-based deployment setup on DigitalOcean.",
                        List.of("Linux", "Nginx", "DigitalOcean"),
                        "planned"
                )
        );
    }
}