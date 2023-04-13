import axios from "axios"
import { SHORT_TERM_WEATHER_FORECAST_URL } from "./url";

const getShortTermWeatherForecast = async () => {
    const response = await axios.get(SHORT_TERM_WEATHER_FORECAST_URL)
    .then(response => {
        return response.data.response.body.items.item;
    })
    .catch(e => {
        console.log('✅getShortTermWeatherForecast API 에러 : ', e);
        return [];
    })

    return response;
}

export default getShortTermWeatherForecast;