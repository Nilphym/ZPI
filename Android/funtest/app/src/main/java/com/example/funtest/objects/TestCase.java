package com.example.funtest.objects;

public class TestCase {

    private int id;
    private String code;
    private String preconditions;
    private String entryData;

    public TestCase(int id, String code, String preconditions, String entryData) {
        this.id = id;
        this.code = code;
        this.preconditions = preconditions;
        this.entryData = entryData;
    }

    public TestCase() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getPreconditions() {
        return preconditions;
    }

    public void setPreconditions(String preconditions) {
        this.preconditions = preconditions;
    }

    public String getEntryData() {
        return entryData;
    }

    public void setEntryData(String entryData) {
        this.entryData = entryData;
    }
}
