package com.assessments.backend;

public class CreateAimsQuestion {
    private int questionNumber;
    private String question;
    private AnswerOptions[] options;

    public CreateAimsQuestion(int questionNumber, String question, AnswerOptions[] options) {
        this.questionNumber = questionNumber;
        this.question = question;
        this.options = options;
    }
    public int getQuestionNumber() {
        return questionNumber;
    }
    public void setQuestionNumber(int questionNumber) {
        this.questionNumber = questionNumber;
    }
    public String getQuestion() {
        return question;
    }
    public void setQuestion(String question) {
        this.question = question;
    }
    public AnswerOptions[] getAnswerOptions() {
        return options;
    }
    public void setAnswerOptions(AnswerOptions[] options) {
        this.options = options;
    }
}