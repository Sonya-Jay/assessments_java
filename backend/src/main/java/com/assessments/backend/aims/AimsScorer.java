package com.assessments.backend.aims;

public class AimsScorer {
       public String calculateScore(int[] answers) {
       
        if (answers.length != 12) {
            throw new IllegalArgumentException("Incorrect number of answers. Expected 12.");
        }
        
        for (int i = 0; i < answers.length; i++) {
            if (i < 10) {
                if (answers[i] < 0 || answers[i] > 4) {
                    throw new IllegalArgumentException("Questions 1-10 must be scored between 0 and 4.");
                }
            } else {
                if (answers[i] < 0 || answers[i] > 1) {
                    throw new IllegalArgumentException("Questions 11-12 must be scored either 0 or 1.");
                }
            }
        }

        int totalScore = 0;
        boolean potentialTD = false;

        for (int i = 0; i < 7; i++) {
            totalScore += answers[i];
            if (answers[i] >= 2) potentialTD = true; 
        }
        
        String result;
        if (totalScore == 0) {
            result = "No dyskinesia";
        } else if (potentialTD) {
            result = "Possible TD";
        } else if (totalScore < 7) {
            result = "Unlikely dyskinetic, possibly transient";
        } else if (totalScore < 14) {
            result = "Moderate, likely TD";
        } else {
            result = "Severe, definite TD";
        }
        
        return String.format("Score: %d Result: %-10s", totalScore, result);
    }
}
