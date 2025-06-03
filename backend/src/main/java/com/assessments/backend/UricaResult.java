package com.assessments.backend;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "urica_results")
public class UricaResult {
    
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
    private int q13;
    private int q14;
    private int q15;
    private int q16;
    private int q17;
    private int q18;
    private int q19;
    private int q20;
    private int q21;
    private int q22;
    private int q23;
    private int q24;
    private int q25;
    private int q26;
    private int q27;
    private int q28;
    private int q29;
    private int q30;
    private int q31;
    private int q32;

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

      public void setQ13(int value) {
        this.q13 = value;
     }

       public void setQ14(int value) {
        this.q14 = value;
     }

       public void setQ15(int value) {
        this.q15 = value;
     }

       public void setQ16(int value) {
        this.q16 = value;
     }

       public void setQ17(int value) {
        this.q17 = value;
     }

       public void setQ18(int value) {
        this.q18 = value;
     }

      public void setQ19(int value) {
        this.q19 = value;
     }

       public void setQ20(int value) {
        this.q20 = value;
     }

      public void setQ21(int value) {
        this.q21 = value;
     }

      public void setQ22(int value) {
        this.q22 = value;
     }

      public void setQ23(int value) {
        this.q23 = value;
     }

      public void setQ24(int value) {
        this.q24 = value;
     }

      public void setQ25(int value) {
        this.q25 = value;
     }

      public void setQ26(int value) {
        this.q26 = value;
     }

      public void setQ27(int value) {
        this.q27 = value;
     }

     public void setQ28(int value) {
        this.q28 = value;
     }

      public void setQ29(int value) {
        this.q29 = value;
     }

      public void setQ30(int value) {
        this.q30 = value;
     }

      public void setQ31(int value) {
        this.q31 = value;
     }

      public void setQ32(int value) {
        this.q32 = value;
     }

    public int[] getAllQuestions() {
        return new int[] {q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26, q27, q28, q29, q30, q31, q32};
    }

}