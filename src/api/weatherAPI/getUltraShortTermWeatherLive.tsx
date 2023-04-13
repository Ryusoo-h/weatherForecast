import axios from "axios"
import { ULTRA_SHORT_TERM_WEATHER_LIVE_URL } from "./url";

const getUltraShortTermWeatherLive = async () => {
    const response = await axios.get(ULTRA_SHORT_TERM_WEATHER_LIVE_URL)
    .then(response => {
        return response.data.response.body.items.item;
    })
    .catch(e => {
        console.log('✅getUltraShortTermWeatherLive API 에러 : ', e);
        return [];
    })

    return response;
}

export default getUltraShortTermWeatherLive;