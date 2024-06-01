package com.example.demo.DTO;


import lombok.Data;

import java.util.List;

@Data
public class NotifyDto {
    List<NotifyItemDto> urgent;

    List<NotifyItemDto> expired;
}


