package com.assessments.backend.aims;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "aims_results")
public class AimsResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int userId;
    private LocalDateTime dateTaken;
    private int totalScore;
    private int q1;
    private int q2;
    private int q3;
    private int q4;
    private int q5;
    private int q6;
    private int q7;
    private int q8;
    private int q9;
    private int q10;
    private int q11;
    private int q12;

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return this.id;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return this.userId;
    }

    public void setDateTaken(LocalDateTime date) {
        this.dateTaken = date;
    }

    public LocalDateTime getDateTaken() {
        return this.dateTaken;
    }

    public void setTotalScore(int score) {
        this.totalScore = score;
    }

    public int getTotalScore() {
        return this.totalScore;
    }

    public void setQ1(int value) {
        this.q1 = value;
    }

    public void setQ2(int value) {
        this.q2 = value;
    }


    public void setQ3(int value) {
        this.q3 = value;
    }


    public void setQ4(int value) {
        this.q4 = value;
    }

     public void setQ5(int value) {
        this.q5 = value;
    }

     public void setQ6(int value) {
        this.q6 = value;
    }

     public void setQ7(int value) {
        this.q7 = value;
    }

     public void setQ8(int value) {
        this.q8 = value;
    }

     public void setQ9(int value) {
        this.q9 = value;
    }

     public void setQ10(int value) {
        this.q10 = value;
    }

     public void setQ11(int value) {
        this.q11 = value;
     }

      public void setQ12(int value) {
        this.q12 = value;
    }

    public int[] getAllQuestions() {
        return new int[] {q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12};
    }
}
