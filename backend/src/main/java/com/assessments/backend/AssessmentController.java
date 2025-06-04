package com.assessments.backend;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.assessments.backend.aims.AimsProcedure;
import com.assessments.backend.aims.AimsQuestions;
import com.assessments.backend.aims.AimsResult;
import com.assessments.backend.aims.AimsResultRepository;
import com.assessments.backend.aims.AimsScorer;
import com.assessments.backend.urica.UricaQuestions;
import com.assessments.backend.urica.UricaResult;
import com.assessments.backend.urica.UricaResultRepository;
import com.assessments.backend.urica.UricaScorer;

@RestController
@RequestMapping("/assessments")
public class AssessmentController {

    @GetMapping("/aims-procedure")
    public String[] getAimsProcedure() {
        AimsProcedure procedure = new AimsProcedure();
        return procedure.procedure();
    }

    @GetMapping("/aims-questions")
    public String[] getAimsQuestions() {
        AimsQuestions aimsAllQuestions = new AimsQuestions();
        return aimsAllQuestions.questions();
    }

    @GetMapping("/aims-five-choices")
    public AnswerOptions[] getAimsFiveChoices() {
        AimsQuestions aimsFiveChoices = new AimsQuestions();
        return aimsFiveChoices.fiveChoices();
    }

    @GetMapping("/aims-two-choices")
    public AnswerOptions[] getAimsTwoChoices() {
        AimsQuestions aimsTwoChoices = new AimsQuestions();
        return aimsTwoChoices.twoChoices();
    }

    @PostMapping("/aims-score")
    public String calculateAimsScore(@RequestBody int[] answers) {
        AimsScorer aimsScorer = new AimsScorer();
        return aimsScorer.calculateScore(answers);
    }

    @GetMapping("/urica-questions")
    public String[] getUricaQuestions() {
        UricaQuestions uricaAllQuestions = new UricaQuestions();
        return uricaAllQuestions.questions();
    }

    @GetMapping("/urica-choices")
    public AnswerOptions[] getUricaChoices() {
        UricaQuestions uricaChoices = new UricaQuestions();
        return uricaChoices.choices();
    }

    @PostMapping("/urica-score")
    public String calculateUricaScore(@RequestBody int[] answers) {
        UricaScorer uricaScorer = new UricaScorer();
        return uricaScorer.calculateScore(answers);
    }

    @Autowired
    private AimsResultRepository aimsRepo;

    @Autowired
    private UricaResultRepository uricaRepo;

    @PostMapping("/aims-results")
    public AimsResult saveResult(@RequestBody AimsResult result) {
        return aimsRepo.save(result);
    }

    @GetMapping("/aims-results/{userId}")
    public List<AimsResult> getAimsResultsByUser(@PathVariable int userId) {
        return aimsRepo.findByUserId(userId);
    }

    @PostMapping("/urica-results")
    public UricaResult saveResult(@RequestBody UricaResult result) {
        return uricaRepo.save(result);
    }

    @GetMapping("/urica-results/{userId}")
    public List<UricaResult> getUricaResultsByUser(@PathVariable int userId) {
        return uricaRepo.findByUserId(userId);
    }

}
