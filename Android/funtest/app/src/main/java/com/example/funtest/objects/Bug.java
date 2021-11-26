package com.example.funtest.objects;

import java.util.ArrayList;

public class Bug {
    private String id;
    private String code;
    private String name;
    private String state; //not added while creating
    private String functionality;
    private String type;
    private String impact;
    private String priority;
    private int retestsRequired;
    private int retestsDone;
    private int retestsFailed;
    private String deadline;
    private String reportDate;
    private String endDate;
    private String description;
    private ArrayList<String> attachments;

    public Bug(){

    }

    public Bug(String id, String code, String name, String state, String functionality, String type, String impact, String priority, int retestsRequired, int retestsDone, int retestsFailed, String deadline, String reportDate, String endDate, String description, ArrayList<String> attachments) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.state = state;
        this.functionality = functionality;
        this.type = type;
        this.impact = impact;
        this.priority = priority;
        this.retestsRequired = retestsRequired;
        this.retestsDone = retestsDone;
        this.retestsFailed = retestsFailed;
        this.deadline = deadline;
        this.reportDate = reportDate;
        this.endDate = endDate;
        this.description = description;
        this.attachments = attachments;
    }

    public Bug(String code, String name, String state, String functionality, String type, String impact, String priority, int retestsRequired, int retestsDone, int retestsFailed, String deadline, String reportDate, String endDate, String description, ArrayList<String> attachments) {
        this.code = code;
        this.name = name;
        this.state = state;
        this.functionality = functionality;
        this.type = type;
        this.impact = impact;
        this.priority = priority;
        this.retestsRequired = retestsRequired;
        this.retestsDone = retestsDone;
        this.retestsFailed = retestsFailed;
        this.deadline = deadline;
        this.reportDate = reportDate;
        this.endDate = endDate;
        this.description = description;
        this.attachments = attachments;
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

    public int getRetestsRequired() {
        return retestsRequired;
    }

    public void setRetestsRequired(int retestsRequired) {
        this.retestsRequired = retestsRequired;
    }

    public int getRetestsDone() {
        return retestsDone;
    }

    public void setRetestsDone(int retestsDone) {
        this.retestsDone = retestsDone;
    }

    public int getRetestsFailed() {
        return retestsFailed;
    }

    public void setRetestsFailed(int retestsFailed) {
        this.retestsFailed = retestsFailed;
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

    public ArrayList<String> getAttachments() {
        return attachments;
    }

    public void setAttachments(ArrayList<String> attachments) {
        this.attachments = attachments;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
