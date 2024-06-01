import {getJson, post, PREFIX} from "./common";

export async function get_week_statistics(teamName) {
    const url = `${PREFIX}/tasks/weekly_statistics`;
    let data;
    try {
        data = await getJson(url)
    } catch (e) {
        console.log(e);
        data = null;
    }
    return data;
}

export async function get_kanban_statistics(teamName) {
    const url = `${PREFIX}/tasks/kanban_statistics`;
    let data;
    try {
        data = await getJson(url)
    } catch (e) {
        console.log(e);
        data = null;
    }
    return data;
}