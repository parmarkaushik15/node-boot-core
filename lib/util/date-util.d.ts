export declare const getDateDetail: (fromDate: Date, toDate: Date) => {
    isoFormat: string;
    date: number;
    month: number;
    year: number;
    day: string;
    shortDay: string;
    isPastDate: boolean;
    isCurrentDate: boolean;
    isFutureDate: boolean;
}[];
export declare const formatDate: (date: string, isTime?: boolean) => string;
export declare const getBeforePreviousWeekDetail: () => {
    endDate: string;
};
export declare const getPreviousWeekDetail: () => {
    startDate: string;
    endDate: string;
};
export declare const getCurrentWeekDetail: () => {
    startDate: string;
    endDate: string;
};
export declare const getNextWeekDetail: () => {
    startDate: string;
    endDate: string;
};
export declare const getAfterNextWeekDetail: () => {
    startDate: string;
};
