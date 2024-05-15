import {getJson, PREFIX} from "./common";

export async function get_kanban_task () {
    const url = `${PREFIX}/tasks/kanban`;
    let kanban_tasks;
    try {
        kanban_tasks = await getJson(url);
    } catch (e) {
        console.log(e);
        kanban_tasks = {
            total: 0,
            items: []
        };
    }
    return kanban_tasks;
}