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

export async function get_project(projectId) {
    const url = `${PREFIX}/tasks/project?projectId=${projectId}`;
    let project;
    try {
        project = await getJson(url)
    } catch (e) {
        console.log(e);
        project = null;
    }
    return project;
}