package com.example.funtest.objects;

import java.util.ArrayList;

public class TestProcedure {

    private String id;
    private String result;
    private String code;
    private ArrayList<TestStep> stepIds;

    public TestProcedure(String id, String result, String code, ArrayList<TestStep> stepIds) {
        this.id = id;
        this.result = result;
        this.code = code;
        this.stepIds = stepIds;
    }

    public TestProcedure() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public ArrayList<TestStep> getStepIds() {
        return stepIds;
    }

    public void setStepIds(ArrayList<TestStep> stepIds) {
        this.stepIds = stepIds;
    }
}
