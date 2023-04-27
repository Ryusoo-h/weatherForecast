import { useEffect, useState } from "react";
import { ultraShortTermWeatherDataItem } from "../../types/weather";
import { changeDayOrNightIcon, humidityStatus, humidityValue, printCategoryStatusByValue, ptyStatus, ptyValue, temperatureStatus, temperatureValue, wsdStatus, wsdValue } from "../../util/weather";
import { CurrentWeatherSection, CurrentWeatherWrapper, Title, CurrentWeatherDetailList, CurrentWeatherStatus } from "./CurrentWeather.style";
import CurrentWeatherDetail from "./CurrentWeatherDetail";

type UltraShortTermWeatherListProps = {
    ultraShortTermWeatherData: ultraShortTermWeatherDataItem[];
}

type WeatherDetailDataList = {
    temperature: {
        category: string;
    value: string; 
    unit: string;
    info: string[];
        icon: string,
    },
    humidity: {
        category: string;
        value: string; 
        unit: string;
        info: string[];
        icon: string,
    },
    wind: {
        category: string;
        value: string | string[]; 
        unit: string;
        info: string[];
        icon: string,
    }
}

type Category = { [CategoryName: string]: [string, string]; };

const CurrentWeather = ({ultraShortTermWeatherData}:UltraShortTermWeatherListProps) => {
    const [latestData, setFirstData] = useState<ultraShortTermWeatherDataItem>({
        baseDate: "00000000",
        baseTime: "0000",
        category: "",
        obsrValue: ""
    });
    const [data, setData] = useState<Category>({
        T1H: ["", ""], // T1H : 기온
        RN1: ["", ""], // RN1 : 1시간 강수량
        UUU: ["", ""], // UUU : 동서바람성분
        VVV: ["", ""], // VVV : 남북바람성분
        REH: ["", ""], // REH : 습도
        PTY: ["없음", ""], // PTY : 강수형태
        VEC: ["", ""], // VEC : 풍향
        WSD: ["", ""] // WSD : 풍속
    });

    const [weatherStatus, setWeatherStatus] = useState<string>("1");
    const [weatherDetailData, setWeatherDetailData] = useState<WeatherDetailDataList>({
        temperature: {
            category: "온도",
            value: "0", 
            unit: "",
            info: [],
            icon: "1",
        },
        humidity: {
            category: "습도",
            value: "0", 
            unit: "",
            info: [],
            icon: "1",
        },
        wind: {
            category: "바람",
            value: "0", 
            unit: "",
            info: [],
            icon: "",
        }
    });

    const [hiddenDetailAll, setHiddenDetailAll] = useState<boolean>(true);
    useEffect(() => {
        if (ultraShortTermWeatherData.length > 0) {
            // 받아온 데이터(ultraShortTermWeatherData)를 data와 weatherDetailData에 update함
            setFirstData(ultraShortTermWeatherData[0]);
            const getNewData = (ultraShortTermWeatherData:ultraShortTermWeatherDataItem[]) => {
                let newDataObj:{[category:string]: [value:string, unit:string]} = {};
                ultraShortTermWeatherData.forEach((item:ultraShortTermWeatherDataItem) => {
                    let value = item.obsrValue;
                    
                    const categoryUnit = new Map([  ['T1H', '℃'],
                        ['RN1', 'mm'],
                        ['UUU', 'm/s'],
                        ['VVV', 'm/s'],
                        ['REH', '%'],
                        ['PTY', ''],
                        ['VEC', 'deg'],
                        ['WSD', 'm/s']
                    ]);
                    const unit = categoryUnit.get(item.category) || '';

                    if (item.category === "PTY") { // 강수 상태
                        const newValue = printCategoryStatusByValue(item.obsrValue, ptyValue, ptyStatus, false).split(',');
                        value = newValue[0] === "없음" ? "맑음" : newValue[0];
                        setWeatherStatus(newValue[1]);
                    }
                    newDataObj[item.category] = [value, unit];
                });
                // console.log(newDataObj);
                return newDataObj;
            };
            const newData = getNewData(ultraShortTermWeatherData);
            setData(newData);
            setWeatherDetailData({
                temperature: {
                    category: "온도",
                    value: newData.T1H[0],
                    unit: newData.T1H[1],
                    info: [],
                    icon: "1",
                },
                humidity: {
                    category: "습도",
                    value: newData.REH[0],
                    unit: newData.REH[1],
                    info: [],
                    icon: "1",
                },
                wind: {
                    category: "바람",
                    value: [newData.WSD[0], newData.VEC[0]],
                    unit: newData.WSD[1],
                    info: [],
                    icon: "",
                }
            });
        };
    },[ultraShortTermWeatherData]);
    
    useEffect(() => {
        if (ultraShortTermWeatherData.length > 0) {
            // 낮과 밤 시간에 따라 아이콘을 Update함
            changeDayOrNightIcon(Number(ultraShortTermWeatherData[0].baseTime.slice(0,2)), weatherStatus, setWeatherStatus);
        }
    }, [ultraShortTermWeatherData, weatherStatus]);

    useEffect(() => {
        if (ultraShortTermWeatherData.length > 0) {
            // 온도, 습도, 바람 값에 따라 상태와 아이콘이미지 num를 바꿔서 weatherDetailData에 Update함
            const newWeatherDetail = weatherDetailData;

            const temperature = weatherDetailData.temperature.value;
            const humidity = weatherDetailData.humidity.value;
            const wind = weatherDetailData.wind.value[0];

            const [newTemperatureInfo1, newTemperatureInfo2, newTemperatureIcon] = printCategoryStatusByValue(temperature, temperatureValue, temperatureStatus, false).split('/');
            newWeatherDetail.temperature.info = [newTemperatureInfo1, newTemperatureInfo2];
            newWeatherDetail.temperature.icon = newTemperatureIcon;

            const [newHumidityInfo, newHumidityIcon] = printCategoryStatusByValue(humidity, humidityValue, humidityStatus, false).split(',');
            newWeatherDetail.humidity.info = [newHumidityInfo];
            newWeatherDetail.humidity.icon = newHumidityIcon;

            newWeatherDetail.wind.info = [printCategoryStatusByValue(wind, wsdValue, wsdStatus, false)];

            setWeatherDetailData(newWeatherDetail);
        }
    }, [weatherDetailData]);

    return(
        <CurrentWeatherSection id="current-weather">
            <CurrentWeatherWrapper>
                <Title className="section-title">
                    현재 날씨 정보
                    {ultraShortTermWeatherData.length === 0 ? (
                        <>
                            <br />
                            <span className="alert">날씨정보를 가져올 수 없습니다😥</span>
                        </>
                    ):(
                        <>
                            <br />
                            <span>{`${latestData.baseDate.slice(0,4)}년 ${latestData.baseDate.slice(4,6)}월 ${latestData.baseDate.slice(6,8)}일 ${latestData.baseTime.slice(0,2)}:${latestData.baseTime.slice(2,4)}`} 발표</span>
                        </>
                    )}
                </Title>
                <CurrentWeatherStatus onClick={() => {setHiddenDetailAll(!hiddenDetailAll); }}>
                    <img className={`icon ${!hiddenDetailAll && 'blur'}`} src={`${process.env.PUBLIC_URL}/image/icon-weather/weather${weatherStatus}.svg`} alt="weather-icon" />
                    <span className={`${!hiddenDetailAll && 'blur'}`}>{data.PTY[0]}</span>
                    <ul className={`detail-all ${hiddenDetailAll && 'hidden'}`} >
                        <li>{`기온 : ${data.T1H[0]}${data.T1H[1]}`}</li>
                        <li>{`강수형태 : ${data.PTY[0]}${data.PTY[1]}`}</li>
                        <li>{`1시간 강수량 : ${data.RN1[0]}${data.RN1[1]}`}</li>
                        <li>{`습도 : ${data.REH[0]}${data.REH[1]}`}</li>
                        <li>{`풍향 : ${data.VEC[0]}${data.VEC[1]}`}</li>
                        <li>{`풍속 : ${data.WSD[0]}${data.WSD[1]}`}</li>
                        <li>{`동서바람성분 : ${data.UUU[0]}${data.UUU[1]}`}</li>
                        <li>{`남북바람성분 : ${data.VVV[0]}${data.VVV[1]}`}</li>
                    </ul>
                </CurrentWeatherStatus>
                <CurrentWeatherDetailList>
                    <CurrentWeatherDetail categoryName="temperature" data={weatherDetailData.temperature}/>
                    <CurrentWeatherDetail categoryName="humidity" data={weatherDetailData.humidity}/>
                    <CurrentWeatherDetail categoryName="wind" data={weatherDetailData.wind}/>
                </CurrentWeatherDetailList>
            </CurrentWeatherWrapper>
        </CurrentWeatherSection>
    );
};

export default CurrentWeather;