package com.assessments.backend.urica;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UricaResultRepository extends JpaRepository<UricaResult, Integer> {
    List<UricaResult> findByUserId(int userId);
}