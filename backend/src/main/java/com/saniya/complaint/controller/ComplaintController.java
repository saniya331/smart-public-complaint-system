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

        User user = (User) authentication.getPrincipal();

        if (user.getRole() != Role.CITIZEN) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("Only citizens can create complaints");
        }

        complaint.setCitizen(user);

        Complaint savedComplaint =
                complaintService.createComplaint(complaint);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedComplaint);
    }

    @GetMapping
    public ResponseEntity<?> getAllComplaints(
            Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        if (user.getRole() != Role.ADMIN) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("Only admins can view all complaints");
        }

        return ResponseEntity.ok(
                complaintService.getAllComplaints()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getComplaintById(
            @PathVariable Long id,
            Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        var complaintOptional =
                complaintService.getComplaintById(id);

        if (complaintOptional.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Complaint not found");
        }

        Complaint complaint = complaintOptional.get();

        if (user.getRole() == Role.ADMIN) {

            return ResponseEntity.ok(complaint);
        }

        if (user.getRole() == Role.CITIZEN) {

            if (complaint.getCitizen() == null
                    || !complaint.getCitizen()
                    .getId()
                    .equals(user.getId())) {

                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body("You can view only your own complaints");
            }

            return ResponseEntity.ok(complaint);
        }

        if (user.getRole() == Role.OFFICER) {

            if (complaint.getAssignedOfficer() == null
                    || !complaint.getAssignedOfficer()
                    .getId()
                    .equals(user.getId())) {

                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body("You can view only complaints assigned to you");
            }

            return ResponseEntity.ok(complaint);
        }

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body("Access denied");
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyComplaints(
            Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        if (user.getRole() != Role.CITIZEN) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("Only citizens can access their complaints");
        }

        return ResponseEntity.ok(
                complaintService
                        .getComplaintsByCitizen(user)
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
            @RequestParam Long officerId,
            Authentication authentication) {

        User currentUser =
                (User) authentication.getPrincipal();

        if (currentUser.getRole() != Role.ADMIN) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("Only admins can assign complaints");
        }

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
            @RequestParam ComplaintStatus status,
            Authentication authentication) {

        User currentUser =
                (User) authentication.getPrincipal();

        try {

            Complaint complaint =
                    complaintService
                            .getComplaintById(id)
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "Complaint not found"
                                    )
                            );

            if (currentUser.getRole() == Role.ADMIN) {

                Complaint updatedComplaint =
                        complaintService.updateStatus(
                                id,
                                status
                        );

                return ResponseEntity.ok(updatedComplaint);
            }

            if (currentUser.getRole() == Role.OFFICER) {

                if (complaint.getAssignedOfficer() == null
                        || !complaint
                        .getAssignedOfficer()
                        .getId()
                        .equals(currentUser.getId())) {

                    return ResponseEntity
                            .status(HttpStatus.FORBIDDEN)
                            .body("You can update only complaints assigned to you");
                }

                Complaint updatedComplaint =
                        complaintService.updateStatus(
                                id,
                                status
                        );

                return ResponseEntity.ok(updatedComplaint);
            }

            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("Only officers and admins can update complaint status");

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    private User getOfficer(Long officerId) {

        User officer =
                userService.getUserById(officerId);

        if (officer.getRole() != Role.OFFICER) {

            throw new RuntimeException(
                    "Selected user is not an officer"
            );
        }

        return officer;
    }
}