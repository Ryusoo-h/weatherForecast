import { useEffect, useRef, useState } from "react";
import { ShortTermWeatherCategory, ShortTermWeatherDataItem } from "../types/weather";
import { changeDayOrNightIcon, printCategoryStatusByValue, ptyStatus, ptyValue, skyStatus, skyValue, wsdStatus, wsdValue } from "../util/weather";


const useShortTermWeatherData = (shortTermWeatherData: ShortTermWeatherDataItem[]):[ShortTermWeatherCategory, string] => {
    const [newData, setNewData] = useState<ShortTermWeatherCategory>({});
    const prevFcstDate = useRef<string>('');
    const prevFcstTime = useRef<string>('');
    const [baseDateTime, setBaseDateTime] = useState<string>("");

    const updateData = (item:ShortTermWeatherDataItem, newData:ShortTermWeatherCategory, value:string) => {
        const {category, fcstDate, fcstTime, baseDate, baseTime} = item;
                        
        if (fcstDate !== prevFcstDate.current) {
            // 새 예보 날짜면 새로운 날짜를 키로 갖는 객체를 만들고 추가하기
            prevFcstDate.current = fcstDate;
            if (fcstTime !== prevFcstTime.current) { // 새로운 FcstTime이면 FcstTime객체 추가 / 아니면 기존에 추가
                prevFcstTime.current = fcstTime;
                setBaseDateTime(baseDate + baseTime);
                if (!newData[fcstDate]) {
                    newData[fcstDate] = {};
                }
                newData[fcstDate][fcstTime] = {[category] : value, "dateTime": baseDate + baseTime};
            }
        } else {
            // // 같으면 같은 날짜를 키로 갖는 기존 객체에 추가하기
            if (item.fcstTime !== prevFcstTime.current) { // 새로운 FcstTime이면 FcstTime객체 추가 / 아니면 기존에 추가
                prevFcstTime.current = fcstTime;
                if (!newData[fcstDate]) {
                    newData[fcstDate] = {};
                }
                newData[fcstDate][fcstTime] = {[category] : value};
            } else {
                newData[fcstDate][fcstTime][category] = value;
            }
        }
    };

    const getNewData = (shortTermWeatherData:ShortTermWeatherDataItem[]) => {
        const newData:ShortTermWeatherCategory = {};
        shortTermWeatherData.forEach((item) => {
            const category = item.category;
            let value:string = "";
            value = item.fcstValue;
            
            if (category === "SKY") { // 하늘상태
                let [newSKYValue, newSKYIconNum] = printCategoryStatusByValue(value, skyValue, skyStatus, false).split(',');
                value = newSKYValue + "," + changeDayOrNightIcon(Number(item.fcstTime.slice(0,2)), newSKYIconNum);
            }
            if (category === "PTY") { // 강수
                let [newPTYValue, newPTYIconNum] = printCategoryStatusByValue(value, ptyValue, ptyStatus, false).split(',');
                value = newPTYValue + "," + changeDayOrNightIcon(Number(item.fcstTime.slice(0,2)), newPTYIconNum);
            }
            if (category === "WSD") { // 풍속
                value = printCategoryStatusByValue(value, wsdValue, wsdStatus, true);
            }
            updateData(item, newData, value);
            
        },{});
        return newData;
    };

    useEffect(() => {
        if (shortTermWeatherData.length > 0) {
            setNewData(getNewData(shortTermWeatherData));
        };
    }, [shortTermWeatherData])

    return [newData, baseDateTime];
};

export default useShortTermWeatherData;