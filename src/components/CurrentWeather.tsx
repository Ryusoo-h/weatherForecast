import { useEffect, useState } from "react";
import { ultraShortTermWeatherDataItem, WeatherDetailData } from "../types/weather";
import { CurrentWeatherSection, CurrentWeatherWrapper, Title, CurrentWeatherDetailList, CurrentWeatherStatus } from "./CurrentWeather.style";
import CurrentWeatherDetail from "./CurrentWeatherDetail";

type UltraShortTermWeatherListProps = {
    ultraShortTermWeatherData: ultraShortTermWeatherDataItem[];
}

type WeatherDetailDataList = {
    temperature: WeatherDetailData;
    humidity: WeatherDetailData;
    wind: WeatherDetailData;
}

type Category = { [CategoryName: string]: [string, string]; };

const CurrentWeather = ({ultraShortTermWeatherData}:UltraShortTermWeatherListProps) => {
    const [firstData, setFirstData] = useState<ultraShortTermWeatherDataItem>({
        baseDate: "00000000",
        baseTime: "0000",
        category: "",
        obsrValue: ""
    });
    const [data, setData] = useState<Category>({
        "기온": ["", ""],
        "1시간 강수량": ["", ""],
        "동서바람성분": ["", ""],
        "남북바람성분": ["", ""],
        "습도": ["", ""],
        "강수형태": ["0", ""],
        "풍향": ["", ""],
        "풍속": ["", ""]
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
            setFirstData(ultraShortTermWeatherData[0]);
            const getNewData = (ultraShortTermWeatherData:ultraShortTermWeatherDataItem[]) => {
                const newDataArray = ultraShortTermWeatherData.flatMap((item:ultraShortTermWeatherDataItem) => {
                    let categoryName = "";
                    let value = item.obsrValue;
                    let unit = "";
                    switch (item.category) {
                        case "T1H":
                            categoryName = "기온";
                            unit = "℃";
                            break;
                        case "RN1":
                            categoryName = "1시간 강수량";
                            unit = "mm";
                            break;
                        case "UUU":
                            categoryName = "동서바람성분";
                            unit = "m/s";
                            break;
                        case "VVV":
                            categoryName = "남북바람성분";
                            unit = "m/s";
                            break;
                        case "REH":
                            categoryName = "습도";
                            unit = "%";
                            break;
                        case "PTY":
                            categoryName = "강수형태";
                            unit = "";
                            break;
                        case "VEC":
                            categoryName = "풍향";
                            unit = "deg";
                            break;
                        case "WSD":
                            categoryName = "풍속";
                            unit = "m/s";
                            break;
                        default:
                            categoryName = "";
                            unit = "";
                            console.log("✅잘못된 값입니다");
                    }
                    if (item.category === "PTY") {
                        switch (item.obsrValue) {
                            case "0":
                                value = "맑음";
                                setWeatherStatus("1");
                                break;
                            case "1":
                                value = "비";
                                setWeatherStatus("7");
                                break;
                            case "2":
                                value = "비/눈";
                                setWeatherStatus("8");
                                break;
                            case "3":
                                value = "눈";
                                setWeatherStatus("9");
                                break;
                            case "4":
                                value = "소나기";
                                setWeatherStatus("11");
                                break;
                            case "5":
                                value = "빗방울";
                                setWeatherStatus("13");
                                break;
                            case "6":
                                value = "빗방울눈날림";
                                setWeatherStatus("15");
                                break;
                            case "7":
                                value = "눈날림";
                                setWeatherStatus("17");
                                break;
                            default:
                                value = "";
                                console.log("✅잘못된 값입니다");
                        };
                    }
                    return [categoryName, value, unit]
                });
                let newData:Category = {};
                for (let i = 0; i < newDataArray.length; i += 3) {
                    newData[newDataArray[i]] = [newDataArray[i+1], newDataArray[i+2]];
                };
                return newData;
            };
            const newData = getNewData(ultraShortTermWeatherData);
            setData(newData);
            setWeatherDetailData({
                temperature: {
                    category: "온도",
                    value: newData["기온"][0],
                    unit: newData["기온"][1],
                    info: [],
                    icon: "1",
                },
                humidity: {
                    category: "습도",
                    value: newData["습도"][0],
                    unit: newData["습도"][1],
                    info: [],
                    icon: "1",
                },
                wind: {
                    category: "바람",
                    value: [newData["풍속"][0], newData["풍향"][0]],
                    unit: newData["풍속"][1],
                    info: [],
                    icon: "",
                }
            });
            if (newData["강수형태"][1] === "맑음") {
                // TODO : 3일 단기예보 들고오면 하늘 상태에 따라 바꾸자!(맑음/구름많음/흐림)
                // setWeatherStatus("1");
            }
        };
    },[ultraShortTermWeatherData]);
    
    useEffect(() => {
        const changeDayOrNightIcon = (hour:number) => {
                // TODO : 시간에 따라 밤낮 아이콘으로 바꿈
                const time = hour;
                if (time >= 18 || time < 6) {
                    switch (weatherStatus) { 
                        case "1":
                        case "3":
                        case "11":
                        case "13":
                        case "15":
                        case "17":
                        // 밤낮 아이콘이 따로있는것중 밤 아이콘을 표시할 경우
                        setWeatherStatus(String(Number(weatherStatus) + 1));
                        break;
                    default:
                        break;
                    }
                }
        };
        if (ultraShortTermWeatherData.length > 0) {
            changeDayOrNightIcon(Number(ultraShortTermWeatherData[0].baseDate.slice(0,2)));
        
        }
    }, [ultraShortTermWeatherData, weatherStatus]);

    useEffect(() => {
        if (ultraShortTermWeatherData.length > 0) {
            const newWeatherDetail = weatherDetailData;

            const temperature = Number(weatherDetailData.temperature.value);
            const humidity = Number(weatherDetailData.humidity.value);
            const wind = Number(weatherDetailData.wind.value[0]);

            if (temperature < 5) {
                newWeatherDetail.temperature.info = ["패딩, 내복", "목도리"];
                newWeatherDetail.temperature.icon = "1";
            } else if (temperature < 12) {
                newWeatherDetail.temperature.info = ["코트, 기모", "여러겹"];
                newWeatherDetail.temperature.icon = "2";
            } else if (temperature < 20) {
                newWeatherDetail.temperature.info = ["얇은 니트", "가디건"];
                newWeatherDetail.temperature.icon = "3";
            } else if (temperature >= 20) {
                newWeatherDetail.temperature.info = ["얇은 옷", "반팔, 반바지"];
                newWeatherDetail.temperature.icon = "4";
            } else {
                newWeatherDetail.temperature.info = [""];
                newWeatherDetail.temperature.icon = "1";
            };

            if (humidity < 30) {
                newWeatherDetail.humidity.info = ["건조함"];
                newWeatherDetail.humidity.icon = "1";
            } else if (humidity < 40) {
                newWeatherDetail.humidity.info = ["보통"];
                newWeatherDetail.humidity.icon = "2";
            } else if (humidity < 60) {
                newWeatherDetail.humidity.info = ["쾌적함"];
                newWeatherDetail.humidity.icon = "3";
            } else if (humidity < 70) {
                newWeatherDetail.humidity.info = ["보통"];
                newWeatherDetail.humidity.icon = "4";
            } else if (humidity >= 70) {
                newWeatherDetail.humidity.info = ["습함"];
                newWeatherDetail.humidity.icon = "5";
            } else if (humidity >= 100) {
                newWeatherDetail.humidity.info = ["습함"];
                newWeatherDetail.humidity.icon = "6"; 
            } else {
                newWeatherDetail.humidity.info = [""];
                newWeatherDetail.humidity.icon = "6";
            };

            if (wind < 4) {
                newWeatherDetail.wind.info = ["약함"];
            } else if (wind < 9) {
                newWeatherDetail.wind.info = ["약간 강함"];
            } else if (wind < 14) {
                newWeatherDetail.wind.info = ["강함"];
            } else if (wind >= 14) {
                newWeatherDetail.wind.info = ["매우 강함"];
            } else {
                newWeatherDetail.wind.info = [""];
            };
            setWeatherDetailData(newWeatherDetail);
        }

    }, [weatherDetailData]);

    return(
        <CurrentWeatherSection>
            {ultraShortTermWeatherData.length === 0 ?  (
                <>
                    <CurrentWeatherWrapper>
                        <Title>
                            <h2>현재 날씨 정보</h2>
                        </Title>
                        <div>날씨정보를 가져올 수 없습니다😥</div>
                    </CurrentWeatherWrapper>
                </>
            ) : (
                <>
                    <CurrentWeatherWrapper>
                        <Title>
                            현재 날씨 정보
                            <span><br />{`${firstData.baseDate.slice(0,4)}년 ${firstData.baseDate.slice(4,6)}월 ${firstData.baseDate.slice(6,8)}일 ${firstData.baseTime.slice(0,2)}:${firstData.baseTime.slice(2,4)}`}</span>
                        </Title>
                        <CurrentWeatherStatus onClick={() => {setHiddenDetailAll(!hiddenDetailAll); }}>
                            <img className={`icon ${!hiddenDetailAll && 'blur'}`} src={`${process.env.PUBLIC_URL}/image/icon-weather/weather${weatherStatus}.svg`} alt="logo" />
                            <span className={`${!hiddenDetailAll && 'blur'}`}>{data["강수형태"][0]}</span>
                            <ul className={`detail-all ${hiddenDetailAll && 'hidden'}`} >
                                <li>{`기온 : ${data["기온"][0]}${data["기온"][1]}`}</li>
                                <li>{`강수형태 : ${data["강수형태"][0]}${data["강수형태"][1]}`}</li>
                                <li>{`1시간 강수량 : ${data["1시간 강수량"][0]}${data["1시간 강수량"][1]}`}</li>
                                <li>{`습도 : ${data["습도"][0]}${data["습도"][1]}`}</li>
                                <li>{`풍향 : ${data["풍향"][0]}${data["풍향"][1]}`}</li>
                                <li>{`풍속 : ${data["풍속"][0]}${data["풍속"][1]}`}</li>
                                <li>{`동서바람성분 : ${data["동서바람성분"][0]}${data["동서바람성분"][1]}`}</li>
                                <li>{`남북바람성분 : ${data["남북바람성분"][0]}${data["남북바람성분"][1]}`}</li>
                            </ul>
                        </CurrentWeatherStatus>
                        <CurrentWeatherDetailList>
                            <CurrentWeatherDetail categoryName="temperature" data={weatherDetailData.temperature}/>
                            <CurrentWeatherDetail categoryName="humidity" data={weatherDetailData.humidity}/>
                            <CurrentWeatherDetail categoryName="wind" data={weatherDetailData.wind}/>
                        </CurrentWeatherDetailList>
                    </CurrentWeatherWrapper>
                </>
            )}
        </CurrentWeatherSection>
    );
};

export default CurrentWeather;