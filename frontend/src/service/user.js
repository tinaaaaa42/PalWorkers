import {getJson, PREFIX} from "./common";

export async function get_username() {
    const url = `${PREFIX}/api/user/username`;
    let username;
    try {
        username = await getJson(url)
    } catch (e) {
        console.log(e)
        username = "UNDEFINED"
    }
    return username;
}