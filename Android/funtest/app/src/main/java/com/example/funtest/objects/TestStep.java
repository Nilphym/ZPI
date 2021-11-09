package com.example.funtest.objects;

import java.util.ArrayList;

public class TestStep {

    private String id;
    private String name;
    private int stepNumber;
    private String testDataObject;
    private String controlPoint;
    private ArrayList<String> stepErrors;

    public TestStep(String id, String name, int stepNumber, String testDataObject, String controlPoint, ArrayList<String> stepErrors) {
        this.id = id;
        this.name = name;
        this.stepNumber = stepNumber;
        this.testDataObject = testDataObject;
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

    public String getTestDataObject() {
        return testDataObject;
    }

    public void setTestDataObject(String testDataObject) {
        this.testDataObject = testDataObject;
    }

    public String getControlPoint() {
        return controlPoint;
    }

    public void setControlPoint(String controlPoint) {
        this.controlPoint = controlPoint;
    }

    public ArrayList<String> getStepErrors() {
        return stepErrors;
    }

    public void setStepErrors(ArrayList<String> stepErrors) {
        this.stepErrors = stepErrors;
    }
}
