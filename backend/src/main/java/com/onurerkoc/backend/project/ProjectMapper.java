package com.onurerkoc.backend.project;

import java.util.List;

public class ProjectMapper {

    private ProjectMapper() {
    }

    public static ProjectDto toDto(ProjectEntity entity) {
        return new ProjectDto(
                String.valueOf(entity.getId()),
                entity.getTitle(),
                entity.getSlug(),
                entity.getType(),
                entity.getSummary(),
                entity.getDescription(),
                List.copyOf(entity.getTechStack()),
                entity.getStatus(),
                entity.getGithubUrl(),
                entity.getLiveUrl(),
                entity.isFeatured(),
                entity.getProblem(),
                entity.getGoal(),
                entity.getArchitecture(),
                List.copyOf(entity.getKeyDecisions()),
                List.copyOf(entity.getNextSteps()),
                entity.getUpdatedAt().toString()
        );
    }
}