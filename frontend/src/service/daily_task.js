import {getJson, PREFIX, del} from "./common";

export async function get_daily_task () {
    const url = `${PREFIX}/tasks/daily`;
    let daily_tasks;
    try {
        daily_tasks = await getJson(url);
    } catch (e) {
        console.log(e);
        daily_tasks = {
            total: 0,
            items: []
        };
    }
    return daily_tasks;
}

export async function getDailyTask (date) {
    const url = `${PREFIX}/tasks/daily/date=${date}`;
    let daily_tasks;
    try {
        daily_tasks = await getJson(url);
    } catch (e) {
        console.log(e);
        daily_tasks = {
            total: 0,
            items: []
        };
    }
    return daily_tasks;
}

export async function deleteDailyTaskWithDate (date) {
    const url = `${PREFIX}/tasks/daily/date=${date}`;
    try {
        await del(url);
    } catch (e) {
        console.log(e);
        // throw e;
    }
}
