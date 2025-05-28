package com.assessments.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.assessments.backend.AimsQuestions;
import com.assessments.backend.UricaQuestions;
import com.assessments.backend.AimsProcedure;
import com.assessments.backend.AimsScorer;
import com.assessments.backend.UricaScorer;

@RestController
@RequestMapping("/assessments")
public class AssessmentController {
    
    @GetMapping("aims-procedure")
    public String[] getAimsProcedure() {
        AimsProcedure procedure = new AimsProcedure();
        return procedure.procedure();
    }
    
    @GetMapping("/aims-questions")
    public CreateAimsQuestion[] getAimsQuestions() {
        AimsQuestions aimsAllQuestions = new AimsQuestions();
        return aimsAllQuestions.questions();
    }

    @PostMapping("/aims-score")
    public String calculateAimsScore(@RequestBody int[] answers) {
        AimsScorer aimsScorer = new AimsScorer();
        return aimsScorer.calculateScore(answers);
    }
    
    @GetMapping("/urica-questions")
    public CreateUricaQuestion[] getUricaQuestions() {
        UricaQuestions uricaAllQuestions = new UricaQuestions();
        return uricaAllQuestions.questions();
    }

    @PostMapping("/urica-score")
    public String calculateUricaScore(@RequestBody int[] answers) {
        UricaScorer uricaScorer = new UricaScorer();
        return uricaScorer.calculateScore(answers);
    }
}
