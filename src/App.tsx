
import { startTransition, useEffect, useState } from 'react';
import styled from 'styled-components';
import getAirQualityLiveInfo from './api/weatherAPI/getAirQualityLiveInfo';
import getShortTermWeatherForecast from './api/weatherAPI/getShortTermWeatherForecast';
import getUltraShortTermWeatherLive from './api/weatherAPI/getUltraShortTermWeatherLive';
import './App.css';
import CurrentWeather from './components/currentWeather/CurrentWeather';
import CheckShortTermWeatherList from './components/CheckShortTermWeatherList';
import CheckUltraShortTermWeatherList from './components/CheckUltraShortTermWeatherList';
import useGetGradeStatus from './hooks/useGetGradeStatus';
import { AirQualityValue, AirQualityData, ShortTermWeatherDataItem, ultraShortTermWeatherDataItem } from './types/weather';
import AirQualityStatus from './components/airQuality/AirQualityStatus';
import ShortTermWeatherList from './components/shortTermWeather/ShortTermWeatherList';
import AirQuailtyList from './components/airQuality/AirQualityList';

const CheckDataSection = styled.section`
  margin: 0 auto;
  display: grid;
  grid: 1fr / 200px 150px 1200px;
  gap: 80px;
  justify-content: center;
  .wrapper {
    padding: 12px;
  }
`;

const airQualityLiveInfo = getAirQualityLiveInfo();
const ultraShortTermWeatherLive = getUltraShortTermWeatherLive();
const shortTermWeatherForecast = getShortTermWeatherForecast();

function App() {

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
  const [ultraShortTermWeatherData, setUltraShortTermWeatherData] = useState<ultraShortTermWeatherDataItem[]>([]);
  const [shortTermWeatherData, setShortTermWeatherData] = useState<ShortTermWeatherDataItem[]>([]);


  const [airDetailGrade, setAirDetailGrade] = useState({
    "pm25Grade1h": "0", // 미세먼지(PM2.5) 1시간 등급
    "pm10Grade1h": "0", // 미세먼지(PM10) 1시간 등급
    "o3Grade": "0", // 오존 지수
    "so2Grade": "0", // 아황산가스 지수
    "no2Grade": "0", // 이산화질소 지수
    "coGrade": "0", // 일산화탄소 지수
  });
  const detailGradeState = useGetGradeStatus([
    airDetailGrade.pm25Grade1h,
    airDetailGrade.pm10Grade1h,
    airDetailGrade.o3Grade,
    airDetailGrade.so2Grade,
    airDetailGrade.no2Grade,
    airDetailGrade.coGrade
  ]);
  const [airQualityValue, setAirQualityValue] = useState<AirQualityValue>({
    "pm25Value": "0", // 미세먼지(PM2.5) 농도 ㎍/㎥
    "pm25Value24": "-",// 미세먼지(PM2.5) 24시간예측이동농도
    "pm10Value24": "-", // 미세먼지(PM10) 24시간예측이동농도
    "pm10Value": "0", // 미세먼지(PM10) 농도 ㎍/㎥
    "o3Value": "0", // 오존 농도 ppm
    "so2Value": "0", // 아황산가스 농도 ppm
    "no2Value": "0", // 이산화질소 농도 ppm
    "coValue": "0", // 일산화탄소 농도 ppm
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

  useEffect(() => {
    const { pm25Grade1h, pm10Grade1h, o3Grade, so2Grade, no2Grade, coGrade, pm25Value, pm25Value24, pm10Value24, pm10Value, o3Value, so2Value, no2Value, coValue } = airQualityData;
    
    setAirDetailGrade({ 
      pm25Grade1h: pm25Grade1h || "0",
      pm10Grade1h: pm10Grade1h || "0",
      o3Grade: o3Grade || "0",
      so2Grade: so2Grade || "0",
      no2Grade: no2Grade || "0",
      coGrade: coGrade || "0"
    });
    setAirQualityValue({
      pm25Value: pm25Value || "0",
      pm25Value24: pm25Value24 || "-",
      pm10Value24: pm10Value24 || "-",
      pm10Value: pm10Value || "0",
      o3Value: o3Value || "0",
      so2Value: so2Value || "0",
      no2Value: no2Value || "0",
      coValue: coValue || "0",
    });
  },[airQualityData])


  return (
    <div className="App">
      <h1 style={{textAlign: "center"}}>날씨정보</h1>
      <CurrentWeather ultraShortTermWeatherData={ultraShortTermWeatherData} />
      <ShortTermWeatherList shortTermWeatherData={shortTermWeatherData} />
      <AirQualityStatus lotate={airQualityData.stationName} totalGrade={airQualityData.khaiGrade} detailGrade={airDetailGrade} detailGradeState={detailGradeState} dateTime={airQualityData.dataTime}/>
      <AirQuailtyList mangName={airQualityData.mangName} airQualityValue={airQualityValue} detailGradeState={detailGradeState} />
      {/* <CheckDataSection>
        <div className="wrapper">
          <h2>실시간 대기 정보</h2>
          측정시간 : {airQualityData.dataTime} <br />
          측정소명(코드) : {airQualityData.stationName} ({airQualityData.stationCode}) <br />
          측정망 정보 : {airQualityData.mangName} <br />
          
          <br />
          통합대기환경수치 : {airQualityData.khaiValue} <br />
          통합대기환경지수 : {airQualityData.khaiGrade} <br />
          
          <br />
          초미세먼지(PM<sub>2.5</sub>) <br />
          농도 : {airQualityData.pm25Value}㎍/㎥ <br />
          1시간 등급 : {airQualityData.pm25Grade1h} <br />
          24시간예측이동농도 : {airQualityData.pm25Value24} <br />
          
          <br />
          미세먼지(PM10) <br />
          농도 : {airQualityData.pm10Value}㎍/㎥ <br />
          1시간 등급 : {airQualityData.pm10Grade1h} <br />
          24시간예측이동농도 : {airQualityData.pm10Value24} <br />
          24시간 등급 : {airQualityData.pm10Grade} <br />

          <br />
          오존 <br />
          농도 : {airQualityData.o3Value}ppm <br />
          지수 : {airQualityData.o3Grade} <br />
          
          <br />
          아황산가스 <br />
          농도 : {airQualityData.so2Value}ppm <br />
          지수 : {airQualityData.so2Grade} <br />
          
          <br />
          이산화질소 <br />
          농도 : {airQualityData.no2Value}ppm <br />
          지수 : {airQualityData.no2Grade} <br />
          
          <br />
          일산화탄소 <br />
          농도 : {airQualityData.coValue}ppm <br />
          지수 : {airQualityData.coGrade} <br />
        </div>
        <div className="wrapper">
          <h2>현재 날씨 정보</h2>
          <CheckUltraShortTermWeatherList ultraShortTermWeatherData={ultraShortTermWeatherData} />
        </div>
        <div className="wrapper">
          <h2>단기 예보</h2>
          <CheckShortTermWeatherList shortTermWeatherData={shortTermWeatherData} />
        </div>
      </CheckDataSection> */}
    </div>
  );
};

export default App;
