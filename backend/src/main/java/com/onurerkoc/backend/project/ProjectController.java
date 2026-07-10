package com.onurerkoc.backend.project;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/api/projects")
    public List<ProjectDto> getProjects() {
        return projectService.getProjects();
    }
    @GetMapping("/api/projects/{slug}")
    public ResponseEntity<ProjectDto> getProjectBySlug(@PathVariable String slug) {
        Optional<ProjectDto> project = projectService.getProjectBySlug(slug);

        if (project.isPresent()) {
            return ResponseEntity.ok(project.get());
        }

        return ResponseEntity.notFound().build();
    }
}