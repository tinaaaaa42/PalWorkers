package com.palworker.backend.models;

import java.util.Date;
import java.util.List;

public abstract class Task {
    private long id;
    private String title;
    private List<String> tags;
    private Date createDate;
    private Date dueDate;

    public Task(long id, String title, List<String> tags, Date createDate, Date dueDate) {
        this.id = id;
        this.title = title;
        this.tags = tags;
        this.createDate = createDate;
        this.dueDate = dueDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }
}

