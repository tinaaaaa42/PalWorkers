import {PREFIX, put} from "./common";

export async function advanceKanbanTask(taskId) {
    const url = `${PREFIX}/tasks/alterKanbanState?taskId=${taskId}`;//地址
    try {
        const response = await put(url);
        return response;
    } catch (error) {
        console.error('推进任务失败', error);
        throw error;
        return false;
    }
}

export async function completeTask(taskId) {
    const url = `${PREFIX}/tasks/complete?taskId=${taskId}`;//地址
    try {
        const response = await put(url);
        return response;
    } catch (error) {
        console.error('完成任务失败', error);
        throw error;
        return false;
    }
}