import axios from "axios"
import { AIR_QUALITY_LIVE_INFO_URL } from "./url";

const getAirQualityLiveInfo = async () => {
    const response = await axios.get(AIR_QUALITY_LIVE_INFO_URL)
    .then(response => {
        return response.data.response.body.items[0];
    })
    .catch(e => {
        console.log('✅getWeather API 에러 : ', e);
        return [];
    })

    return response;
}

export default getAirQualityLiveInfo;