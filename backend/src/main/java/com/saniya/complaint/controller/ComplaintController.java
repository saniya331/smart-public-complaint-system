package com.saniya.complaint.controller;

import com.saniya.complaint.entity.Complaint;
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
}