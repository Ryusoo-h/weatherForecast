import { useRef } from "react";
import { AirQualityNameAndGrade, AirQualityValue } from "../../types/airQuailty";
import AirQualityDetail from "./AirQualityDetail";
import { AirQualityListSection } from "./AirQualityList.style";

type AirQuailtyListProps = {
    mangName: string;
    airQualityValue: AirQualityValue;
    airQualityNameAndGrade: AirQualityNameAndGrade;
}

const AirQualityList = ({mangName, airQualityValue, airQualityNameAndGrade}:AirQuailtyListProps) => {
    const airQualityListKeys = useRef([
        // 이름, [예보등급 이하], 등급, 농도, 24시간예측이동농도
        ["pm25Grade1h", "초미세먼지/(PM2.5)", [15, 35, 75], "㎍/㎥", 0, "pm25Value", "pm25Value24"],
        ["pm10Grade1h", "미세먼지/(PM10)", [30, 80, 150], "㎍/㎥", 1, "pm10Value", "pm10Value24"],
        ["o3Grade", "오존", [0.030, 0.090, 0.150], "ppm", 2, "o3Value"],
        ["so2Grade", "아황산가스", [0.15], "ppm", 3, "so2Value"],
        ["no2Grade", "이산화질소", [0.1], "ppm", 4, "no2Value"],
        ["coGrade", "일산화탄소", [25], "ppm", 5, "coValue"]
    ]);
    return (
        <AirQualityListSection>
            <div className="container">
                <span className="info-gray-text">측정망 정보 : {mangName}</span>
                <ul id="air-quality-list">
                    {airQualityListKeys.current.map((airQualityKeys) => {
                        const title = String(airQualityKeys[0]).split("/")[0];
                        return <AirQualityDetail key={title} airQualityKeys={airQualityKeys} airQualityValue={airQualityValue} airQualityNameAndGrade={airQualityNameAndGrade}/>
                    })}
                </ul>
            </div>
        </AirQualityListSection>
    );
};

export default AirQualityList;