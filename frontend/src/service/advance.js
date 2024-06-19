import {PREFIX, put, del} from "./common";

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

export async function advanceProject(projectId) {
    const url = `${PREFIX}/tasks/alterProjectState?projectId=${projectId}`;//地址
    try {
        const response = await put(url);
        return response;
    } catch (error) {
        console.error('推进项目失败', error);
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

export async function deleteTask(taskId) {
    const url = `${PREFIX}/tasks/${taskId}`;//地址
    try {
        const response = await del(url);
        return response;
    } catch (error) {
        console.error('删除任务失败', error);
        throw error;
        return false;
    }
}
