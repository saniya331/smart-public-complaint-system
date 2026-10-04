package com.saniya.complaint.controller;

import com.saniya.complaint.entity.Complaint;
import com.saniya.complaint.entity.ComplaintEvidence;
import com.saniya.complaint.entity.Role;
import com.saniya.complaint.entity.User;
import com.saniya.complaint.service.ComplaintEvidenceService;
import com.saniya.complaint.service.ComplaintService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintEvidenceController {

    private final ComplaintEvidenceService evidenceService;
    private final ComplaintService complaintService;

    private final Path uploadDirectory = Paths.get("uploads");

    public ComplaintEvidenceController(
            ComplaintEvidenceService evidenceService,
            ComplaintService complaintService) {

        this.evidenceService = evidenceService;
        this.complaintService = complaintService;
    }

    @PostMapping("/{complaintId}/evidence")
    public ResponseEntity<?> uploadEvidence(
            @PathVariable Long complaintId,
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        var complaintOptional =
                complaintService.getComplaintById(complaintId);

        if (complaintOptional.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Complaint not found");
        }

        Complaint complaint = complaintOptional.get();

        /*
         * ADMIN can upload evidence for any complaint.
         */
        if (user.getRole() == Role.ADMIN) {
            // Allowed
        }

        /*
         * OFFICER can upload evidence only for assigned complaints.
         */
        else if (user.getRole() == Role.OFFICER) {

            if (complaint.getAssignedOfficer() == null
                    || !complaint.getAssignedOfficer()
                    .getId()
                    .equals(user.getId())) {

                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(
                                "You can upload evidence only for complaints assigned to you"
                        );
            }
        }

        /*
         * CITIZEN can upload evidence only for their own complaint.
         */
        else if (user.getRole() == Role.CITIZEN) {

            if (complaint.getCitizen() == null
                    || !complaint.getCitizen()
                    .getId()
                    .equals(user.getId())) {

                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(
                                "You can upload evidence only for your own complaints"
                        );
            }
        }

        else {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("Access denied");
        }

        try {

            if (file == null || file.isEmpty()) {
                return ResponseEntity
                        .badRequest()
                        .body("Please select a file");
            }

            /*
             * Allow only JPG and PNG images.
             */
            String contentType = file.getContentType();

            if (!"image/jpeg".equals(contentType)
                    && !"image/png".equals(contentType)) {

                return ResponseEntity
                        .badRequest()
                        .body("Only JPG and PNG images are allowed");
            }

            /*
             * Maximum file size: 10 MB.
             */
            if (file.getSize() > 10 * 1024 * 1024) {

                return ResponseEntity
                        .badRequest()
                        .body("Image size must not exceed 10 MB");
            }

            Files.createDirectories(uploadDirectory);

            String originalFileName =
                    file.getOriginalFilename();

            String extension = "";

            if (originalFileName != null
                    && originalFileName.contains(".")) {

                extension = originalFileName.substring(
                        originalFileName.lastIndexOf(".")
                );
            }

            String storedFileName =
                    UUID.randomUUID() + extension;

            Path filePath =
                    uploadDirectory.resolve(storedFileName);

            Files.copy(
                    file.getInputStream(),
                    filePath
            );

            ComplaintEvidence evidence =
                    new ComplaintEvidence();

            evidence.setComplaintId(complaintId);
            evidence.setFileName(originalFileName);
            evidence.setFileType(contentType);
            evidence.setFilePath(filePath.toString());

            ComplaintEvidence savedEvidence =
                    evidenceService.saveEvidence(evidence);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedEvidence);

        } catch (IOException e) {

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload file");
        }
    }

    @GetMapping("/{complaintId}/evidence")
    public ResponseEntity<?> getComplaintEvidence(
            @PathVariable Long complaintId,
            Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        var complaintOptional =
                complaintService.getComplaintById(complaintId);

        if (complaintOptional.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Complaint not found");
        }

        Complaint complaint = complaintOptional.get();

        /*
         * ADMIN can view all evidence.
         */
        if (user.getRole() == Role.ADMIN) {
            // Allowed
        }

        /*
         * OFFICER can view evidence only for assigned complaints.
         */
        else if (user.getRole() == Role.OFFICER) {

            if (complaint.getAssignedOfficer() == null
                    || !complaint.getAssignedOfficer()
                    .getId()
                    .equals(user.getId())) {

                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(
                                "You can view evidence only for complaints assigned to you"
                        );
            }
        }

        /*
         * CITIZEN can view evidence only for their own complaints.
         */
        else if (user.getRole() == Role.CITIZEN) {

            if (complaint.getCitizen() == null
                    || !complaint.getCitizen()
                    .getId()
                    .equals(user.getId())) {

                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(
                                "You can view evidence only for your own complaints"
                        );
            }
        }

        else {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("Access denied");
        }

        return ResponseEntity.ok(
                evidenceService
                        .getEvidenceByComplaintId(complaintId)
        );
    }
}