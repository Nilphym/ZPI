package com.example.funtest.objects;

import java.util.ArrayList;

public class TestSuite {

    private String id;
    private String category;
    private ArrayList<Test> tests;

    public TestSuite(String id, String category, ArrayList<Test> tests) {
        this.id = id;
        this.category = category;
        this.tests = tests;
    }

    public TestSuite() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public ArrayList<Test> getTests() {
        return tests;
    }

    public void setTests(ArrayList<Test> tests) {
        this.tests = tests;
    }
}
