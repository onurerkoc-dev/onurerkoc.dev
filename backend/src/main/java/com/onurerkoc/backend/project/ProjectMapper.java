package com.onurerkoc.backend.project;

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
                entity.getTechStack(),
                entity.getStatus(),
                entity.getGithubUrl(),
                entity.getLiveUrl(),
                entity.isFeatured(),
                entity.getProblem(),
                entity.getGoal(),
                entity.getArchitecture(),
                entity.getKeyDecisions(),
                entity.getNextSteps(),
                entity.getUpdatedAt().toString()
        );
    }
}