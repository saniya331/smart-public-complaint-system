package com.saniya.complaint.repository;

import com.saniya.complaint.entity.ComplaintEvidence;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintEvidenceRepository
        extends JpaRepository<ComplaintEvidence, Long> {

    List<ComplaintEvidence> findByComplaintId(Long complaintId);
}