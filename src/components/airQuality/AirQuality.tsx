import AirQualityStatus from "./AirQualityStatus";
import AirQualityList from "./AirQualityList";
import { useEffect, useState } from "react";
import { AirQualityData, AirQualityNameAndGrade, AirQualityValue } from "../../types/airQuailty";
import useAirQualityNameAndGrade from "../../hooks/useAirQualityNameAndGrade";

type AirQualityListProps = {
    airQualityData: AirQualityData;
}

const AirQuality = ({ airQualityData }:AirQualityListProps) => {
    const airQualityNameAndGrade:AirQualityNameAndGrade = useAirQualityNameAndGrade(airQualityData);

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
        const { pm25Value, pm25Value24, pm10Value24, pm10Value, o3Value, so2Value, no2Value, coValue } = airQualityData;

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
        <section>
            <AirQualityStatus station={airQualityData.stationName} dateTime={airQualityData.dataTime} airQualityNameAndGrade={airQualityNameAndGrade}/>
            <AirQualityList mangName={airQualityData.mangName} airQualityValue={airQualityValue} airQualityNameAndGrade={airQualityNameAndGrade} />
        </section>
    );
};

export default AirQuality;