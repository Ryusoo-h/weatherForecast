import { useEffect, useRef, useState } from "react";
import useGetGradeStatus from "../hooks/useGetGradeStatus";
import { DetailStatusDotWrapper, TotalStatusSection, TotalStatusWrapper } from "./AirQualityStatus.style";

type TotalGradeType = "1" | "2" | "3" | "4" | "0";
type detailGradeType = "1" | "2" | "3" | "4" | "0";
type TotalStatusProps = {
    lotate: string;
    totalGrade: string;
    detailGrade: {
        "pm25Grade1h": string; // 미세먼지(PM2.5) 1시간 등급
        "pm10Grade1h": string; // 미세먼지(PM10) 1시간 등급
        "o3Grade": string; // 오존 지수
        "so2Grade": string; // 아황산가스 지수
        "no2Grade": string; // 이산화질소 지수
        "coGrade": string; // 일산화탄소 지수
    };
    detailGradeState: string[];
    dateTime: string;
}

const AirQualityStatus = ({lotate, totalGrade, detailGrade, detailGradeState, dateTime}:TotalStatusProps) => {
    const gradeColorClassName = useRef({
        "1" : { // 좋음
            main: "status-good-gradation",
            totalStatus: "status-good-gradation-darker",
            detailStatus: "status-good",
        },
        "2" : { // 보통
            main: "status-normal-gradation",
            totalStatus: "status-normal-gradation-darker",
            detailStatus: "status-normal",
        },
        "3" : { // 나쁨
            main: "status-bad-gradation",
            totalStatus: "status-bad-gradation-darker",
            detailStatus: "status-bad",
        },
        "4" : { // 매우 나쁨
            main: "status-very-bad-gradation",
            totalStatus: "status-very-bad-gradation-darker",
            detailStatus: "status-very-bad",
        },
        "0" : { // 값이 없을때 : 보통
            main: "status-normal-gradation",
            totalStatus: "status-normal-gradation-darker",
            detailStatus: "status-normal",
        }
    });
    
    const [totalGradeStatus] = useGetGradeStatus([totalGrade]);
    const [{year, month, day, hour, minute}, setNewDateTime] = useState({
        year: "yyyy", 
        month: "mm", 
        day: "dd", 
        hour: "hh", 
        minute: "mm",
    });
    useEffect(() => {
        const dateTimeData = dateTime ? dateTime : "0000-00-00 00:00";
        const [datePart, timePart] = dateTimeData.split(" ");
        const [year, month, day] = datePart.split("-");
        const [hour, minute] = timePart.split(":");
        setNewDateTime({year, month, day, hour, minute});
    },[dateTime]);

    return (
        <TotalStatusSection className={gradeColorClassName.current[totalGrade as TotalGradeType || 0].main}>
            <p className="date-and-location">
                <span className="location">{lotate ? lotate : "측정소 정보 없음"}</span>
                <span className="date">{year}년 {month}월 {day}일 {hour}:{minute} 기준</span>
            </p>
            <TotalStatusWrapper className={gradeColorClassName.current[totalGrade as TotalGradeType || 0].totalStatus}>
                <p className="status">
                    <span className="status-title">통합대기환경수치</span>
                    <span className="status-grade">{totalGradeStatus}</span>
                </p>
                <DetailStatusDotWrapper>
                    <ul>
                        <li className={gradeColorClassName.current[detailGrade.pm25Grade1h as detailGradeType].detailStatus}><span>초미세먼지 : {detailGradeState[0]}</span></li>
                        <li className={gradeColorClassName.current[detailGrade.pm10Grade1h as detailGradeType].detailStatus}><span>미세먼지 : {detailGradeState[1]}</span></li>
                        <li className={gradeColorClassName.current[detailGrade.o3Grade as detailGradeType].detailStatus}><span>오존 : {detailGradeState[2]}</span></li>
                        <li className={gradeColorClassName.current[detailGrade.so2Grade as detailGradeType].detailStatus}><span>아황산가스 : {detailGradeState[3]}</span></li>
                        <li className={gradeColorClassName.current[detailGrade.no2Grade as detailGradeType].detailStatus}><span>이산화질소 : {detailGradeState[4]}</span></li>
                        <li className={gradeColorClassName.current[detailGrade.coGrade as detailGradeType].detailStatus}><span>일산화탄소 : {detailGradeState[5]}</span></li>
                    </ul>
                </DetailStatusDotWrapper>
            </TotalStatusWrapper>
        </TotalStatusSection>
    );
};

export default AirQualityStatus;