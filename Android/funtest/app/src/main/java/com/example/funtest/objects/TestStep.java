package com.example.funtest.objects;

import java.util.ArrayList;

public class TestStep {

    private String id;
    private String name;
    private int stepNumber;
    private ArrayList<String> testData;
    private String controlPoint;
    private ArrayList<Bug> stepErrors;

    public TestStep(String id, String name, int stepNumber, ArrayList<String> testData, String controlPoint, ArrayList<Bug> stepErrors) {
        this.id = id;
        this.name = name;
        this.stepNumber = stepNumber;
        this.testData = testData;
        this.controlPoint = controlPoint;
        this.stepErrors = stepErrors;
    }

    public TestStep() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStepNumber() {
        return stepNumber;
    }

    public void setStepNumber(int stepNumber) {
        this.stepNumber = stepNumber;
    }

    public ArrayList<String> getTestData() {
        return testData;
    }

    public void setTestData(ArrayList<String> testData) {
        this.testData = testData;
    }

    public String getControlPoint() {
        return controlPoint;
    }

    public void setControlPoint(String controlPoint) {
        this.controlPoint = controlPoint;
    }

    public ArrayList<Bug> getStepErrors() {
        return stepErrors;
    }

    public void setStepErrors(ArrayList<Bug> stepErrors) {
        this.stepErrors = stepErrors;
    }
}
