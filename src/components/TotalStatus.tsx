import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useGetGradeStatus from "../hooks/useGetGradeStatus";

const Main = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 24px;
    padding: 32px 0;
    color: #fff;
    text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12);
    text-align: center;
    .date-and-location {
        & > span {
            display: block;
        }
    }
    .location {
        margin-bottom: 6px;
    }
    .date {
        font-size: 24px;
        font-weight: bold;
    }
`;
const TotalStatusWrapper = styled.section`
    position: relative;
    width: 205px;
    height: 205px;
    border-radius: 110px;
    border: 1px solid rgba(255, 255, 255, 0.7);
    box-shadow: 0px 0px 40px #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .status {
        display: flex;
        flex-direction: column-reverse;
        gap: 12px;
        margin: 28px 0 20px;
    }
    .status-title {

    }
    .status-grade {
        font-size: 40px;
        font-weight: bold;
    }
`;

const DetailStatusDotWrapper = styled.section`
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        & > li {
            width: 16px;
            height: 16px;
            border: solid 2px #fff;
            border-radius: 8px;
            &::after {
                content: '';
                display: block;
                opacity: 0;
                width: 0px;
                height: 0px;
                border-top: 12px solid #fff;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                transform: translate(-2px, -18px);
                transition: all 0.2s ease-in-out;
            }
            &:hover::after {
                opacity: 1;
            }
            & + li {
                margin-left: 6px;
            }
            & > span {
                position: absolute;
                bottom: 60px;
                left: 50%;
                transform: translate(-50%);
                width: 140px;
                background-color: #fff;
                color: #333;
                text-shadow: none;
                padding: 4px;
                border-radius: 8px;
                transition: all 0.2s ease-in-out;
                opacity: 0;
            }
            &:hover > span {
                opacity: 1;
            }
        }
    }
`;

type TotalGradeType = "1" | "2" | "3" | "4" | "0";
type detailGradeType = "1" | "2" | "3" | "4" | "0";
type TotalStatusProps = {
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

const TotalStatus = ({totalGrade, detailGrade, detailGradeState, dateTime}:TotalStatusProps) => {
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
        const [datePart, timePart] = dateTime.split(" ");
        const [year, month, day] = datePart.split("-");
        const [hour, minute] = timePart.split(":");
        setNewDateTime({year, month, day, hour, minute});
    },[dateTime]);

    return (
        <Main className={gradeColorClassName.current[totalGrade as TotalGradeType].main}>
            <p className="date-and-location">
                <span className="location">신원동</span>
                <span className="date">{year}년 {month}월 {day}일 {hour}:{minute} 기준</span>
            </p>
            <TotalStatusWrapper className={gradeColorClassName.current[totalGrade as TotalGradeType].totalStatus}>
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
        </Main>
    );
};

export default TotalStatus;