import { useEffect, useState } from "react";
import { ultraShortTermWeatherDataItem } from "../types/weather";

type UltraShortTermWeatherListProps = {
    ultraShortTermWeatherData: ultraShortTermWeatherDataItem[];
}

type Category = { [key: string]: [string, string]; };

const CheckUltraShortTermWeatherList = ({ultraShortTermWeatherData}:UltraShortTermWeatherListProps) => {
    const [firstData, setFirstData] = useState<ultraShortTermWeatherDataItem>({
        baseDate: "",
        baseTime: "",
        category: "",
        obsrValue: ""
    });
    const [data, setData] = useState<Category>({
        "기온": ["", ""],
        "1시간 강수량": ["", ""],
        "동서바람성분": ["", ""],
        "남북바람성분": ["", ""],
        "습도": ["", ""],
        "강수형태": ["0", ""],
        "풍향": ["", ""],
        "풍속": ["", ""]
    });
    useEffect(() => {
        if (ultraShortTermWeatherData.length > 0) {
            setFirstData(ultraShortTermWeatherData[0]);
            const getNewData = (ultraShortTermWeatherData:ultraShortTermWeatherDataItem[]) => {
                const newDataArray = ultraShortTermWeatherData.flatMap((item:ultraShortTermWeatherDataItem) => {
                    let categoryName = "";
                    let value = item.obsrValue;
                    let unit = "";
                    switch (item.category) {
                        case "T1H":
                            categoryName = "기온";
                            unit = "℃";
                            break;
                        case "RN1":
                            categoryName = "1시간 강수량";
                            unit = "mm";
                            break;
                        case "UUU":
                            categoryName = "동서바람성분";
                            unit = "m/s";
                            break;
                        case "VVV":
                            categoryName = "남북바람성분";
                            unit = "m/s";
                            break;
                        case "REH":
                            categoryName = "습도";
                            unit = "%";
                            break;
                        case "PTY":
                            categoryName = "강수형태";
                            unit = "";
                            break;
                        case "VEC":
                            categoryName = "풍향";
                            unit = "deg";
                            break;
                        case "WSD":
                            categoryName = "풍속";
                            unit = "m/s";
                            break;
                        default:
                            categoryName = "";
                            unit = "";
                            console.log("✅잘못된 값입니다");
                    }
                    if (item.category === "PTY") {
                        switch (item.obsrValue) {
                            case "0":
                                value = "없음";
                                break;
                            case "1":
                                value = "비";
                                break;
                            case "2":
                                value = "비/눈";
                                break;
                            case "3":
                                value = "눈";
                                break;
                            case "4":
                                value = "소나기";
                                break;
                            case "5":
                                value = "빗방울";
                                break;
                            case "6":
                                value = "빗방울눈날림";
                                break;
                            case "7":
                                value = "눈날림";
                                break;
                            default:
                                value = "";
                                console.log("✅잘못된 값입니다");
                        };
                    }
                    return [categoryName, value, unit]
                });
                let newData: { [key: string]: [string, string] } = {}
                for (let i = 0; i < newDataArray.length; i += 3) {
                    newData[newDataArray[i]] = [newDataArray[i+1], newDataArray[i+2]];
                }
                return newData;
            };
            setData(getNewData(ultraShortTermWeatherData));
        }
    },[ultraShortTermWeatherData]);
    return(
        <>
            {`${firstData.baseDate.slice(0,4)}년 ${firstData.baseDate.slice(4,6)}월 ${firstData.baseDate.slice(6,8)}일 ${firstData.baseTime.slice(0,2)}:${firstData.baseTime.slice(2,4)}`}
            <br />
            {`기온 : ${data["기온"][0]}${data["기온"][1]}`}
            <br />
            {`강수형태 : ${data["강수형태"][0]}${data["강수형태"][1]}`}
            <br />
            {`1시간 강수량 : ${data["1시간 강수량"][0]}${data["1시간 강수량"][1]}`}
            <br />
            {`습도 : ${data["습도"][0]}${data["습도"][1]}`}
            <br />
            {`풍향 : ${data["풍향"][0]}${data["풍향"][1]}`}
            <br />
            {`풍속 : ${data["풍속"][0]}${data["풍속"][1]}`}
            <br />
            {`동서바람성분 : ${data["동서바람성분"][0]}${data["동서바람성분"][1]}`}
            <br />
            {`남북바람성분 : ${data["남북바람성분"][0]}${data["남북바람성분"][1]}`}
            <br />
        </>
    );
};

export default CheckUltraShortTermWeatherList;