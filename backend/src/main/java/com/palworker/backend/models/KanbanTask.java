package com.palworker.backend.models;

import java.util.Date;
import java.util.List;

public class KanbanTask extends Task {
    private String state;

    public KanbanTask(long id, String title, List<String> tags, Date createDate, Date dueDate, String state) {
        super(id, title, tags, createDate, dueDate);
        this.state = state;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }
}