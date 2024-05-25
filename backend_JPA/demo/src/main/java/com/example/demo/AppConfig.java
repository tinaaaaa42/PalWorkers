package com.example.demo;
import com.example.demo.observerImpl.DailyScheduler;
import com.example.demo.observerImpl.TaskExpireChecker;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Autowired
    private DailyScheduler dailyScheduler;

    @Autowired
    private TaskExpireChecker taskExpiryChecker;

    @PostConstruct
    public void setup() {
        dailyScheduler.registerObserver(taskExpiryChecker);
    }
}
