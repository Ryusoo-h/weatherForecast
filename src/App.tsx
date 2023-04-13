
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import getAirQualityLiveInfo from './api/weatherAPI/getAirQualityLiveInfo';
import getShortTermWeatherForecast from './api/weatherAPI/getShortTermWeatherForecast';
import getUltraShortTermWeatherLive from './api/weatherAPI/getUltraShortTermWeatherLive';
import './App.css';
import CurrentWeather from './components/CurrentWeather';
import ShortTermWeatherList from './components/ShortTermWeatherList';
import TotalStatus from './components/TotalStatus';
import UltraShortTermWeatherList from './components/UltraShortTermWeatherList';
import useGetGradeStatus from './hooks/useGetGradeStatus';
import { AirQualityData, ShortTermWeatherDataItem, ultraShortTermWeatherDataItem } from './types/weather';

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

const Footer = styled.footer`
  text-align: left;
  background-color: #f8f8f8;
  padding: 20px 0;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  h1 {
    color: #5f63ff;
  }
  ul {
    text-align: left;
    margin: 20px 0;
  }
  ul ul {
    margin: 0 0 10px;
  }
`;

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

    // 이 아래는 사용 안함
    "khaiValue": "0", // 통합대기환경수치
    "pm25Grade": "0",
    "pm25Value24": "-",
    "pm25Flag": "0", // 미세먼지(PM2.5) 플래그..
    "pm10Value24": "0", // 미세먼지(PM10) 24시간예측이동농도
    "pm10Grade": "0", // 미세먼지(PM10) 24시간 등급
    "pm10Flag": "0",
    "no2Flag": "0",
    "coFlag": "0",
    "o3Flag": "0",
    "so2Flag": "0",
  });
  const [ultraShortTermWeatherData, setUltraShortTermWeatherData] = useState<ultraShortTermWeatherDataItem[]>([]);
  const [shortTermWeatherData, setShortTermWeatherData] = useState<ShortTermWeatherDataItem[]>([]);


  const [detailGrade, setDetailGrade] = useState({
    "pm25Grade1h": "0", // 미세먼지(PM2.5) 1시간 등급
    "pm10Grade1h": "0", // 미세먼지(PM10) 1시간 등급
    "o3Grade": "0", // 오존 지수
    "so2Grade": "0", // 아황산가스 지수
    "no2Grade": "0", // 이산화질소 지수
    "coGrade": "0", // 일산화탄소 지수
  });

  const getWeatherData = async() => {
    const airQualityLiveInfo = await getAirQualityLiveInfo();
    if (airQualityLiveInfo) {
      setAirQualityData(airQualityLiveInfo);
    }
    const ultraShortTermWeatherLive = await getUltraShortTermWeatherLive();
    if (ultraShortTermWeatherLive) {
      setUltraShortTermWeatherData(ultraShortTermWeatherLive);
    }
    const shortTermWeatherForecast = await getShortTermWeatherForecast();
    if (shortTermWeatherForecast) {
      setShortTermWeatherData(shortTermWeatherForecast);
    }
  };
  useEffect(() => {
    getWeatherData();
  },[])

  useEffect(() => {
    const { pm25Grade1h, pm10Grade1h, o3Grade, so2Grade, no2Grade, coGrade } = airQualityData;
    setDetailGrade({ 
      pm25Grade1h: pm25Grade1h || "0",
      pm10Grade1h: pm10Grade1h || "0",
      o3Grade: o3Grade || "0",
      so2Grade: so2Grade || "0",
      no2Grade: no2Grade || "0",
      coGrade: coGrade || "0"
    });
  },[airQualityData])

  const detailGradeState = useGetGradeStatus([
    detailGrade.pm25Grade1h,
    detailGrade.pm10Grade1h,
    detailGrade.o3Grade,
    detailGrade.so2Grade,
    detailGrade.no2Grade,
    detailGrade.coGrade
  ]);

  return (
    <div className="App">
      <h1 style={{textAlign: "center"}}>날씨정보</h1>
      <CurrentWeather ultraShortTermWeatherData={ultraShortTermWeatherData} />
      <TotalStatus totalGrade={airQualityData.khaiGrade} detailGrade={detailGrade} detailGradeState={detailGradeState} dateTime={airQualityData.dataTime}/>
      
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
          <UltraShortTermWeatherList ultraShortTermWeatherData={ultraShortTermWeatherData} />
        </div>
        <div className="wrapper">
          <h2>단기 예보</h2>
          <ShortTermWeatherList shortTermWeatherData={shortTermWeatherData} />
        </div>
      </CheckDataSection> */}
      <Footer>
        <h1>스터디 : API연습<br />기상정보 받아오기!</h1>
        <section className='theory-memo'>
          <h2>개념채우기</h2>
          <ul>
            <li><b>SOP</b>
              <ul>
                <li>Same-origin policy, 동일 출처 정책</li>
              </ul>
            </li>
            <li><b>CORS</b>
              <ul>
                <li>Cross-Origin Resource Sharing, 교차 출처 리소스 공유</li>
                <li>서버와 클라이언트가 서로 설정이되어있어야함!</li>
                <li>하지만 서버-서버 간에는 CORS가 딱히 없다! .'. 프록시 서버를..!</li>
                <li>.'. 서버를 만들어서 공공 API로 요청을 보내고 받아서 → 클라이언트로 보내줌</li>
                <li>공공 API는 서버끼리 되도록 열어두는 경우가 많다..</li>
              </ul>
            </li>
            <li><b>프록시 서버</b>
              <ul>
                <li>종류1(온전한 프록시 서버): 요청하고 요청한것을 가공없이 그대로 준다</li>
                <li>종류2 : 요청한것을 가공하여 주는 것 (엄격한 기준에 의하면 이 경우 프록시 서버가 아니라고 할 수도 있다)</li>
              </ul>
            </li>
            <li>참고
              <ul>
                <li><a href="https://velog.io/@jesop/SOP%EC%99%80-CORS" target="_blink">SOP와 CORS</a></li>
              </ul>
            </li>
          </ul>
        </section>
        <section className='reference-memo'>
          <h2>자료 참고</h2>
          <ul>
            <li><a href="https://www.data.go.kr/data/15084084/openapi.do" target="_blink">오픈API 상세 : 기상청_단기예보 ((구)_동네예보) 조회서비스</a></li>
            <li><a href="https://www.data.go.kr/data/15059468/openapi.do" target="_blink">오픈API 상세 : 기상청_중기예보 조회서비스</a></li>
            <li><a href="https://cleanair.seoul.go.kr/information/info11#emergency-response" target="_blink">대기환경정보 참고</a></li>
          </ul>
        </section>
      </Footer>
    </div>
  );
};

export default App;
