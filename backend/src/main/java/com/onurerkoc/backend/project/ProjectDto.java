package com.onurerkoc.backend.project;

import java.util.List;

public record ProjectDto(
        String title,
        String description,
        List<String> techStack,
        String status
) {
}