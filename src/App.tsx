
import { startTransition, useEffect, useState } from 'react';
import getAirQualityLiveInfo from './api/weatherAPI/getAirQualityLiveInfo';
import getShortTermWeatherForecast from './api/weatherAPI/getShortTermWeatherForecast';
import getUltraShortTermWeatherLive from './api/weatherAPI/getUltraShortTermWeatherLive';
import './App.css';
import CurrentWeather from './components/currentWeather/CurrentWeather';
import { ShortTermWeatherDataItem, ultraShortTermWeatherDataItem } from './types/weather';
import { AirQualityData } from './types/airQuailty';
import ShortTermWeatherList from './components/shortTermWeather/ShortTermWeatherList';
import AirQuality from './components/airQuality/AirQuality';

const ultraShortTermWeatherLive = getUltraShortTermWeatherLive();
const shortTermWeatherForecast = getShortTermWeatherForecast();
const airQualityLiveInfo = getAirQualityLiveInfo();

function App() {
  const [ultraShortTermWeatherData, setUltraShortTermWeatherData] = useState<ultraShortTermWeatherDataItem[]>([]);
  const [shortTermWeatherData, setShortTermWeatherData] = useState<ShortTermWeatherDataItem[]>([]);
  const [airQualityData, setAirQualityData] = useState<AirQualityData>({
    "dataTime": "0000-00-00 00:00",
    "mangName": "정보없음", // 측정망 정보
    "stationName": "정보없음", // 측정소명 // 변경가능. 이 위치에 따른 정보를 가져옴
    "stationCode": "0", // 측정소 코드

    "khaiGrade": "0", // 통합대기환경지수

    "pm25Value": "0", // 미세먼지(PM2.5) 농도 ㎍/㎥
    "pm25Grade1h": "0", // 미세먼지(PM2.5) 1시간 등급

    "pm10Value": "0", // 미세먼지(PM10) 농도 ㎍/㎥
    "pm10Grade1h": "0", // 미세먼지(PM10) 1시간 등급자료

    "o3Value": "0", // 오존 농도 ppm
    "o3Grade": "0", // 오존 지수

    "so2Value": "0", // 아황산가스 농도 ppm
    "so2Grade": "0", // 아황산가스 지수

    "no2Value": "0", // 이산화질소 농도 ppm
    "no2Grade": "0", // 이산화질소 지수

    "coValue": "0", // 일산화탄소 농도 ppm
    "coGrade": "0", // 일산화탄소 지수

    "pm25Value24": "-",// 미세먼지(PM2.5) 24시간예측이동농도
    "pm10Value24": "-", // 미세먼지(PM10) 24시간예측이동농도

    // 이 아래는 사용 안함
    "khaiValue": "0", // 통합대기환경수치
    "pm25Grade": "0",
    "pm25Flag": "0", // 미세먼지(PM2.5) 플래그..
    "pm10Grade": "0", // 미세먼지(PM10) 24시간 등급
    "pm10Flag": "0",
    "no2Flag": "0",
    "coFlag": "0",
    "o3Flag": "0",
    "so2Flag": "0",
  });

  useEffect(() => {
    airQualityLiveInfo.then((response) => {
      if (!Array.isArray(response)) {
        setAirQualityData(response);
      }
    });
    ultraShortTermWeatherLive.then((response) => {
      setUltraShortTermWeatherData(response);
    });
    startTransition(() => {
      shortTermWeatherForecast.then((response) => {
        setShortTermWeatherData(response);
      });
    })
  },[]);

  return (
    <div className="App">
      <h1 style={{textAlign: "center"}}>날씨정보</h1>
      <CurrentWeather ultraShortTermWeatherData={ultraShortTermWeatherData} />
      <ShortTermWeatherList shortTermWeatherData={shortTermWeatherData} />
      <AirQuality airQualityData={airQualityData} />
    </div>
  );
};

export default App;
