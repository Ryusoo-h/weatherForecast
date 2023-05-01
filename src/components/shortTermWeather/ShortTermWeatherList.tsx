import React from "react";
import { Fragment, useRef, useState } from "react";
import useShortTermWeatherData from "../../hooks/useShortTermWeatherDataList";
import { ShortTermWeatherCategory, ShortTermWeatherDataItem } from "../../types/weather";
import ScrollBar from "../ScrollBar";
import { ShortTermWeatherListSection } from "./ShortTermWeatherList.style";

type ShortTermWeatherListProps = {
    shortTermWeatherData: ShortTermWeatherDataItem[];
}

const ShortTermWeatherList = ({shortTermWeatherData}:ShortTermWeatherListProps) => {
    const [data, baseDateTime]:[ShortTermWeatherCategory, string] = useShortTermWeatherData(shortTermWeatherData);
    const [isHiddenForecast, setIsHiddenForecast] = useState<boolean>(true);
    
    const forecastWrapper: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
    const forecastList: React.MutableRefObject<HTMLUListElement | null> = useRef(null); // ul.timeForecastList element
    const [forecastListWidth, setForecastListWidth] = useState<number>(0);
    const [forecastListScrollWidth, setForecastListScrollWidth] = useState<number>(0);
    const callbackForecastList = (element: HTMLUListElement) => {
        if (element) {
            forecastList.current = element;
            setForecastListWidth(element.clientWidth);
            setForecastListScrollWidth(element.scrollWidth);
        }
    }

    return(
        <ShortTermWeatherListSection id="short-term-weather-list">
            <div className="container">
                <h2 className="section-title" aria-controls="forecast-contents" onClick={() => {setIsHiddenForecast(!isHiddenForecast);}}>
                    3일 일기예보
                    <img src={`${process.env.PUBLIC_URL}/image/icon/line-arrow2.svg`} style={{transform: `rotateZ(90deg) ${isHiddenForecast ? "" : "scaleX(-1)"}`}} alt="toggle-button-arrow-icon" />
                    </h2>
                <div id="forecast-contents" className={isHiddenForecast ? "hidden" : ""}>
                    <ScrollBar wrapperWidth={forecastWrapper.current?.clientWidth} list={forecastList.current} listWidth={forecastListWidth} listScrollWidth={forecastListScrollWidth} />
                    <div className="forecast-wrapper" ref={forecastWrapper}>
                        <ul className="timeForecastList" ref={callbackForecastList}>
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
                                const timeItem = Object.keys(data[dateItem]).sort((a, b) => Number(a)-Number(b));
                                return (
                                    <Fragment key={dateItem}>
                                        {timeItem.map((timeItem) => {
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
                                                                    <img src={`${process.env.PUBLIC_URL}/image/icon-weather/weather${SKY.split(',')[1]}.svg`} alt="weather-icon" loading="lazy"/>
                                                                </li>
                                                                <li className="weather">{SKY.split(',')[0]}</li>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <li className="icon">
                                                                    <img src={`${process.env.PUBLIC_URL}/image/icon-weather/weather${PTY.split(',')[1]}.svg`} alt="weather-icon" loading="lazy"/>
                                                                </li>
                                                                <li className="weather">{PTY.split(',')[0]}</li>
                                                            </>
                                                        )}
                                                        <li className="temperatures">{TMP}℃</li>
                                                        <li className="humidity">{REH}%</li>
                                                        <li className="precipitation">{POP}%</li>
                                                        <li className="wind">
                                                            {WSD.split(',')[0]}<br />
                                                            <span className="wind-direction-and-wind-speed">
                                                                <span className="wind-direction">
                                                                    <img style={{transform: `translate(-50%, -40%) rotateZ(${VEC}deg)`}} src={`${process.env.PUBLIC_URL}/image/icon-weather_detail/wind2.svg`} alt="wind-arrow-icon" loading="lazy"/>
                                                                </span>{WSD.split(',')[1]}m/s
                                                            </span>
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
                    <span className="info-gray-text"> 예측시간 : {`${baseDateTime.slice(0,4)}년 ${baseDateTime.slice(4,6)}월 ${baseDateTime.slice(6,8)}일 ${baseDateTime.slice(8,10)}:${baseDateTime.slice(10,12)}`}</span>
                </div>
                
            </div>
        </ShortTermWeatherListSection>
        
    );
};

export default React.memo(ShortTermWeatherList);