import { useEffect, useState } from "react";

const isValidDateTime = (dateTime: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/;
    return regex.test(dateTime);
}

export type dateTimeFormat = {
    year: string,
    month: string,
    day: string,
    hour: string,
    minute: string,
}

const useDateTimeFormatter = (dateTime: string) => {
    const [newDateTime, setNewDateTime] = useState<dateTimeFormat>({
        year: "yyyy", 
        month: "mm", 
        day: "dd", 
        hour: "hh", 
        minute: "mm",
    });

    useEffect(() => {
        let dateTimeData = "0000-00-00 00:00";
        if (isValidDateTime(dateTime)) {
            dateTimeData = dateTime;
        } else {
            console.log("dateTime 포멧이 YYYY-MM-DD hh:mi 가 아닙니다");
        }

        const [datePart, timePart] = dateTimeData.split(" ");
        const [year, month, day] = datePart.split("-");
        const [hour, minute] = timePart.split(":");
        setNewDateTime({year, month, day, hour, minute});
    },[dateTime]);

    return newDateTime;
};

export default useDateTimeFormatter;