package com.onurerkoc.backend.project;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectDto> getProjects() {
        return projectRepository
                .findAll()
                .stream()
                .map(ProjectMapper::toDto)
                .toList();
    }

    public Optional<ProjectDto> getProjectBySlug(String slug) {
        return projectRepository
                .findBySlug(slug)
                .map(ProjectMapper::toDto);
    }
}