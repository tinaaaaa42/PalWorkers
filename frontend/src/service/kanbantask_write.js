import { post, PREFIX } from "./common";

export async function createKanbanTask(newTaskData) {
    console.log(newTaskData)
    const url = `${PREFIX}/tasks/kanban`;//地址
    try {
        const response = await post(url, newTaskData);
        console.log('任务创建成功:', response);
        return response;
    } catch (error) {
        console.error('创建任务失败:', error);
        throw error;
    }
}

export async function createBatchKanbanTask(numTask) {
  const url = `${PREFIX}/tasks/kanban/${numTask}`;//地址
  try {
      const response = await post(url);
      console.log('任务创建成功:', response);
      return response;
  } catch (error) {
      console.error('创建任务失败:', error);
      throw error;
  }
}
