import {getJson, PREFIX} from "./common";

export async function get_notify(teamName) {
    const url = `${PREFIX}/tasks/notify`;
    let data;
    try {
        data = await getJson(url)
    } catch (e) {
        console.log(e);
        data = null;
    }
    return data;
}