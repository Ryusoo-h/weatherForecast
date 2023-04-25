export type AirQualityData = {
    dataTime: string;
    mangName: string; // 측정망 정보
    stationName: string; // 측정소명 // 변경가능. 이 위치에 따른 정보를 가져옴
    stationCode: string; // 측정소 코드

    khaiGrade: string; // 통합대기환경지수

    pm25Value: string | null; // 미세먼지(PM2.5) 농도 ㎍/㎥
    pm25Grade1h: string | null; // 미세먼지(PM2.5) 1시간 등급

    pm10Value: string; // 미세먼지(PM10) 농도 ㎍/㎥
    pm10Grade1h: string; // 미세먼지(PM10) 1시간 등급자료

    o3Value: string; // 오존 농도 ppm
    o3Grade: string; // 오존 지수

    so2Value: string; // 아황산가스 농도 ppm
    so2Grade: string; // 아황산가스 지수

    no2Value: string; // 이산화질소 농도 ppm
    no2Grade: string; // 이산화질소 지수

    coValue: string; // 일산화탄소 농도 ppm
    coGrade: string; // 일산화탄소 지수

    pm25Value24: string | null;// 미세먼지(PM2.5) 24시간예측이동농도
    pm10Value24: string;// 미세먼지(PM10) 24시간예측이동농도

    // 이 아래는 사용 안함
    khaiValue: string | null; // 통합대기환경수치
    pm25Grade: string | null; // 미세먼지(PM10) 24시간 등급
    pm25Flag: string | null; // 미세먼지(PM2.5) 플래그
    pm10Grade: string;
    pm10Flag: string | null;
    no2Flag: string;
    coFlag: string | null;
    o3Flag: string | null;
    so2Flag: string | null;
};

export type AirQualityValue = {
    pm25Value: string;
    pm25Value24: string;
    pm10Value24: string;
    pm10Value: string;
    o3Value: string;
    so2Value: string;
    no2Value: string;
    coValue: string;
    [key: string]: string; // 인덱스 시그니처 추가
}

export type ultraShortTermWeatherDataItem = {
    baseDate: string;
    baseTime: string;
    category: string;
    obsrValue: string;
}

export type WeatherDetailData = {
    category: string;
    value: string | string[]; 
    unit: string;
    info: string[];
    icon: string;
};

export type ShortTermWeatherDataItem = {
    baseDate: string;
    baseTime: string;
    fcstDate: string;
    fcstTime: string;
    fcstValue: string;
    category: string;
}