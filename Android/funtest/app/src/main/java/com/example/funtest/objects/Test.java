package com.example.funtest.objects;

public class Test {

    private String id;
    private String creationDate;
    private String name;
    private TestProcedure testProcedure;
    private  TestCase testCase;

    public Test(String id, String creationDate, String name, TestProcedure testProcedure, TestCase testCase) {
        this.id = id;
        this.creationDate = creationDate;
        this.name = name;
        this.testProcedure = testProcedure;
        this.testCase = testCase;
    }

    public Test() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TestProcedure getTestProcedure() {
        return testProcedure;
    }

    public void setTestProcedure(TestProcedure testProcedure) {
        this.testProcedure = testProcedure;
    }

    public TestCase getTestCase() {
        return testCase;
    }

    public void setTestCase(TestCase testCase) {
        this.testCase = testCase;
    }
}
