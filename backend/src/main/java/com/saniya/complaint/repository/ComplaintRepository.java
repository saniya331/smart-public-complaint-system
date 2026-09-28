package com.saniya.complaint.repository;

import com.saniya.complaint.entity.Complaint;
import com.saniya.complaint.entity.ComplaintStatus;
import com.saniya.complaint.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ComplaintRepository
        extends JpaRepository<Complaint, Long> {

    Optional<Complaint> findByComplaintNumber(
            String complaintNumber
    );

    List<Complaint> findByCitizen(User citizen);

    List<Complaint> findByAssignedOfficer(User assignedOfficer);

    List<Complaint> findByStatus(ComplaintStatus status);

    List<Complaint> findByDistrict(String district);

    List<Complaint> findByMandal(String mandal);

    boolean existsByComplaintNumber(String complaintNumber);
}