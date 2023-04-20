import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ShortTermWeatherDataItem } from "../types/weather";

const ShortTermWeatherListBox = styled.div`
    ul {
        list-style: none;
        margin: none;
        padding: none;
        li {
            margin: 10px 0;
        }
    }
    .frctDateTime {
        color: #838383;
        grid-row: 1 / 2;
        grid-column: 1 / 3;
    }
    .TimeForecastList {
        display: grid;
        grid: 1fr / 106px repeat(24, 60px);
        gap: 8px;
        .time {
            font-weight: bold;
            color: #39a7ff;
        }
        overflow: auto;
    }
`;

type ShortTermWeatherListProps = {
    shortTermWeatherData: ShortTermWeatherDataItem[];
}

type Category = {[frctDate: string]:{[frctTime: string]:[string[]]}};

const CheckShortTermWeatherList = ({shortTermWeatherData}:ShortTermWeatherListProps) => {
    const [data, setData] = useState<Category>({});
    
    const prevFcstDate = useRef('');
    const prevFcstTime = useRef('');
    const [baseDateTime, setBaseDateTime] = useState("");
    useEffect(() => {
        if (shortTermWeatherData.length > 0) {

            const getNewData = (shortTermWeatherData:ShortTermWeatherDataItem[]) => {
                const newData:{[frctDate: string]:{[frctTime: string]:[string[]]}} = {};
                shortTermWeatherData.forEach((item) => {
                    let categoryName = "";
                    let value = item.fcstValue;
                    switch (item.category) {
                        case "TMP":
                            categoryName = "1시간 기온";
                            break;
                        case "UUU":
                            categoryName = "풍속(동서성분)";
                            break;
                        case "VVV":
                            categoryName = "풍속(남북성분)";
                            break;
                        case "VEC":
                            categoryName = "풍향";
                            break;
                        case "WSD":
                            categoryName = "풍속";
                            break;
                        case "SKY":
                            categoryName = "하늘상태";
                            break;
                        case "PTY":
                            categoryName = "강수형태";
                            break;
                        case "POP":
                            categoryName = "강수확률";
                            break;
                        case "WAV":
                            categoryName = "파고";
                            break;
                        case "PCP":
                            categoryName = "강수없음";
                            break;
                        case "REH":
                            categoryName = "습도";
                            break;
                        case "SNO":
                            categoryName = "적설없음";
                            break;
                        case "TMN":
                            categoryName = "일 최저기온";
                            break;
                        case "TMX":
                            categoryName = "일 최고기온";
                            break;
                        default:
                            categoryName = "";
                            console.log("✅7잘못된 값입니다");
                            
                    }

                    if (item.category === "SKY") { // 하늘상태
                        if (Number(value) <= 5) {
                            value="맑음"
                        } else if (Number(value) <= 8) {
                            value = "구름많음";
                        } else if (Number(value) <= 10) {
                            value = "흐림";
                        } else {
                            value = "";
                            console.log("✅6잘못된 등급 값입니다");
                        }
                    }
                    if (item.category === "PTY") { // 강수
                        switch (value) {
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
                                console.log("✅5잘못된 등급 값입니다");
                        };
                    }
                    if (item.category === "UUU") { // 풍속(동서성분)
                        if (Number(value) > 0) {
                            value = "동" + value;
                        } else if (Number(value) < 0) {
                            value = value.replace("-", "서");
                        } else if (Number(value) === 0) {
                            value = "0";
                        } else {
                            value = "";
                            console.log("✅4잘못된 등급 값입니다");
                        }
                    }
                    if (item.category === "VVV") { // 풍속(남북성분)
                        if (Number(value) > 0) {
                            value = "북" + value;
                        } else if (Number(value) < 0) {
                            value = value.replace("-", "남");
                        } else if (Number(value) === 0) {
                            value = "0";
                        } else {
                            value = "";
                            console.log("✅3잘못된 등급 값입니다");
                        }
                    }
                    if (item.category === "VEC") { // 풍향
                        if (Number(value) <= 45) {
                            value="N-NE"
                        } else if (Number(value) <= 90) {
                            value = "NE-E";
                        } else if (Number(value) <= 135) {
                            value = "E-SE";
                        } else if (Number(value) <= 180) {
                            value = "SE-S";
                        } else if (Number(value) <= 225) {
                            value = "S-SW";
                        } else if (Number(value) <= 270) {
                            value = "SW-W";
                        } else if (Number(value) <= 315) {
                            value = "W-NW";
                        } else if (Number(value) <= 360) {
                            value = "NW-N";
                        } else {
                            value = "";
                            console.log("✅2잘못된 등급 값입니다");
                        }
                    }
                    if (item.category === "WSD") { // 풍속
                        if (Number(value) < 4) {
                            value="약함"
                        } else if (Number(value) < 9) {
                            value = "약간 강함";
                        } else if (Number(value) < 14) {
                            value = "강함";
                        } else if (Number(value) >= 14) {
                            value = "매우 강함";
                        } else {
                            value = "";
                            console.log("✅1잘못된 등급 값입니다");
                        }
                    }

                    if (item.fcstDate !== prevFcstDate.current) {
                        // 새 예보 날짜면 새로 만들기
                        prevFcstDate.current = item.fcstDate;
                        if (item.fcstTime !== prevFcstTime.current) { // 새로운 FcstTime이면 FcstTime객체 추가 / 아니면 기존에 추가
                            prevFcstTime.current = item.fcstTime;
                            setBaseDateTime(item.baseDate + item.baseTime);
                            if (!newData[prevFcstDate.current]) {
                                newData[prevFcstDate.current] = {};
                            }
                            newData[prevFcstDate.current][prevFcstTime.current] = [[categoryName, value, item.baseDate, item.baseTime]];
                        } else { // 실제로 이경우에 들어가는 데이터는 없었는데.. 그래도 만들어두면 좋나..???????
                            setBaseDateTime(item.baseDate + item.baseTime);
                            newData[prevFcstDate.current][prevFcstTime.current].push(["됨", categoryName, value, item.baseDate, item.baseTime]);
                        }
                    } else {
                        // // 같으면 그 예보날짜에 추가하기
                        if (item.fcstTime !== prevFcstTime.current) { // 새로운 FcstTime이면 FcstTime객체 추가 / 아니면 기존에 추가
                            prevFcstTime.current = item.fcstTime;
                            if (!newData[prevFcstDate.current]) {
                                newData[prevFcstDate.current] = {};
                            }
                            newData[prevFcstDate.current][prevFcstTime.current] = [[categoryName, value]];
                        } else {
                            newData[prevFcstDate.current][prevFcstTime.current].push([categoryName, value]);
                        }
                    }
                },{});
                // console.log(newData);
                return newData;
            };
            setData(getNewData(shortTermWeatherData));
        };
    },[shortTermWeatherData]);
    return(
        <ShortTermWeatherListBox>
            {Object.keys(data).map((dateItem) => {
                // console.log("Object.keys(data): ", Object.keys(data), "data[dateItem] :", data[dateItem]);
                const timeItem = Object.keys(data[dateItem]).sort((a, b) => Number(a)-Number(b));
                // console.log(timeItem);
                return (
                    <div className="forecast-wrapper">
                        <b>{`${dateItem.slice(0,4)}년 ${dateItem.slice(4,6)}월 ${dateItem.slice(6,8)}일`}</b> 
                        <span className="frctDateTime"> (예측시간 : {`${baseDateTime.slice(0,4)}년 ${baseDateTime.slice(4,6)}월 ${baseDateTime.slice(6,8)}일 ${baseDateTime.slice(8,10)}:${baseDateTime.slice(10,12)}`})</span>
                        <ul className="TimeForecastList">
                            {timeItem.map((timeItem, index) => {
                                // console.log("data[dateItem][timeItem] :", data[dateItem][timeItem][0], "timeItem :", timeItem)
                                return (
                                    <>
                                        {index === 0 && (
                                                <ul className="listName">
                                                    <li><span className="time">시간</span></li>
                                                    {data[dateItem][timeItem].map(item => {
                                                        return (
                                                            <li>{item[0]} :</li>
                                                        )
                                                    })}
                                                </ul>
                                            )}
                                        <li><span className="time">{`${timeItem.slice(0,2)}:${timeItem.slice(2,4)}`}</span>
                                            
                                            <ul className="listValue">
                                                {data[dateItem][timeItem].map((item) => {
                                                    return (
                                                        <>
                                                            <li>{item[1]}</li>
                                                        </>
                                                    );
                                                })}
                                            </ul>
                                        </li>
                                        {/* ${data[dateItem][timeItem]} */}
                                        {/* {data[timeItem] && data[timeItem].map((forecast, index) => {
                                            return (
                                                <>
                                                    {index === 0 && (<li>{`예측일자 ${forecast[2].slice(0,4)}년 ${forecast[2].slice(4,6)}월 ${forecast[2].slice(6,8)}일 ${forecast[3].slice(0,2)}:${forecast[3].slice(2,4)}`}</li>)}
                                                    <li>{forecast[0]} : {forecast[1]}</li>
                                                </>
                                            );
                                        })} */}
                                    </>
                                )
                            })}
                        </ul>
                        <br />
                    </div>
                );
            })}
        </ShortTermWeatherListBox>
    );
};

export default CheckShortTermWeatherList;