package com.saniya.complaint.dto;

public class AIClassificationResponse {

    private String category;
    private String priority;

    public AIClassificationResponse() {
    }

    public AIClassificationResponse(String category, String priority) {
        this.category = category;
        this.priority = priority;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }
}