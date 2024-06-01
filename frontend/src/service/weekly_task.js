import {getJson, PREFIX} from "./common";

export async function get_weekly_task () {
    const url = `${PREFIX}/tasks/weekly`;
    let weekly_tasks;
    try {
        weekly_tasks = await getJson(url);
    } catch (e) {
        console.log(e);
        weekly_tasks = {
            total: 0,
            items: []
        };
    }
    return weekly_tasks;
}

export async function getWeeklyTask (start,end) {
    const url = `${PREFIX}/tasks/weekly/start=${start}/end=${end}`;
    let weekly_tasks;
    try {
        weekly_tasks = await getJson(url);
    } catch (e) {
        console.log(e);
        weekly_tasks = {
            total: 0,
            items: []
        };
    }
    return weekly_tasks;
}