
import useDateTimeFormatter, { dateTimeFormat } from "../../hooks/useDateTimeFormatter";
// import useGetGradeStatus from "../../hooks/useGetGradeStatus";
import { AirQualityNameAndGrade, AirQualityGradeNumber } from "../../types/airQuailty";
import { gradeColorClassName } from "../../util/airQuailty";
import { AirQualityStatusDotWrapper, AirQualityStatusSection, AirQualityStatusWrapper } from "./AirQualityStatus.style";

type TotalStatusProps = {
    station: string;
    dateTime: string;
    airQualityNameAndGrade: AirQualityNameAndGrade;
}

const AirQualityStatus = ({station, dateTime, airQualityNameAndGrade}:TotalStatusProps) => {
     // airQuailtyKeys 순서대로 출력함, 출력하고 싶지않다면 airQuailtyKeys에서 key를 제거하면 됨
    const airQuailtyDetailKeys = ["pm25Grade1h", "pm10Grade1h", "o3Grade", "so2Grade", "no2Grade", "coGrade"];
    const airQualityDateTime:dateTimeFormat = useDateTimeFormatter(dateTime);

    return (
        <AirQualityStatusSection id="air-quailty-status" className={gradeColorClassName[airQualityNameAndGrade["khaiGrade"].gradeNum as AirQualityGradeNumber || "0"].main}>
            <p className="date-and-location">
                <span className="location">{station ? station : "측정소 정보 없음"}</span>
                <span className="date">{airQualityDateTime.year}년 {airQualityDateTime.month}월 {airQualityDateTime.day}일 {airQualityDateTime.hour}:{airQualityDateTime.minute} 기준</span>
            </p>
            <AirQualityStatusWrapper className={gradeColorClassName[airQualityNameAndGrade["khaiGrade"].gradeNum as AirQualityGradeNumber || "0"].totalStatus}>
                <p className="status">
                    <span className="status-title">{airQualityNameAndGrade["khaiGrade"].name}</span>
                    <span className="status-grade">{airQualityNameAndGrade["khaiGrade"].grade}</span>
                </p>
                <AirQualityStatusDotWrapper>
                    <ul>
                        {airQuailtyDetailKeys.map(key => {
                            return <li key={key} className={gradeColorClassName[airQualityNameAndGrade[key].gradeNum as AirQualityGradeNumber].detailStatus}><span>{airQualityNameAndGrade[key].name} : {airQualityNameAndGrade[key].grade}</span></li>
                        })}
                    </ul>
                </AirQualityStatusDotWrapper>
            </AirQualityStatusWrapper>
        </AirQualityStatusSection>
    );
};

export default AirQualityStatus;