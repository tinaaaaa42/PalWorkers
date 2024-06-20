package com.example.demo.serviceImpl;

import com.example.demo.DTO.KanbanTaskDto;
import com.example.demo.DTO.TaskDto;
import com.example.demo.DTO.WeeklyTaskDto;
import com.example.demo.entity.DailyTask;
import com.example.demo.entity.KanbanTask;
import com.example.demo.entity.Task;
import com.example.demo.entity.WeeklyTask;
import com.example.demo.repository.*;
import com.example.demo.service.TaskService;
import com.example.demo.serviceImpl.TaskServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TaskServiceImplTest {

    @Mock
    private TaskRepository taskRepository;
    @Mock
    private TaskTagRepository taskTagRepository;
    @Mock
    private TagRepository tagRepository;
    @Mock
    private DailyTaskRepository dailyTaskRepository;
    @Mock
    private WeeklyTaskRepository weeklyTaskRepository;
    @Mock
    private KanbanTaskRepository kanbanTaskRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

    @Test
    public void testCreateDailyTask() {
        // Setup
        TaskDto taskDto = new TaskDto();
        taskDto.setTitle("Test Task");
        taskDto.setType("daily");
        taskDto.setTags(Collections.singletonList("Productivity"));
        taskDto.setCreateDate("2021-06-01");
        taskDto.setDueDate("2021-06-02");
        taskDto.setExpired(false);

        DailyTask expectedTask = new DailyTask();
        when(dailyTaskRepository.save(any(DailyTask.class))).thenReturn(expectedTask);

        // Act
        Task result = taskService.createTask(taskDto);

        // Assert
        assertNotNull(result);
        verify(taskRepository).save(any(Task.class));
        verify(dailyTaskRepository).save(any(DailyTask.class));
        verify(tagRepository, atLeastOnce()).findByName(anyString());
    }

    @Test
    public void testCreateWeeklyTask() {
        // Setup
        WeeklyTaskDto taskDto = new WeeklyTaskDto();
        taskDto.setTitle("Test Task");
        taskDto.setType("weekly");
        taskDto.setTags(Collections.singletonList("Urgent"));
        taskDto.setImportant(true);
        taskDto.setUrgent(true);
        taskDto.setCreateDate("2021-06-01");
        taskDto.setDueDate("2021-06-02");
        taskDto.setExpired(false);

        WeeklyTask expectedTask = new WeeklyTask();
        when(weeklyTaskRepository.save(any(WeeklyTask.class))).thenReturn(expectedTask);

        // Act
        Task result = taskService.createTask(taskDto);

        // Assert
        assertNotNull(result);
        assertTrue(((WeeklyTask)result).getImportant());
        assertTrue(((WeeklyTask)result).getUrgent());
        verify(taskRepository).save(any(Task.class));
        verify(weeklyTaskRepository).save(any(WeeklyTask.class));

        verify(tagRepository, atLeastOnce()).findByName(anyString());
    }

    @Test
    public void testCreateKanbanTask() {
        // Setup
        KanbanTaskDto taskDto = new KanbanTaskDto();
        taskDto.setTitle("Test Task");
        taskDto.setType("kanban");
        taskDto.setTags(Collections.singletonList("InProgress"));
        taskDto.setState("Open");
        taskDto.setCreateDate("2021-06-01");
        taskDto.setDueDate("2021-06-02");
        taskDto.setExpired(false);

        KanbanTask expectedTask = new KanbanTask();
        when(kanbanTaskRepository.save(any(KanbanTask.class))).thenReturn(expectedTask);

        // Act
        Task result = taskService.createTask(taskDto);

        // Assert
        assertNotNull(result);
        assertEquals("Open", ((KanbanTask)result).getState());
        verify(taskRepository).save(any(Task.class));
        verify(kanbanTaskRepository).save(any(KanbanTask.class));
        verify(tagRepository, atLeastOnce()).findByName(anyString());
    }

    @Test
    public void testCreateInvalidTask() {
        // Setup
        TaskDto taskDto = new TaskDto();
        taskDto.setTitle("Test Task");
        taskDto.setType("invalid");
        taskDto.setTags(Collections.singletonList("Productivity"));
        taskDto.setCreateDate("2021-06-01");
        taskDto.setDueDate("2021-06-02");
        taskDto.setExpired(false);

        // Act
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            taskService.createTask(taskDto);
        });

        // Assert
        assertEquals("Invalid task type", exception.getMessage());

    }

    @Test
    public void testCreateTaskWithNullTitle() {
        // Setup
        TaskDto taskDto = new TaskDto();
        taskDto.setType("daily");
        taskDto.setTags(Collections.singletonList("Productivity"));
        taskDto.setCreateDate("2021-06-01");
        taskDto.setDueDate("2021-06-02");
        taskDto.setExpired(false);

        // Act
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            taskService.createTask(taskDto);
        });

        // Assert
        assertEquals("Title cannot be null", exception.getMessage());
    }

    @Test
    public void testCreateTaskWithNullCreateDate() {
        // Setup
        TaskDto taskDto = new TaskDto();
        taskDto.setTitle("Test Task");
        taskDto.setType("daily");
        taskDto.setTags(Collections.singletonList("Productivity"));
        taskDto.setDueDate("2021-06-02");
        taskDto.setExpired(false);

        // Act
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            taskService.createTask(taskDto);
        });

        // Assert
        assertEquals("Create date cannot be null", exception.getMessage());
    }

    @Test
    public void testCreateTaskWithNullType() {
        // Setup
        TaskDto taskDto = new TaskDto();
        taskDto.setTitle("Test Task");
        taskDto.setTags(Collections.singletonList("Productivity"));
        taskDto.setCreateDate("2021-06-01");
        taskDto.setDueDate("2021-06-02");
        taskDto.setExpired(false);

        // Act
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            taskService.createTask(taskDto);
        });

        // Assert
        assertEquals("Type cannot be null", exception.getMessage());
    }

//    @Test
//    public void testCreateTaskWithNullExpired() {
//        // Setup
//        TaskDto taskDto = new TaskDto();
//        taskDto.setTitle("Test Task");
//        taskDto.setType("daily");
//        taskDto.setTags(Collections.singletonList("Productivity"));
//        taskDto.setCreateDate("2021-06-01");
//        taskDto.setDueDate("2021-06-02");
//
//        // Act
//        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
//            taskService.createTask(taskDto);
//        });
//
//        // Assert
//        assertEquals("Expired cannot be null", exception.getMessage());
//    }
}
