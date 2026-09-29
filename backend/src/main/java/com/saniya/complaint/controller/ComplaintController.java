package com.saniya.complaint.controller;

import com.saniya.complaint.entity.Complaint;
import com.saniya.complaint.entity.ComplaintStatus;
import com.saniya.complaint.entity.Role;
import com.saniya.complaint.entity.User;
import com.saniya.complaint.service.ComplaintService;
import com.saniya.complaint.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:5173")
public class ComplaintController {

    private final ComplaintService complaintService;
    private final UserService userService;

    public ComplaintController(
            ComplaintService complaintService,
            UserService userService) {

        this.complaintService = complaintService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> createComplaint(
            @RequestBody Complaint complaint,
            Authentication authentication) {

        User citizen = (User) authentication.getPrincipal();

        complaint.setCitizen(citizen);

        Complaint savedComplaint =
                complaintService.createComplaint(complaint);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedComplaint);
    }

    @GetMapping
    public ResponseEntity<List<Complaint>> getAllComplaints() {

        return ResponseEntity.ok(
                complaintService.getAllComplaints()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getComplaintById(
            @PathVariable Long id) {

        return complaintService
                .getComplaintById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyComplaints(
            Authentication authentication) {

        User citizen = (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                complaintService
                        .getComplaintsByCitizen(citizen)
        );
    }

    @GetMapping("/assigned")
    public ResponseEntity<?> getAssignedComplaints(
            Authentication authentication) {

        User officer = (User) authentication.getPrincipal();

        if (officer.getRole() != Role.OFFICER) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("Only officers can access assigned complaints");
        }

        return ResponseEntity.ok(
                complaintService
                        .getComplaintsByOfficer(officer)
        );
    }

    @PutMapping("/{id}/assign")
    public ResponseEntity<?> assignComplaint(
            @PathVariable Long id,
            @RequestParam Long officerId) {

        try {
            User officer = getOfficer(officerId);

            Complaint updatedComplaint =
                    complaintService.assignComplaint(
                            id,
                            officer
                    );

            return ResponseEntity.ok(updatedComplaint);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestParam ComplaintStatus status) {

        try {
            Complaint updatedComplaint =
                    complaintService.updateStatus(
                            id,
                            status
                    );

            return ResponseEntity.ok(updatedComplaint);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    private User getOfficer(Long officerId) {

        User officer = userService.getUserById(officerId);

        if (officer.getRole() != Role.OFFICER) {

            throw new RuntimeException(
                    "Selected user is not an officer"
            );
        }

        return officer;
    }
}