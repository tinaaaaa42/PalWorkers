package com.example.demo.serviceImpl;

import com.example.demo.DTO.*;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.service.TaskService;
import com.example.demo.util.SessionUtils;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskTagRepository taskTagRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private DailyTaskRepository dailyTaskRepository;

    @Autowired
    private WeeklyTaskRepository weeklyTaskRepository;

    @Autowired
    private KanbanTaskRepository kanbanTaskRepository;

    @Autowired
    private TeamTasksLeaderRepository teamTasksLeaderRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private TeamTasksAnticipaterRepository teamTasksAnticipaterRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean advanceTask(User user, int taskId) {
        KanbanTask kanbanTask = taskRepository.findKanbanTaskById(taskId);
        if (kanbanTask == null) {
            System.out.println("Task not found");
            return false;
        }
        User real_user = kanbanTask.getUser();
        if (real_user.getId() != user.getId()) {
            return false;
        }
        String state = kanbanTask.getState();
        String next_state = alterState(state);
        if (next_state.equals("totally completed")) {
            kanbanTask.setCompleted(true);
            kanbanTask.setCompletedDate(LocalDate.now());
        }
        kanbanTask.setState(next_state);
        kanbanTaskRepository.save(kanbanTask);
        return true;
    }

    @Override
    public boolean completeTask(User user, int taskId) {
        Task task = taskRepository.findTaskById(taskId);
        if (task == null) {
            System.out.println("Task not found");
            return false;
        }
        User real_user = task.getUser();
        if (real_user.getId() != user.getId()) {
            return false;
        }
        task.setCompleted(true);
        task.setCompletedDate(LocalDate.now());
        taskRepository.save(task);
        return true;
    }



    @Override
    public Task createTask(TaskDto taskDto) {
        Task task;
        int task_id = taskDto.getTask_id();
        String title = taskDto.getTitle();
        String description = taskDto.getDescription();
        String createDate = taskDto.getCreateDate();
        String dueDate = taskDto.getDueDate();
        String type = taskDto.getType();
        Boolean expired = taskDto.getExpired();

        if (title == null) {
            throw new IllegalArgumentException("Title cannot be null");
        }
        if (createDate == null) {
            throw new IllegalArgumentException("Create date cannot be null");
        }
        if (type == null) {
            throw new IllegalArgumentException("Type cannot be null");
        }
        if (expired == null) {
            expired = false;
        }

        switch (type.toLowerCase()) {
            case "daily":
                task = new DailyTask();
                break;
            case "weekly":
                task = new WeeklyTask();
                ((WeeklyTask) task).setImportant(((WeeklyTaskDto)taskDto).getImportant());
                ((WeeklyTask) task).setUrgent(((WeeklyTaskDto)taskDto).getUrgent());
                break;
            case "kanban":
                task = new KanbanTask();
                ((KanbanTask) task).setState(((KanbanTaskDto)taskDto).getState());
                break;
            default:
                throw new IllegalArgumentException("Invalid task type");
        }

        HttpSession session = SessionUtils.getSession();
        User user = (User) session.getAttribute("user");

        List<Team> teams = new ArrayList<>();
        for (Integer teamId : taskDto.getTeamIds()) {
            Team team = teamRepository.findTeamById(teamId);
            if (team == null) {
                throw new IllegalArgumentException("Team not found");
            }
            teams.add(team);
            task.setTeam(team);
        }

        if (taskDto.getTeamIds() != null && taskDto.getTeamIds().size() == 0) {
            task.setUser(user);
        }

        task.setId(task_id);
        task.setTitle(title);
        task.setDescription(description);
        task.setCreateDate(LocalDate.parse(createDate));
        task.setDueDate(LocalDate.parse(dueDate));
        task.setType(type);
        task.setExpired(expired);
        task.setCompleted(false);
        taskRepository.save(task);

        Set<TeamTasksLeader> teamTasksLeaders = new LinkedHashSet<>();
        for (Team team : teams) {
            TeamTasksLeader teamTasksLeader = new TeamTasksLeader();
            teamTasksLeader.setTask(task);
            teamTasksLeader.setLeader(user);
            teamTasksLeaderRepository.save(teamTasksLeader);
            teamTasksLeaders.add(teamTasksLeader);
        }
        task.setTeamTasksLeaders(teamTasksLeaders);

        Set<TeamTasksAnticipater> teamTasksAnticipaters = new LinkedHashSet<>();
        for (int userId: taskDto.getUserIds()) {
            User anticipater = userRepository.findUserById(userId);
            if (anticipater == null) {
                throw new IllegalArgumentException("User not found");
            }
            TeamTasksAnticipater teamTasksAnticipater = new TeamTasksAnticipater();
            teamTasksAnticipater.setTask(task);
            teamTasksAnticipater.setAnticipater(anticipater);
            teamTasksAnticipaterRepository.save(teamTasksAnticipater);
            teamTasksAnticipaters.add(teamTasksAnticipater);
        }
        task.setTeamTasksAnticipaters(teamTasksAnticipaters);

        Set<TaskTag> tags = new LinkedHashSet<>();
        if (taskDto.getTags() != null) {
            for (String tagName : taskDto.getTags()) {
                Tag tag = tagRepository.findByName(tagName);
                if (tag == null) {
                    tag = new Tag();
                    tag.setName(tagName);
                    tagRepository.save(tag);
                }
                TaskTag taskTag = new TaskTag();
                taskTag.setTag(tag);
                taskTag.setTask(task);
                tags.add(taskTag);
                taskTagRepository.save(taskTag);
            }
        }

        task.setTaskTags(tags);

        // double save to ensure taskTags are saved
        taskRepository.save(task);
        switch (type.toLowerCase()) {
            case "daily":
                assert task instanceof DailyTask;
                dailyTaskRepository.save((DailyTask) task);
                break;
            case "weekly":
                assert task instanceof WeeklyTask;
                weeklyTaskRepository.save((WeeklyTask) task);
                break;
            case "kanban":
                assert task instanceof KanbanTask;
                kanbanTaskRepository.save((KanbanTask) task);
                break;
        }
        return task;
    }

    @Override
    public Task updateTask(TaskDto taskDto) {
        Task task;
        int task_id = taskDto.getTask_id();
        String title = taskDto.getTitle();
        String description = taskDto.getDescription();
        String createDate = taskDto.getCreateDate();
        String dueDate = taskDto.getDueDate();
        String type = taskDto.getType();
        Boolean expired = taskDto.getExpired();

        if (title == null) {
            throw new IllegalArgumentException("Title cannot be null");
        }
        if (createDate == null) {
            throw new IllegalArgumentException("Create date cannot be null");
        }
        if (type == null) {
            throw new IllegalArgumentException("Type cannot be null");
        }
        if (expired == null) {
            expired = false;
        }

        switch (type.toLowerCase()) {
            case "daily":
                task = taskRepository.findTaskById(task_id);
                break;
            case "weekly":
                task = taskRepository.findTaskById(task_id);
                ((WeeklyTask) task).setImportant(((WeeklyTaskDto)taskDto).getImportant());
                ((WeeklyTask) task).setUrgent(((WeeklyTaskDto)taskDto).getUrgent());
                break;
            case "kanban":
                task = taskRepository.findTaskById(task_id);
                ((KanbanTask) task).setState(((KanbanTaskDto)taskDto).getState());
                break;
            default:
                throw new IllegalArgumentException("Invalid task type");
        }

        HttpSession session = SessionUtils.getSession();
        User user = (User) session.getAttribute("user");

        task.setUser(user);
        task.setId(task_id);
        task.setTitle(title);
        task.setDescription(description);
        task.setCreateDate(LocalDate.parse(createDate));
        task.setDueDate(LocalDate.parse(dueDate));
        task.setType(type);
        task.setExpired(expired);
        task.setCompleted(false);
        taskRepository.save(task);

        Set<TaskTag> tags = new LinkedHashSet<>();
        Set<TaskTag> oldTags = task.getTaskTags();
        for (String tagName : taskDto.getTags()) {
            Tag tag = tagRepository.findByName(tagName);
            if (tag == null) {
                tag = new Tag();
                tag.setName(tagName);
                tagRepository.save(tag);
            }
            TaskTag taskTag = new TaskTag();
            taskTag.setTag(tag);
            taskTag.setTask(task);
            tags.add(taskTag);
            taskTagRepository.save(taskTag);
        }
        Set<TaskTag> toRemove = new LinkedHashSet<>(oldTags);
        toRemove.removeAll(tags);
        taskTagRepository.deleteAll(toRemove);

        task.setTaskTags(tags);

        // double save as creating
        taskRepository.save(task);
        switch (type.toLowerCase()) {
            case "daily":
                assert task instanceof DailyTask;
                dailyTaskRepository.save((DailyTask) task);
                break;
            case "weekly":
                assert task instanceof WeeklyTask;
                weeklyTaskRepository.save((WeeklyTask) task);
                break;
            case "kanban":
                assert task instanceof KanbanTask;
                kanbanTaskRepository.save((KanbanTask) task);
                break;
        }
        return task;
    }

    @Override
    public boolean deleteTask(int taskId) {
        Task task = taskRepository.findTaskById(taskId);
        if (task == null) {
            return false;
        }

        taskRepository.deleteById(taskId);
        return true;
    }

    @Override
    public List<Task> createBatchDefaultKanbanTasks(int numTasks) {
        HttpSession session = SessionUtils.getSession();
        User user = (User) session.getAttribute("user");
        int userId = user.getId();

        List<Task> tasks = new ArrayList<>();
        for (int i = 0; i < numTasks; i++) {
            KanbanTask task = new KanbanTask();
            task.setUser(userRepository.findUserById(userId));
            task.setTitle("Task " + i);
            task.setDescription("Description " + i);
            task.setCreateDate(LocalDate.now());
            task.setDueDate(LocalDate.now().plusDays(7));
            task.setType("kanban");
            task.setState("todo");
            task.setExpired(false);
            task.setCompleted(false);
            taskRepository.save(task);
            kanbanTaskRepository.save(task);
            tasks.add(task);
        }
        return tasks;
    }

    @Override
    public List<WeekStatistics> getWeeklyStatistics(int userId){
        List<WeekStatistics> weeklyStatistics = new ArrayList<>();
        LocalDate today = LocalDate.now();
        for (int i = 6; i >= 0; --i) {
            LocalDate date = today.minusDays(i);
            List<Task> tasks = taskRepository.findByUserIdAndCreateDateEquals(userId,date);
            WeekStatistics weekStatistic = new WeekStatistics();
            weekStatistic.setDate(date.toString());
            weekStatistic.setType("Added");
            weekStatistic.setValue(tasks.size());
            weeklyStatistics.add(weekStatistic);
            WeekStatistics weekStatistic_completed = new WeekStatistics();
            weekStatistic_completed.setDate(date.toString());
            weekStatistic_completed.setType("Completed");
            Integer counter = 0;
            for (Task task : tasks) {
                if (task.getCompletedDate() == date) {
                    counter++;
                }
            }
            weekStatistic_completed.setValue(counter);
            weeklyStatistics.add(weekStatistic_completed);
        }
        return weeklyStatistics;
    }

    @Override
    public List<MonthStatistics> getMonthlyStatistics(int userId) {
        List<MonthStatistics> monthlyStatistics = new ArrayList<>();
        LocalDate today = LocalDate.now();
        LocalDate monty_ago = LocalDate.now().minusMonths(1);
        List<KanbanTask> kanbanTasks = taskRepository.findKanbanTaskByUserIdAndCreateDateBetween(userId,monty_ago,today);


        Map<String, Integer> statistics = new HashMap<>();
        statistics.put("todo",0);
        statistics.put("done",0);
        statistics.put("inprogress",0);
        statistics.put("review",0);
        for (KanbanTask kanbanTask : kanbanTasks) {
            String type = kanbanTask.getState();
            statistics.put(type,statistics.getOrDefault(type,0) + 1);
        }
        for (String type : statistics.keySet()) {
            MonthStatistics monthStatistic = new MonthStatistics();
            String set_type = null;
            if (type.equals("todo")) {
                set_type = "Todo";
            }
            else if (type.equals("done")) {
                set_type = "Completed";
            }
            else if (type.equals("inprogress")) {
                set_type = "In progress";
            }
            else if (type.equals("review")) {
                set_type = "Review";
            }
            monthStatistic.setType(set_type);
            monthStatistic.setValue(statistics.get(type));
            monthlyStatistics.add(monthStatistic);
        }
        return monthlyStatistics;
    }

    @Override
    public NotifyDto notifyUser(int userId) {
        List<NotifyItemDto> expired = new ArrayList<>();
        List<NotifyItemDto> urgent = new ArrayList<>();
        NotifyDto notifyDto = new NotifyDto();
        List<Task> allTasks = taskRepository.findByUserId(userId);
        for (Task task : allTasks) {
            LocalDate completedDate = task.getCompletedDate();
            LocalDate dueDate = task.getDueDate();
            if (dueDate == null) {
                continue;
            }
            if (completedDate == null && dueDate.isBefore(LocalDate.now())) {
                NotifyItemDto notifyItemDto = new NotifyItemDto();
                notifyItemDto.setId(task.getId());
                notifyItemDto.setDueDate(task.getDueDate().toString());
                notifyItemDto.setName(task.getTitle());
                expired.add(notifyItemDto);
            }
            else {
                if (completedDate == null && dueDate.isBefore(LocalDate.now().plusDays(7))) {
                    NotifyItemDto notifyItemDto = new NotifyItemDto();
                    notifyItemDto.setId(task.getId());
                    notifyItemDto.setDueDate(task.getDueDate().toString());
                    notifyItemDto.setName(task.getTitle());
                    urgent.add(notifyItemDto);
                }
            }
        }
        notifyDto.setExpired(expired);
        notifyDto.setUrgent(urgent);
        return notifyDto;
    }

    private String alterState(String state) {
        if (state.equals("todo")) {
            return "inprogress";
        }
        else if (state.equals("inprogress")) {
            return "review";
        }
        else if (state.equals("review")) {
            return "done";
        }
        return "totally completed";
    }
}

