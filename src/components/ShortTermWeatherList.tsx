import { Fragment, useEffect, useRef, useState } from "react";
import { ShortTermWeatherDataItem } from "../types/weather";
import { changeDayOrNightIcon, printCategoryStatusByValue, ptyStatus, ptyValue, skyStatus, skyValue, wsdStatus, wsdValue } from "../util/weather";
import ScrollBar from "./ScrollBar";
import { ShortTermWeatherListBox } from "./ShortTermWeatherList.style";

type ShortTermWeatherListProps = {
    shortTermWeatherData: ShortTermWeatherDataItem[];
}

type Category = {[forecastDate: string]:{[forecastTime: string]:{[category: string]: string}}};

const ShortTermWeatherList = ({shortTermWeatherData}:ShortTermWeatherListProps) => {
    const [data, setData] = useState<Category>({});
    const prevFcstDate = useRef<string>('');
    const prevFcstTime = useRef<string>('');
    const [baseDateTime, setBaseDateTime] = useState<string>("");
    const [isHiddenForecast, setIsHiddenForecast] = useState<boolean>(true);
    
    const forecastWrapper: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
    const forecastList: React.MutableRefObject<HTMLUListElement | null> = useRef(null);
    const [forecastListWidth, setForecastListWidth] = useState<number>(0);
    const [forecastListScrollWidth, setForecastListScrollWidth] = useState<number>(0);
    const callbackForecastList = (element: HTMLUListElement) => {
        if (element) {
            forecastList.current = element;
            setForecastListWidth(element.clientWidth);
            setForecastListScrollWidth(element.scrollWidth);
        }
    }

    const updateData = (item:ShortTermWeatherDataItem, newData:Category, value:string) => {
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
        const newData:Category = {};
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
            // console.log(shortTermWeatherData);
            setData(getNewData(shortTermWeatherData));
        };
    },[shortTermWeatherData]);
    return(
        <ShortTermWeatherListBox>
            <h2 aria-controls="forecast-contents" onClick={() => {setIsHiddenForecast(!isHiddenForecast);}}>
                3일 일기예보
                <img src={`${process.env.PUBLIC_URL}/image/icon/line-arrow2.svg`} style={{transform: `rotateZ(90deg) ${isHiddenForecast ? "" : "scaleX(-1)"}`}} alt="logo" />
                </h2>
            <div id="forecast-contents" className={isHiddenForecast ? "hidden" : ""}>
                <ScrollBar wrapperWidth={forecastWrapper.current?.clientWidth} list={forecastList.current} listWidth={forecastListWidth} listScrollWidth={forecastListScrollWidth} />
                <div className="forecast-wrapper" ref={forecastWrapper}>
                    <ul className="TimeForecastList" ref={callbackForecastList}>
                        <li className="listName">
                            <span className="date">날짜</span>
                            <br /><span className="time">시간</span>
                            <ul>
                                <li className="icon">날씨 아이콘</li>
                                <li className="weather">날씨</li>
                                <li className="temperatures">기온</li>
                                <li className="humidity">습도</li>
                                <li className="precipitation">강수확률</li>
                                <li className="wind">바람<br /><br /></li>
                                <li className="wave-height">파고</li>
                            </ul>
                        </li>
                        {Object.keys(data).map((dateItem) => {
                            // console.log(data);
                            // console.log("Object.keys(data): ", Object.keys(data), "data[dateItem] :", data[dateItem]);
                            const timeItem = Object.keys(data[dateItem]).sort((a, b) => Number(a)-Number(b));
                            return (
                                    <Fragment key={dateItem}>
                                        {timeItem.map((timeItem) => {
                                            // console.log("data[dateItem][timeItem] :", data[dateItem][timeItem], "timeItem :", timeItem);
                                            const { PTY, SKY, TMP, REH, POP, WSD, VEC, WAV } = data[dateItem][timeItem];
                                            // { 강수형태, 하늘상태, 기온, 습도, 강수확률, 풍속, 풍향, 파고 }
                                            return (
                                                <li className="listValue" key={dateItem + timeItem}>
                                                    <span className="date">{`${dateItem.slice(6,8)}일`}</span>
                                                    <br /><b className={(Number(timeItem.slice(0,2)) < 6 || Number(timeItem.slice(0,2)) >= 18) ? "time night" : "time"}>{`${timeItem.slice(0,2)}:${timeItem.slice(2,4)}`}</b>
                                                    <ul>
                                                        {PTY.includes("없음") ? (
                                                            <>
                                                                <li className="icon">
                                                                    <img src={`${process.env.PUBLIC_URL}/image/icon-weather/weather${SKY.split(',')[1]}.svg`} alt="logo" />
                                                                </li>
                                                                <li className="weather">{SKY.split(',')[0]}</li>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <li className="icon">
                                                                    <img src={`${process.env.PUBLIC_URL}/image/icon-weather/weather${PTY.split(',')[1]}.svg`} alt="logo" />
                                                                </li>
                                                                <li className="weather">{PTY.split(',')[0]}</li>
                                                            </>
                                                        )}
                                                        <li className="temperatures">{TMP}℃</li>
                                                        <li className="humidity">{REH}%</li>
                                                        <li className="precipitation">{POP}%</li>
                                                        <li className="wind">
                                                            {WSD.split(',')[0]}<br />
                                                            <span className="wind-direction">
                                                                <img style={{transform: `translate(-50%, -40%) rotateZ(${VEC}deg)`}} src={`${process.env.PUBLIC_URL}/image/icon-weather_detail/wind2.svg`} alt="logo" />
                                                            </span>{WSD.split(',')[1]}m/s
                                                        </li>
                                                        <li className="wave-height">{WAV}</li>
                                                    </ul>
                                                </li>
                                            )
                                        })}
                                    </Fragment>
                            );
                        })}
                    </ul>
                </div>
                <span className="forecastDateTime"> 예측시간 : {`${baseDateTime.slice(0,4)}년 ${baseDateTime.slice(4,6)}월 ${baseDateTime.slice(6,8)}일 ${baseDateTime.slice(8,10)}:${baseDateTime.slice(10,12)}`}</span>
            </div>
            
        </ShortTermWeatherListBox>
    );
};

export default ShortTermWeatherList;