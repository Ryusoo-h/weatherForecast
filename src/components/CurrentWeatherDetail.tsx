import { WeatherDetailData } from "../types/weather";
import { WeatherDetail } from "./CurrentWeatherDetail.style";

type CurrentWeatherDetailType = {
    categoryName: string;
    data: WeatherDetailData;
}

const CurrentWeatherDetail = ({categoryName, data}:CurrentWeatherDetailType) => {

    return (
        <WeatherDetail key={categoryName}>
            <span className="category">{data.category}</span>
            <ul>
                <li key={categoryName + "-icon-and-value"} className={`icon-and-value ${categoryName}`}>
                    <img className="icon" style={{transform: `rotate(${Array.isArray(data.value) ? data.value[0] : 0}deg)`}} src={`${process.env.PUBLIC_URL}/image/icon-weather_detail/${categoryName}${data.icon}.svg`} alt="logo" />
                    <span className="value">{Array.isArray(data.value) ? data.value[0] : data.value}{data.unit}</span>
                </li>
                <li key={data.category + "-info"} className={`info ${categoryName}`}>
                    {data.info.map((item, index) => (<span key={categoryName + index}>{item}</span>))}
                </li>
            </ul>
        </WeatherDetail>
    );
};

export default CurrentWeatherDetail;