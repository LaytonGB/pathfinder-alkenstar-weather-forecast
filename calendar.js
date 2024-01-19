function getCalendar() {
    let dayCookie = getCookie("day");
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