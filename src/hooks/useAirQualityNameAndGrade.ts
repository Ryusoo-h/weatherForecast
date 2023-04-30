import { useEffect, useRef } from "react";
import { AirQualityData, AirQualityNameAndGrade } from "../types/airQuailty";
import { airQualityGradeStatus } from "../util/airQuailty";

const useAirQualityNameAndGrade = (airQualityData:AirQualityData):AirQualityNameAndGrade => {
    const airQualityGrade = useRef<AirQualityNameAndGrade>({
        "khaiGrade": {
            name: "통합대기환경",
            gradeNum: "0",
            grade: "정보없음",
        }, // 통합대기환경 등급
        "pm25Grade1h": {
            name: "초미세먼지",
            gradeNum: "0",
            grade: "정보없음",
        }, // 미세먼지(PM2.5) 1시간 등급
        "pm10Grade1h": {
            name: "미세먼지",
            gradeNum: "0",
            grade: "정보없음",
        }, // 미세먼지(PM10) 1시간 등급
        "o3Grade": {
            name: "오존",
            gradeNum: "0",
            grade: "정보없음",
        }, // 오존 등급
        "so2Grade": {
            name: "아황산가스",
            gradeNum: "0",
            grade: "정보없음",
        }, // 아황산가스 등급
        "no2Grade": {
            name: "이산화질소",
            gradeNum: "0",
            grade: "정보없음",
        }, // 이산화질소 등급
        "coGrade": {
            name: "일산화탄소",
            gradeNum: "0",
            grade: "정보없음",
        }, // 일산화탄소 등급
    });

    useEffect(() => {
        const newAirQualityGrade:AirQualityNameAndGrade = airQualityGrade.current;
        const airDetailKeys = Object.keys(newAirQualityGrade);

        const getAirQualityGrade = (grade :string):string => {
            let newGrade:string = airQualityGradeStatus.get(grade) || "정보없음";
            return newGrade;
        }

        airDetailKeys.forEach((key) => {
            newAirQualityGrade[key].gradeNum = airQualityData[key] || "0";
            newAirQualityGrade[key].grade = getAirQualityGrade(airQualityData[key] || "0");
        });
        airQualityGrade.current = newAirQualityGrade;
    }, [airQualityData]);
    
    return airQualityGrade.current;
};

export default useAirQualityNameAndGrade;