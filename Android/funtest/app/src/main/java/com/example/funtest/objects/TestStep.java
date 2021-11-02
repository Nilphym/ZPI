package com.example.funtest.objects;

public class TestStep {

    private int id;
    private String name;
    private int stepNumber;
    private String testDataObject;
    private String controlPoint;

    public TestStep(int id, String name, int stepNumber, String testDataObject, String controlPoint) {
        this.id = id;
        this.name = name;
        this.stepNumber = stepNumber;
        this.testDataObject = testDataObject;
        this.controlPoint = controlPoint;
    }

    public TestStep() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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
}
