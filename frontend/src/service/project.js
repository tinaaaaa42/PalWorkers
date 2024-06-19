import {getJson, PREFIX} from "./common";


export async function get_all_projects() {
    const url = `${PREFIX}/tasks/all_project`;
    let projects;
    try {
        projects = await getJson(url)
    } catch (e) {
        console.log(e);
        projects = null;
    }
    return projects;
}