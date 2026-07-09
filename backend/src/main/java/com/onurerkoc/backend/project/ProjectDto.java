package com.onurerkoc.backend.project;

import java.util.List;

public record ProjectDto(
        String id,
        String title,
        String slug,
        String type,
        String summary,
        String description,
        List<String> techStack,
        String status,
        String githubUrl,
        String liveUrl,
        boolean featured
) {
}