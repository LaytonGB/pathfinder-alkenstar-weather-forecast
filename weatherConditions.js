function generateSurgeTime(random) {
    const surgeStart = Math.floor(random() * 24 * 60);
    const dateStart = new Date(0);
    dateStart.setHours(Math.floor(surgeStart / 60));
    dateStart.setMinutes(Math.floor(surgeStart % 60 / 15) * 15);

    const surgeDuration = Math.floor(random() * 12 * 15 + 15);
    const dateDuration = new Date(0);
    dateDuration.setHours(Math.floor(surgeDuration / 60));
    dateDuration.setMinutes(Math.floor(surgeDuration % 60 / 15) * 15);

    const dateEnd = new Date(dateStart.getTime() + dateDuration.getTime());
    if (dateEnd.getHours() > 24) {
        dateEnd.setHours(24);
        dateEnd.setMinutes(0);
    }

    return [
        dateStart,
        dateEnd,
    ];
}