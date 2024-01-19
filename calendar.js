function getCalendar() {
    let dayCookie = cookie.get("day") || 1;
    const calendar = {
        day: Number(dayCookie) || 1,
        prev() {
            this.day--;
        },
        next() {
            this.day++;
        },
    };
    return calendar;
}