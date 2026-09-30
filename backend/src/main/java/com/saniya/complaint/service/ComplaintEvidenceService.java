package com.saniya.complaint.service;

import com.saniya.complaint.entity.ComplaintEvidence;
import com.saniya.complaint.repository.ComplaintEvidenceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintEvidenceService {

    private final ComplaintEvidenceRepository evidenceRepository;

    public ComplaintEvidenceService(
            ComplaintEvidenceRepository evidenceRepository) {

        this.evidenceRepository = evidenceRepository;
    }

    public ComplaintEvidence saveEvidence(
            ComplaintEvidence evidence) {

        return evidenceRepository.save(evidence);
    }

    public List<ComplaintEvidence> getEvidenceByComplaintId(
            Long complaintId) {

        return evidenceRepository
                .findByComplaintId(complaintId);
    }

    public void deleteEvidence(Long id) {

        if (!evidenceRepository.existsById(id)) {
            throw new RuntimeException(
                    "Evidence not found"
            );
        }

        evidenceRepository.deleteById(id);
    }
}