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

    public ComplaintService(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    public Complaint createComplaint(Complaint complaint) {

        if (complaint.getComplaintNumber() == null
                || complaint.getComplaintNumber().isBlank()) {

            complaint.setComplaintNumber(
                    generateComplaintNumber()
            );
        }

        if (complaint.getStatus() == null) {
            complaint.setStatus(ComplaintStatus.SUBMITTED);
        }

        if (complaint.getPriority() == null) {
            complaint.setPriority(ComplaintPriority.MEDIUM);
        }

        return complaintRepository.save(complaint);
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    public Optional<Complaint> getComplaintById(Long id) {
        return complaintRepository.findById(id);
    }

    public Optional<Complaint> getComplaintByNumber(
            String complaintNumber) {

        return complaintRepository
                .findByComplaintNumber(complaintNumber);
    }

    public List<Complaint> getComplaintsByCitizen(User citizen) {
        return complaintRepository.findByCitizen(citizen);
    }

    public List<Complaint> getComplaintsByOfficer(
            User officer) {

        return complaintRepository
                .findByAssignedOfficer(officer);
    }

    public Complaint updateComplaint(
            Complaint complaint) {

        return complaintRepository.save(complaint);
    }

    private String generateComplaintNumber() {

        long timestamp = System.currentTimeMillis();

        return "GRV-" + timestamp;
    }
}