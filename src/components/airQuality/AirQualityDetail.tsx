import React from "react";
import { useEffect, useState } from "react";
import { AirQualityNameAndGrade, AirQualityValue } from "../../types/airQuailty";
import { TitleList } from "./AirQualityDetail.style";

type AirQuailtyDetailProps = {
    airQualityKeys: (string | number | number[])[];
    airQualityValue: AirQualityValue;
    airQualityNameAndGrade: AirQualityNameAndGrade;
};

const getGradebarWidth = (keys:number[], wrapperWidth:number) => {
    const gradeStandard:number[] = keys;
    let gradeStandardbarWidth:number[] = gradeStandard.map((grade, index) => { // 각 바의 길이를 저장할것
        return index === 0 ? grade : grade - gradeStandard[index - 1];
    })
    gradeStandardbarWidth.push(gradeStandardbarWidth[0]); // 마지막 등급바는 첫 등급바랑 같은 길이로 한다

    const newGradeStandardTotalSum = gradeStandard[gradeStandard.length - 1] + gradeStandard[0]; // 전체 길이
    const leastWidth = wrapperWidth / newGradeStandardTotalSum; // 최소길이
    gradeStandardbarWidth = gradeStandardbarWidth.map((barWidth) => {
        return Math.round(barWidth * leastWidth);
    })
    return {gradeStandardbarWidth: gradeStandardbarWidth, leastWidth: leastWidth};
}
const AirQualityDetail = ({airQualityKeys, airQualityValue, airQualityNameAndGrade}:AirQuailtyDetailProps) => {
    const title = String(airQualityKeys[1]).split("/")[0];
    const unit = String(airQualityKeys[1]).split("/")[1];
    const [graphbarWrapperWidth, setGraphbarWrapperWidth] = useState<number>(0); // 전체 등급바 길이
    const [gradeStandardbarWidths, setGradeStandardbarWidths] = useState<number[]>([]); // 각 등급바 길이
    const [gradeStandardbarleastWidth, setGradeStandardbarleastWidth] = useState<number>(0); // 등급바 최소길이
    const [graphDotLocation, setGraphDotLocation] = useState<number>(0); // 등급점 위치
    const [graphDotColor, setGraphDotColor] = useState<string>("color0"); // 등급점 색상 class
    const graphBarWrapper = (element: HTMLDivElement) => {
        if (element) {
            setGraphbarWrapperWidth(element.clientWidth);
        }
    }
    
    // TODO
    // 화면 넓이에 따라 등급점 위치 다시 계산하기
    useEffect(() => {
        if (Array.isArray(airQualityKeys[2])) {
            const {gradeStandardbarWidth, leastWidth} = getGradebarWidth(airQualityKeys[2], graphbarWrapperWidth)
            setGradeStandardbarWidths(gradeStandardbarWidth);
            setGradeStandardbarleastWidth(leastWidth);
            const newGraphDotLocation = Number(airQualityValue[String(airQualityKeys[5])]) * leastWidth;
            setGraphDotLocation(newGraphDotLocation);   
        }
    }, [airQualityKeys, airQualityValue, graphbarWrapperWidth]);
    useEffect(() => {
        let barMaxWidth = 0;
        for(let i:number = 0; i < gradeStandardbarWidths.length; i++) {
            barMaxWidth = barMaxWidth + (gradeStandardbarWidths[i]);
            if (barMaxWidth > graphDotLocation) {
                if (i === 0) {
                    setGraphDotColor("color0");
                    break;
                } else {
                    setGraphDotColor(`color${gradeStandardbarWidths.length - i}`);
                    break;
                }
            }
        }
    }, [graphDotLocation, gradeStandardbarWidths]);

    return (
        <TitleList>
            <span className="title">
                {title}
                <span className="unit">{unit}</span>
            </span>
            <ul> 
                <li className="graph">
                    <div className="graph-bar-wrapper" ref={graphBarWrapper}>
                        <div className="graph-bar color0" style={{width: `${gradeStandardbarWidths[1]}px`}}><span>0</span></div>
                        {Array.isArray(airQualityKeys[2]) && airQualityKeys[2].map((gradeValue, index, array) => {
                            const key = "color" + String(array.length - index);
                            return <div key={key} className={`graph-bar ${key}`} style={{width: `${gradeStandardbarWidths[index + 1]}px`}}><span>{gradeValue}</span></div>
                        })}
                        <span className="unit">단위 : {airQualityKeys[3]}</span>
                    </div>
                    <div className={`dot ${graphDotColor}`} style={{transform: `translateX(${graphDotLocation}px)`}}></div>
                </li>
                {airQualityKeys[6] ? (
                    <li className="grade-and-value">
                        <ul>
                            <li>1시간 등급<br /><b>{airQualityNameAndGrade[String(airQualityKeys[0])].grade}</b></li>
                            <li>농도<br /><b>{airQualityValue[String(airQualityKeys[5])]}{airQualityKeys[3]}</b></li>
                            <li>24시간예측이동농도<br /><b>{airQualityValue[String(airQualityKeys[6])]}{airQualityKeys[3]}</b></li>
                        </ul>
                    </li>
                ) : (
                    <li className="grade-and-value">
                        <ul className="doubleList">
                            <li>1시간 등급<br /><b>{airQualityNameAndGrade[String(airQualityKeys[0])].grade}</b></li>
                            <li>농도<br /><b>{airQualityValue[String(airQualityKeys[5])]}{airQualityKeys[3]}</b></li>
                        </ul>
                    </li>
                )}
            </ul>
        </TitleList>
    );
};

export default React.memo(AirQualityDetail);