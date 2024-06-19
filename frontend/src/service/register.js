import {post, PREFIX} from "./common";

export async function register(username,password,email) {
    const registerInfo = {
        "username":username,
        "password":password,
        "email":email
    }
    const url = `${PREFIX}/user/register`;
    let status = null;
    try {
        status = await post(url,registerInfo);
    } catch(e) {
        console.log(e);
    }
    return status;
}