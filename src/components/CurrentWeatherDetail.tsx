import { WeatherDetailData } from "../types/weather";
import { WeatherDetail } from "./CurrentWeatherDetail.style";

type CurrentWeatherDetailType = {
    categoryName: string;
    data: WeatherDetailData;
}

const CurrentWeatherDetail = ({categoryName, data}:CurrentWeatherDetailType) => {
    const {category, value, info, unit, icon} = data;
    return (
        <WeatherDetail key={categoryName}>
            <span className="category">{category}</span>
            <ul>
                <li key={categoryName + "-icon-and-value"} className={`icon-and-value ${categoryName}`}>
                    <img className="icon" 
                        style={{transform: `rotate(${Array.isArray(value) ? value[0] : 0}deg)`}} 
                        src={`${process.env.PUBLIC_URL}/image/icon-weather_detail/${categoryName}${icon}.svg`} alt={`${categoryName}-icon`} 
                    />
                    <span className="value">{Array.isArray(value) ? value[0] : value}{unit}</span>
                </li>
                <li key={category + "-info"} className={`info ${categoryName}`}>
                    {info.map((item, index) => (<span key={categoryName + index}>{item}</span>))}
                </li>
            </ul>
        </WeatherDetail>
    );
};

export default CurrentWeatherDetail;