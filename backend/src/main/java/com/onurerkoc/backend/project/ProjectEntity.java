package com.onurerkoc.backend.project;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
public class ProjectEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, unique = true, length = 150)
    private String slug;

    @Column(nullable = false, length = 100)
    private String type;

    @Column(nullable = false, length = 500)
    private String summary;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 100)
    private String status;

    @Column(name = "github_url", length = 500)
    private String githubUrl;

    @Column(name = "live_url", length = 500)
    private String liveUrl;

    @Column(nullable = false)
    private boolean featured;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String problem;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String goal;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String architecture;

    @ElementCollection
    @CollectionTable(
            name = "project_tech_stack",
            joinColumns = @JoinColumn(name = "project_id")
    )
    @OrderColumn(name = "item_order")
    @Column(name = "technology", nullable = false, length = 100)
    private List<String> techStack = new ArrayList<>();

    @ElementCollection
    @CollectionTable(
            name = "project_key_decisions",
            joinColumns = @JoinColumn(name = "project_id")
    )
    @OrderColumn(name = "item_order")
    @Column(name = "decision", nullable = false, columnDefinition = "TEXT")
    private List<String> keyDecisions = new ArrayList<>();

    @ElementCollection
    @CollectionTable(
            name = "project_next_steps",
            joinColumns = @JoinColumn(name = "project_id")
    )
    @OrderColumn(name = "item_order")
    @Column(name = "step", nullable = false, columnDefinition = "TEXT")
    private List<String> nextSteps = new ArrayList<>();

    @Column(name = "updated_at", nullable = false)
    private LocalDate updatedAt;

    protected ProjectEntity() {
    }

    public ProjectEntity(
            String title,
            String slug,
            String type,
            String summary,
            String description,
            String status,
            String githubUrl,
            String liveUrl,
            boolean featured,
            String problem,
            String goal,
            String architecture,
            List<String> techStack,
            List<String> keyDecisions,
            List<String> nextSteps,
            LocalDate updatedAt
    ) {
        this.title = title;
        this.slug = slug;
        this.type = type;
        this.summary = summary;
        this.description = description;
        this.status = status;
        this.githubUrl = githubUrl;
        this.liveUrl = liveUrl;
        this.featured = featured;
        this.problem = problem;
        this.goal = goal;
        this.architecture = architecture;
        this.techStack = new ArrayList<>(techStack);
        this.keyDecisions = new ArrayList<>(keyDecisions);
        this.nextSteps = new ArrayList<>(nextSteps);
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getSlug() {
        return slug;
    }

    public String getType() {
        return type;
    }

    public String getSummary() {
        return summary;
    }

    public String getDescription() {
        return description;
    }

    public String getStatus() {
        return status;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public String getLiveUrl() {
        return liveUrl;
    }

    public boolean isFeatured() {
        return featured;
    }

    public String getProblem() {
        return problem;
    }

    public String getGoal() {
        return goal;
    }

    public String getArchitecture() {
        return architecture;
    }

    public List<String> getTechStack() {
        return techStack;
    }

    public List<String> getKeyDecisions() {
        return keyDecisions;
    }

    public List<String> getNextSteps() {
        return nextSteps;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }
}