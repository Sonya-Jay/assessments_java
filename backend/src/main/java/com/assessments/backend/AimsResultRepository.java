package com.assessments.backend;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AimsResultRepository extends JpaRepository<AimsResult, Integer> {
    List<AimsResult> findByUserId(int userId);
}
