const dayjs = require("dayjs");

const getStartMillisecond = (date = dayjs()) =>
    date.millisecond(0);

const getStartSecond = (date = dayjs()) =>
    getStartMillisecond(date.second(0));

const getStartMinute = (date = dayjs()) =>
    getStartSecond(date.minute(0));

const getStartHour = (date = dayjs()) =>
    getStartMinute(date.hour(0));

const getStartDay = (date) => {
    if (dayjs(+date * 1000).isValid()) {
        const fecha = getStartHour(dayjs(+date * 1000));
        return fecha.toISOString();
    }
}

const parseDate = (date) => {
    if (dayjs(+date * 1000).isValid())
        return dayjs(+date * 1000).toISOString();
}

module.exports = {
    getStartDay,
    parseDate,
}