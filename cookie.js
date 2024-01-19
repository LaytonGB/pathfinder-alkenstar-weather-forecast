function getCookie(name) {
    return document.cookie.match(new RegExp(`(^|;) ?${name}=([^;]*)(;|$)`))?.[2];
}

function setCookie(name, value, validCheck = (x) => !isNaN(Number(x)), expiry = null) {
    if (expiry === null) {
        expiry = new Date();
        expiry.setFullYear(expiry.getFullYear() + 1);
    }
    if (!validCheck(value)) {
        return getCookie(name);
    }
    document.cookie = `${name}=${value};expires=${expiry.toUTCString()}`;
    return value;
}