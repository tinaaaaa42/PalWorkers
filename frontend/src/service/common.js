// export const BASEURL = process.env.REACT_APP_BASE_URL ?? 'http://localhost:8080';
export const BASEURL = 'http://localhost:8088';

export const PREFIX = `${BASEURL}/api`;

export async function getJson(url) {
    let res = await fetch(url, { method: "GET", credentials: "include" });
    if (res.status === 401) {
      window.location.href = "/login";
    }
    return res.json();
}

export async function put(url, data) {
    let opts = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };
    let res = await fetch(url, opts);
    return res;
}

export async function post(url, data) {
    let opts = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };
    let res = await fetch(url, opts);
    return res.json();
}

export async function del(url, data) {
    let opts = {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      },
      credentials: "include"
    };
    let res = await fetch(url, opts);
    return res;
}

export const DUMMY_RESPONSE = {
    ok: false,
    message: "Connection failure."
}

// export const user_id = 1;
