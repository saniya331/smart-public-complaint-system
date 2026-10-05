package com.saniya.complaint.service;

import com.saniya.complaint.entity.Complaint;
import com.saniya.complaint.entity.ComplaintPriority;
import com.saniya.complaint.entity.ComplaintStatus;
import com.saniya.complaint.entity.User;
import com.saniya.complaint.repository.ComplaintRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final GeminiAIService geminiAIService;

    public ComplaintService(
            ComplaintRepository complaintRepository,
            GeminiAIService geminiAIService) {

        this.complaintRepository = complaintRepository;
        this.geminiAIService = geminiAIService;
    }

    public Complaint createComplaint(Complaint complaint) {

        /*
         * Generate complaint number if one was not provided.
         */
        if (complaint.getComplaintNumber() == null
                || complaint.getComplaintNumber().isBlank()) {

            complaint.setComplaintNumber(
                    generateComplaintNumber()
            );
        }

        /*
         * New complaints start as SUBMITTED.
         */
        if (complaint.getStatus() == null) {
            complaint.setStatus(
                    ComplaintStatus.SUBMITTED
            );
        }

        /*
         * AI classification
         *
         * Gemini analyzes the title and description
         * and returns category + priority.
         */
        try {

            var aiResult =
                    geminiAIService.classifyComplaint(
                            complaint.getTitle(),
                            complaint.getDescription(),
                            complaint.getCategory()
                    );

            if (aiResult != null) {

                if (aiResult.getCategory() != null
                        && !aiResult.getCategory().isBlank()) {

                    complaint.setCategory(
                            aiResult.getCategory()
                    );
                }

                if (aiResult.getPriority() != null
                        && !aiResult.getPriority().isBlank()) {

                    try {

                        complaint.setPriority(
                                ComplaintPriority.valueOf(
                                        aiResult
                                                .getPriority()
                                                .toUpperCase()
                                )
                        );

                    } catch (IllegalArgumentException e) {

                        complaint.setPriority(
                                ComplaintPriority.MEDIUM
                        );
                    }
                }
            }

        } catch (Exception e) {

            /*
             * Never stop complaint submission just because
             * the AI service is unavailable.
             */
            System.err.println(
                    "AI classification unavailable: "
                            + e.getMessage()
            );

            if (complaint.getPriority() == null) {

                complaint.setPriority(
                        ComplaintPriority.MEDIUM
                );
            }
        }

        /*
         * Final safety fallback.
         */
        if (complaint.getPriority() == null) {

            complaint.setPriority(
                    ComplaintPriority.MEDIUM
            );
        }

        return complaintRepository.save(complaint);
    }

    public List<Complaint> getAllComplaints() {

        return complaintRepository.findAll();
    }

    public Optional<Complaint> getComplaintById(
            Long id) {

        return complaintRepository.findById(id);
    }

    public Optional<Complaint> getComplaintByNumber(
            String complaintNumber) {

        return complaintRepository
                .findByComplaintNumber(
                        complaintNumber
                );
    }

    public List<Complaint> getComplaintsByCitizen(
            User citizen) {

        return complaintRepository.findByCitizen(
                citizen
        );
    }

    public List<Complaint> getComplaintsByOfficer(
            User officer) {

        return complaintRepository
                .findByAssignedOfficer(
                        officer
                );
    }

    public Complaint assignComplaint(
            Long complaintId,
            User officer) {

        Complaint complaint =
                complaintRepository
                        .findById(complaintId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Complaint not found"
                                )
                        );

        complaint.setAssignedOfficer(
                officer
        );

        complaint.setStatus(
                ComplaintStatus.ASSIGNED
        );

        return complaintRepository.save(
                complaint
        );
    }

    public Complaint updateStatus(
            Long complaintId,
            ComplaintStatus status) {

        Complaint complaint =
                complaintRepository
                        .findById(complaintId)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Complaint not found"
                                )
                        );

        complaint.setStatus(status);

        return complaintRepository.save(
                complaint
        );
    }

    public Complaint updateComplaint(
            Complaint complaint) {

        return complaintRepository.save(
                complaint
        );
    }

    private String generateComplaintNumber() {

        return "GRV-" + System.currentTimeMillis();
    }
}