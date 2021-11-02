package com.example.funtest.objects;

import java.util.ArrayList;

public class TestPlan {
    private int id;
    private String name;
    private ArrayList<TestSuite> testSuites;

    public TestPlan(int id, String name, ArrayList<TestSuite> testSuites) {
        this.id = id;
        this.name = name;
        this.testSuites = testSuites;
    }

    public TestPlan() {
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

    public ArrayList<TestSuite> getTestSuites() {
        return testSuites;
    }

    public void setTestSuites(ArrayList<TestSuite> testSuites) {
        this.testSuites = testSuites;
    }
}
