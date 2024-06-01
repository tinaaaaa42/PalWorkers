import { post, PREFIX } from "./common";

export async function createDailyTask(newTaskData) {
    console.log(newTaskData)
    const url = `${PREFIX}/tasks/daily`;//地址
    try {
        const response = await post(url, newTaskData);
        console.log('任务创建成功:', response);
        return response;
    } catch (error) {
        console.error('创建任务失败:', error);
        throw error;
    }
}src/service/daily_write.js
