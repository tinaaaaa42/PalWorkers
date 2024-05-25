import {getJson, PREFIX} from "./common";

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