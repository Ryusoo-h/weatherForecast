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

    // 이 아래는 사용 안함
    khaiValue: string | null; // 통합대기환경수치
    pm25Grade: string | null; // 미세먼지(PM10) 24시간 등급
    pm25Value24: string | null;
    pm25Flag: string | null;
    pm10Value24: string;
    pm10Grade: string;
    pm10Flag: string | null;
    no2Flag: string;
    coFlag: string | null;
    o3Flag: string | null;
    so2Flag: string | null;
};


export type ultraShortTermWeatherDataItem = {
    baseDate: string;
    baseTime: string;
    category: string;
    obsrValue: string;
}

export type ShortTermWeatherDataItem = {
    baseDate: string;
    baseTime: string;
    fcstDate: string;
    fcstTime: string;
    fcstValue: string;
    category: string;
}