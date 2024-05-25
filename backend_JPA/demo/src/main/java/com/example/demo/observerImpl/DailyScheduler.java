package com.example.demo.observerImpl;

import com.example.demo.observer.Observer;
import com.example.demo.observer.Subject;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DailyScheduler implements Subject {
    private List<Observer> observers;
    private String message;

    public DailyScheduler() {
        this.observers = new ArrayList<>();
    }

    @Override
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update();
        }
    }

    public void setMessage(String message) {
        this.message = message;
        notifyObservers();
    }

    @Scheduled(cron = "0 * 16 * * ?")
    public void dailyCheck() {
        System.out.println("Daily check started");
        notifyObservers();
        setMessage("Daily check completed");
    }
}
