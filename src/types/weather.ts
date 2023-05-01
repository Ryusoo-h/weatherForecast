
export type ultraShortTermWeatherDataItem = {
    baseDate: string;
    baseTime: string;
    category: string;
    obsrValue: string;
}

export type WeatherDetailData = {
    category: string;
    value: string | string[]; 
    unit: string;
    info: string[];
    icon: string;
};

export type ShortTermWeatherDataItem = {
    baseDate: string;
    baseTime: string;
    fcstDate: string;
    fcstTime: string;
    fcstValue: string;
    category: string;
}

export type ShortTermWeatherCategory = {[forecastDate: string]:{[forecastTime: string]:{[category: string]: string}}};
