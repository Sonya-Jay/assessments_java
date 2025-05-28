package com.assessments.backend;

public class CreateUricaQuestion {
    private int questionNumber;
    private String question;
    private AnswerOptions[] options;
    private String stage;

    public CreateUricaQuestion(int questionNumber, String question, AnswerOptions[] options, String stage) {
        this.questionNumber = questionNumber;
        this.question = question;
        this.options = options;
        this.stage = stage;
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
    public String getStage() {
        return stage;
    }
    public void setStage(String stage) {
        this.stage = stage;
    }
}
