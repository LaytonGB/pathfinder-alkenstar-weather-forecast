const cookie = {
    values: {},

    init() {
        document.cookie.split(/; */g).forEach((x) => {
            const [name, value] = x.split(/ *= */g);
            this.values[name] = Number(value);
        });
    },

    get(name) {
        return this.values[name];
    },

    set(name, value, validCheck = (x) => !isNaN(Number(x)), expiry = null) {
        if (!validCheck(value)) {
            return this.get(name);
        }
        if (expiry === null) {
            expiry = new Date();
            expiry.setFullYear(expiry.getFullYear() + 1);
        }
        document.cookie = `${name}=${value};expires=${expiry.toUTCString()}`;
        this.values[name] = value;
        return value;
    }
};
cookie.init();
