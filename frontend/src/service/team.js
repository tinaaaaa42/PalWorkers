import {getJson, PREFIX, post} from "./common";

export async function get_team() {
    const url = `${PREFIX}/tasks/team`;
    let team;
    try {
        team = await getJson(url);
    } catch (e) {
        console.log(e);
        team = {
            total: 0,
            items: []
        };
    }
    return team;
}

export async function create_team(teamName) {
    console.log(teamName)
    const url = `${PREFIX}/tasks/create_team`;
    let team;
    try {
        team = await post(url,teamName)
    } catch (e) {
        console.log(e);
        team = null;
    }
    return team.cookie;
}