package com.assessments.backend;

public class UricaScorer {
    public String calculateScore(int[] answers) {
        if (answers.length != 32) {
            throw new IllegalArgumentException("Incorrect number of answers. Expected 32.");
        }

        for (int i = 0; i < answers.length; i++) {
            if (answers[i] < 0 || answers[i] > 4) {
                throw new IllegalArgumentException("Answers must be scored between 0 and 4.");
            }
        }

        int precontemplationScore = answers[0] + answers[4] + answers[10] + answers[12] + answers[22] + answers[25] + answers[28];
        int contemplationScore = answers[1] + answers[7] + answers[11] + answers[14]  + answers[18] + answers[20]  + answers[23];
        int actionScore = answers[2] + answers[6] + answers[9] + answers[13] + answers[16] + answers[24] + answers[29];
        int maintenanceScore = answers[5] + answers[15] + answers[17] + answers[21] + answers[26] + answers[27] + answers[31];

        double meanPrecontemplation = (precontemplationScore + 7) / 7;
        double meanContemplation = (contemplationScore + 7) / 7;
        double meanAction = (actionScore + 7) / 7;
        double meanMaintenance = (maintenanceScore + 7) / 7;

        double readinessScore = meanContemplation + meanAction + meanMaintenance - meanPrecontemplation;

        String stage = "";

        if (readinessScore <= 8) {
            stage = "Precontemplation";
        } else if (readinessScore < 11) {
            stage = "Contemplation";
        } else if (readinessScore < 14) {
            stage = "Preparation (Action)";
        } else if (readinessScore >= 14) {
            stage = "Maintenance";
        }

        return String.format("Readiness Score: %.2f Stage: %-10s", readinessScore, stage);
    }
}