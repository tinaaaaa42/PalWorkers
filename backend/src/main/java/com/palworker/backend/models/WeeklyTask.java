package com.palworker.backend.models;

import java.util.Date;
import java.util.List;

public class WeeklyTask extends Task {
    private boolean urgent;
    private boolean important;

    public WeeklyTask(long id, String title, List<String> tags, Date createDate, Date dueDate, boolean urgent, boolean important) {
        super(id, title, tags, createDate, dueDate);
        this.urgent = urgent;
        this.important = important;
    }

    public boolean isUrgent() {
        return urgent;
    }

    public void setUrgent(boolean urgent) {
        this.urgent = urgent;
    }

    public boolean isImportant() {
        return important;
    }

    public void setImportant(boolean important) {
        this.important = important;
    }
}