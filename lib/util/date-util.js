"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAfterNextWeekDetail = exports.getNextWeekDetail = exports.getCurrentWeekDetail = exports.getPreviousWeekDetail = exports.getBeforePreviousWeekDetail = exports.formatDate = exports.getDateDetail = void 0;
var DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
var SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
var getDateDetail = function (fromDate, toDate) {
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(0, 0, 0, 0);
    var dateList = [];
    var d = fromDate;
    while (d <= toDate) {
        dateList.push({
            isoFormat: new Date(d).toISOString(),
            date: new Date(d).getDate(),
            month: new Date(d).getMonth() + 1,
            year: new Date(d).getFullYear(),
            day: DAYS[d.getDay()],
            shortDay: SHORT_DAYS[d.getDay()],
            isPastDate: new Date(d).setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)
                ? true
                : false,
            isCurrentDate: new Date(d).setHours(0, 0, 0, 0) == currentDate.setHours(0, 0, 0, 0)
                ? true
                : false,
            isFutureDate: new Date(d).setHours(0, 0, 0, 0) > currentDate.setHours(0, 0, 0, 0)
                ? true
                : false,
        });
        d = new Date(d.getTime() + 24 * 60 * 60 * 1000);
    }
    return dateList;
};
exports.getDateDetail = getDateDetail;
var formatDate = function (date, isTime) {
    if (isTime === void 0) { isTime = false; }
    var d = new Date(date);
    var datestring = d.getFullYear() +
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
exports.formatDate = formatDate;
var getBeforePreviousWeekDetail = function () {
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    var currentWeekStartDate = new Date(new Date(currentDate).setDate(currentDate.getDate() - currentDate.getDay()));
    var previousWeekEndDate = new Date(new Date(currentWeekStartDate).setDate(currentWeekStartDate.getDate() - 1));
    var previousWeekStartDate = new Date(new Date(previousWeekEndDate).setDate(previousWeekEndDate.getDate() - 6));
    var endDate = new Date(new Date(previousWeekStartDate).setDate(previousWeekStartDate.getDate() - 1));
    endDate.setHours(0, 0, 0, 0);
    return {
        endDate: (0, exports.formatDate)(endDate.toISOString()),
    };
};
exports.getBeforePreviousWeekDetail = getBeforePreviousWeekDetail;
var getPreviousWeekDetail = function () {
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    var currentWeekStartDate = new Date(new Date(currentDate).setDate(currentDate.getDate() - currentDate.getDay()));
    var endDate = new Date(new Date(currentWeekStartDate).setDate(currentWeekStartDate.getDate() - 1));
    var startDate = new Date(new Date(endDate).setDate(endDate.getDate() - 6));
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    return {
        startDate: (0, exports.formatDate)(startDate.toISOString()),
        endDate: (0, exports.formatDate)(endDate.toISOString()),
    };
};
exports.getPreviousWeekDetail = getPreviousWeekDetail;
var getCurrentWeekDetail = function () {
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    var startDate = new Date(new Date(currentDate).setDate(currentDate.getDate() - currentDate.getDay()));
    var endDate = new Date(new Date(startDate).setDate(startDate.getDate() + 6));
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    return {
        startDate: (0, exports.formatDate)(startDate.toISOString()),
        endDate: (0, exports.formatDate)(endDate.toISOString()),
    };
};
exports.getCurrentWeekDetail = getCurrentWeekDetail;
var getNextWeekDetail = function () {
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    var currentWeekStartDate = new Date(new Date(currentDate).setDate(currentDate.getDate() - currentDate.getDay()));
    var currentWeekEndDate = new Date(new Date(currentWeekStartDate).setDate(currentWeekStartDate.getDate() + 6));
    var startDate = new Date(new Date(currentWeekEndDate).setDate(currentWeekEndDate.getDate() + 1));
    var endDate = new Date(new Date(startDate).setDate(startDate.getDate() + 6));
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    return {
        startDate: (0, exports.formatDate)(startDate.toISOString()),
        endDate: (0, exports.formatDate)(endDate.toISOString()),
    };
};
exports.getNextWeekDetail = getNextWeekDetail;
var getAfterNextWeekDetail = function () {
    var currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    var currentWeekStartDate = new Date(new Date(currentDate).setDate(currentDate.getDate() - currentDate.getDay()));
    var currentWeekEndDate = new Date(new Date(currentWeekStartDate).setDate(currentWeekStartDate.getDate() + 6));
    var nextWeekStartDate = new Date(new Date(currentWeekEndDate).setDate(currentWeekEndDate.getDate() + 1));
    var nextWeekEndDate = new Date(new Date(nextWeekStartDate).setDate(nextWeekStartDate.getDate() + 6));
    var startDate = new Date(new Date(nextWeekEndDate).setDate(nextWeekEndDate.getDate() + 1));
    startDate.setHours(0, 0, 0, 0);
    return {
        startDate: (0, exports.formatDate)(startDate.toISOString()),
    };
};
exports.getAfterNextWeekDetail = getAfterNextWeekDetail;
//# sourceMappingURL=date-util.js.map