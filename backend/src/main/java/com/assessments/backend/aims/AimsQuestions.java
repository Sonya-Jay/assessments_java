package com.assessments.backend.aims;

import com.assessments.backend.AnswerOptions;

public class AimsQuestions {

    AnswerOptions[] fiveOptions = {
        new AnswerOptions(0, "None"),
        new AnswerOptions(1, "Minimal"),
        new AnswerOptions(2, "Mild"),
        new AnswerOptions(3, "Moderate"),
        new AnswerOptions(4, "Severe")
    };

     AnswerOptions[] twoOptions = {
        new AnswerOptions(0, "No"),
        new AnswerOptions(1, "Yes")
    };

    public AnswerOptions[] fiveChoices() {
        return fiveOptions;
    }
    public AnswerOptions[] twoChoices() {
        return twoOptions;
    }

    public String[] questions() {
        String[] questions = {
                "1. Muscles of facial expression, e.g., movements of forehead, eyebrows, periorbital area, cheeks. Include frowning, blinking, grimacing of upper face.",
                "2. Lips and perioral area, e.g., puckering, pouting, smacking.",
                "3. Jaw, e.g., biting, clenching, chewing, mouth opening, lateral movement.",
                "4. Tongue. Rate only increase in movement both in and out of mouth, not inability to sustain movement.",
                "5. Upper (arms, wrists, hands, fingers). Include movements that are choreic (rapid, objectively purposeless, irregular, spontaneous) or athetoid (slow, irregular, complex, serpentine). Do not include tremor (repetitive, regular, rhythmic movements).",
                "6. Lower (legs, knees, ankles, toes), e.g., lateral knee movement, foot tapping, heel dropping, foot squirming, inversion and eversion of foot.",
                "7. Neck, shoulders, hips, e.g., rocking, twisting, squirming, pelvic gyrations. Include diaphragmatic movements.",
                "8. Severity of abnormal movements. Based on the highest single score on the above items.",
                "9. Incapacitation due to abnormal movements.",
                "10. Patient's awareness of abnormal movements.",
                "11. Current problems with teeth and/or dentures?",
                "12. Does patient usually wear dentures?"
        };
        return questions;
    }
}
