/**
 * Get Day`s full name list of week.
 */
const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

/**
 * Get Day`s short name list of week.
 */
const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Get Month`s full name list of year.
 */
exports.MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
/**
 * Get Month`s short name list of year.
 */
exports.SHORT_MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const getDateDetail = (fromDate: Date, toDate: Date) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(0, 0, 0, 0);

    let dateList = [];
    let d = fromDate;
    while (d <= toDate) {
        dateList.push({
            isoFormat: new Date(d).toISOString(),
            date: new Date(d).getDate(),
            month: new Date(d).getMonth() + 1,
            year: new Date(d).getFullYear(),
            day: DAYS[d.getDay()],
            shortDay: SHORT_DAYS[d.getDay()],
            isPastDate:
                new Date(d).setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)
                    ? true
                    : false,
            isCurrentDate:
                new Date(d).setHours(0, 0, 0, 0) == currentDate.setHours(0, 0, 0, 0)
                    ? true
                    : false,
            isFutureDate:
                new Date(d).setHours(0, 0, 0, 0) > currentDate.setHours(0, 0, 0, 0)
                    ? true
                    : false,
        });
        d = new Date(d.getTime() + 24 * 60 * 60 * 1000);
    }
    return dateList;
};

export const formatDate = (date: string, isTime: boolean = false) => {
    const d = new Date(date);
    let datestring =
        d.getFullYear() +
        "-" +
        ("0" + (d.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + d.getDate()).slice(-2);

    if (isTime) {
        datestring =
            +" " +
            ("0" + d.getHours()).slice(-2) +
            ":" +
            ("0" + d.getMinutes()).slice(-2);
    }
    return datestring;
};

export const getBeforePreviousWeekDetail = () => {
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const currentWeekStartDate = new Date(
        new Date(currentDate).setDate(currentDate.getDate() - currentDate.getDay())
    );
    const previousWeekEndDate = new Date(
        new Date(currentWeekStartDate).setDate(currentWeekStartDate.getDate() - 1)
    );
    const previousWeekStartDate = new Date(
        new Date(previousWeekEndDate).setDate(previousWeekEndDate.getDate() - 6)
    );
    const endDate = new Date(
        new Date(previousWeekStartDate).setDate(previousWeekStartDate.getDate() - 1)
    );
    endDate.setHours(0, 0, 0, 0);
    return {
        endDate: formatDate(endDate.toISOString()),
    };
};

export const getPreviousWeekDetail = () => {
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const currentWeekStartDate = new Date(
        new Date(currentDate).setDate(currentDate.getDate() - currentDate.getDay())
    );
    const endDate = new Date(
        new Date(currentWeekStartDate).setDate(currentWeekStartDate.getDate() - 1)
    );
    const startDate = new Date(new Date(endDate).setDate(endDate.getDate() - 6));
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    return {
        startDate: formatDate(startDate.toISOString()),
        endDate: formatDate(endDate.toISOString()),
    };
};

export const getCurrentWeekDetail = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const startDate = new Date(
        new Date(currentDate).setDate(currentDate.getDate() - currentDate.getDay())
    );
    const endDate = new Date(
        new Date(startDate).setDate(startDate.getDate() + 6)
    );
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    return {
        startDate: formatDate(startDate.toISOString()),
        endDate: formatDate(endDate.toISOString()),
    };
};

export const getNextWeekDetail = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const currentWeekStartDate = new Date(
        new Date(currentDate).setDate(currentDate.getDate() - currentDate.getDay())
    );
    const currentWeekEndDate = new Date(
        new Date(currentWeekStartDate).setDate(currentWeekStartDate.getDate() + 6)
    );
    const startDate = new Date(
        new Date(currentWeekEndDate).setDate(currentWeekEndDate.getDate() + 1)
    );
    const endDate = new Date(
        new Date(startDate).setDate(startDate.getDate() + 6)
    );
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    return {
        startDate: formatDate(startDate.toISOString()),
        endDate: formatDate(endDate.toISOString()),
    };
};

export const getAfterNextWeekDetail = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const currentWeekStartDate = new Date(
        new Date(currentDate).setDate(currentDate.getDate() - currentDate.getDay())
    );
    const currentWeekEndDate = new Date(
        new Date(currentWeekStartDate).setDate(currentWeekStartDate.getDate() + 6)
    );
    const nextWeekStartDate = new Date(
        new Date(currentWeekEndDate).setDate(currentWeekEndDate.getDate() + 1)
    );
    const nextWeekEndDate = new Date(
        new Date(nextWeekStartDate).setDate(nextWeekStartDate.getDate() + 6)
    );
    const startDate = new Date(
        new Date(nextWeekEndDate).setDate(nextWeekEndDate.getDate() + 1)
    );
    startDate.setHours(0, 0, 0, 0);
    return {
        startDate: formatDate(startDate.toISOString()),
    };
};
