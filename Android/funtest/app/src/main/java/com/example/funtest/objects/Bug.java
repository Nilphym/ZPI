package com.example.funtest.objects;

public class Bug {
    private String code;
    private String name;
    private String state;
    private String functionality;
    private String type;
    private String impact;
    private String priority;
    private String execs;
    private String deadline;
    private String reportDate;
    private String endDate;
    private String description;

    public Bug(String code, String name, String state, String functionality, String type, String impact, String priority, String execs, String deadline, String reportDate, String endDate, String description) {
        this.code = code;
        this.name = name;
        this.state = state;
        this.functionality = functionality;
        this.type = type;
        this.impact = impact;
        this.priority = priority;
        this.execs = execs;
        this.deadline = deadline;
        this.reportDate = reportDate;
        this.endDate = endDate;
        this.description = description;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getFunctionality() {
        return functionality;
    }

    public void setFunctionality(String functionality) {
        this.functionality = functionality;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getImpact() {
        return impact;
    }

    public void setImpact(String impact) {
        this.impact = impact;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getExecs() {
        return execs;
    }

    public void setExecs(String execs) {
        this.execs = execs;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public String getReportDate() {
        return reportDate;
    }

    public void setReportDate(String reportDate) {
        this.reportDate = reportDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
