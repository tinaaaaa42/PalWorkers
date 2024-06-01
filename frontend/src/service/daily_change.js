import { put, PREFIX } from "./common";

export async function changeDailyTask(newTaskData) {
    console.log(newTaskData)
    const url = `${PREFIX}/tasks/daily`;//地址
    try {
        const response = await put(url, newTaskData);
        console.log('任务创建成功:', response);
        return response;
    } catch (error) {
        console.error('创建任务失败:', error);
        throw error;
    }
}