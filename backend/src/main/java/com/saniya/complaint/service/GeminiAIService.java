package com.saniya.complaint.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.saniya.complaint.dto.AIClassificationResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiAIService {

    @Value("${gemini.api-key:}")
    private String apiKey;

    @Value("${gemini.model:gemini-3.8-flash}")
    private String model;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public GeminiAIService() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public AIClassificationResponse classifyComplaint(
            String title,
            String description,
            String currentCategory) {

        if (apiKey == null || apiKey.isBlank()) {
            System.out.println("Gemini API key not configured. Using fallback classification.");
            return fallbackClassification(currentCategory);
        }

        try {

            String prompt = buildPrompt(
                    title,
                    description,
                    currentCategory
            );

            Map<String, Object> requestBody = new HashMap<>();

            requestBody.put("model", model);
            requestBody.put("input", prompt);

            /*
             * Ask Gemini to return strict JSON.
             */
            Map<String, Object> responseFormat = new HashMap<>();

            responseFormat.put("type", "text");
            responseFormat.put("mime_type", "application/json");

            Map<String, Object> schema = new HashMap<>();
            schema.put("type", "object");

            Map<String, Object> properties = new HashMap<>();

            Map<String, Object> categoryProperty = new HashMap<>();
            categoryProperty.put("type", "string");
            categoryProperty.put(
                    "enum",
                    List.of("Street Light")
            );

            Map<String, Object> priorityProperty = new HashMap<>();
            priorityProperty.put("type", "string");
            priorityProperty.put(
                    "enum",
                    List.of(
                            "LOW",
                            "MEDIUM",
                            "HIGH",
                            "URGENT"
                    )
            );

            properties.put("category", categoryProperty);
            properties.put("priority", priorityProperty);

            schema.put("properties", properties);
            schema.put(
                    "required",
                    List.of("category", "priority")
            );

            responseFormat.put("schema", schema);

            requestBody.put(
                    "response_format",
                    responseFormat
            );

            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(
                    MediaType.APPLICATION_JSON
            );

            headers.set(
                    "x-goog-api-key",
                    apiKey
            );

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(
                            requestBody,
                            headers
                    );

            String url =
                    "https://generativelanguage.googleapis.com/v1beta/interactions";

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.POST,
                            request,
                            String.class
                    );

            if (!response.getStatusCode().is2xxSuccessful()
                    || response.getBody() == null) {

                System.err.println(
                        "Gemini API returned: "
                                + response.getStatusCode()
                );

                return fallbackClassification(currentCategory);
            }

            JsonNode root =
                    objectMapper.readTree(
                            response.getBody()
                    );

            /*
             * Current Gemini Interactions API response:
             *
             * steps[]
             *   -> type = model_output
             *   -> content[]
             *      -> type = text
             *      -> text = JSON result
             */
            String outputText = null;

            JsonNode steps = root.path("steps");

            if (steps.isArray()) {

                for (JsonNode step : steps) {

                    if ("model_output".equals(
                            step.path("type").asText()
                    )) {

                        JsonNode content =
                                step.path("content");

                        if (content.isArray()) {

                            for (JsonNode contentBlock : content) {

                                if ("text".equals(
                                        contentBlock
                                                .path("type")
                                                .asText()
                                )) {

                                    outputText =
                                            contentBlock
                                                    .path("text")
                                                    .asText();

                                    break;
                                }
                            }
                        }
                    }

                    if (outputText != null
                            && !outputText.isBlank()) {
                        break;
                    }
                }
            }

            if (outputText == null
                    || outputText.isBlank()) {

                System.err.println(
                        "Gemini returned no classification text."
                );

                return fallbackClassification(currentCategory);
            }

            AIClassificationResponse result =
                    objectMapper.readValue(
                            outputText,
                            AIClassificationResponse.class
                    );

            System.out.println(
                    "Gemini classification: category="
                            + result.getCategory()
                            + ", priority="
                            + result.getPriority()
            );

            return result;

        } catch (Exception e) {

            System.err.println(
                    "Gemini AI classification failed: "
                            + e.getMessage()
            );

            return fallbackClassification(currentCategory);
        }
    }

    private String buildPrompt(
            String title,
            String description,
            String currentCategory) {

        return """
                You are an AI classifier for a Smart Public Complaint
                and Grievance Management System.

                Analyze the citizen complaint.

                Determine:
                1. Category
                2. Priority

                Available category:
                - Street Light

                Priority definitions:

                LOW:
                Minor issue with little immediate impact.

                MEDIUM:
                Normal public service issue.

                HIGH:
                Serious issue affecting multiple people or requiring
                prompt attention.

                URGENT:
                Dangerous situation, major public safety risk,
                or immediate emergency.

                Return only the JSON requested by the response schema.

                Complaint title:
                %s

                Complaint description:
                %s

                Category entered by citizen:
                %s
                """.formatted(
                title,
                description,
                currentCategory == null
                        ? ""
                        : currentCategory
        );
    }

    private AIClassificationResponse fallbackClassification(
            String currentCategory) {

        String category =
                currentCategory == null
                        || currentCategory.isBlank()
                        ? "Street Light"
                        : currentCategory;

        return new AIClassificationResponse(
                category,
                "MEDIUM"
        );
    }
}