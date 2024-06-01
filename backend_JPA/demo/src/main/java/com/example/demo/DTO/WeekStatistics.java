package com.example.demo.DTO;


import lombok.Data;

import java.time.LocalDate;

@Data
public class WeekStatistics {
    String date;
    String type;
    Integer value;
}
