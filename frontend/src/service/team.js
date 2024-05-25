import {getJson, PREFIX} from "./common";

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