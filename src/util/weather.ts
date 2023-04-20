import { SetStateAction } from "react";

// category : 값
// TMP : 1시간 기온
// UUU : 풍속(동서성분) : 값이 +일경우 동쪽, -일경우 서쪽
// VVV : 풍속(남북성분) : 값이 +일경우 북쪽, -일경우 남쪽
// VEC : 풍향
// WSD : 풍속
// SKY : 하늘상태
// PTY : 강수형태
// POP : 강수확률
// WAV : 파고
// PCP : 강수없음
// REH : 습도
// SNO : 적설없음
// TMN : 일 최저기온
// TMX : 일 최고기온


// 온도 상태
// 사용중인 컴포넌트 : CurrentWeather
// * 상태,아이콘 이미지 num 값은 '/'를 기준으로 split하여 사용하고있음
// 온도 값 : info, 아이콘이미지 num
// 5 미만인 경우 : 패딩, 내복/목도리/1
// 12 미만인 경우 : 코트, 기모/여러겹/2
// 20 미만인 경우 : 얇은 니트/가디건/3
// 그 이상 : 얇은 옷/반팔, 반바지/4
export const temperatureStatus = new Map<string, string>([
    ["4.9", "패딩, 내복/목도리/4"],
    ["11.9", "코트, 기모/여러겹/3"],
    ["19.9", "얇은 니트/가디건/2"],
    ["99", "얇은 옷/반팔, 반바지/1"]
]);
export const temperatureValue = [4.9, 12.9, 19.9, 99];

// 습도 상태
// 사용중인 컴포넌트 : CurrentWeather
// * 상태,아이콘 이미지 num 값은 ','를 기준으로 split하여 사용하고있음
// 습도 값 : info, 아이콘이미지 num
// 30 미만인 경우 : 건조함,1
// 40 미만인 경우 : 보통,2
// 60 미만인 경우 : 쾌적함,3
// 70 미만인 경우 : 보통,4
// 100 미만인 경우 : 습함,5
// 100 인경우 : 습함,6
export const humidityStatus = new Map<string, string>([
    ["29.9","건조함,1"],
    ["39.9","보통,2"],
    ["59.9","쾌적함,3"],
    ["69.9","보통,4"],
    ["99.9","습함,5"],
    ["100","습함,6"]
])
export const humidityValue = [29.9, 39.9, 59.9, 69.9, 99.9, 100];

// 하늘 상태
// 사용중인 컴포넌트 : ShortTermWeatherList
// * 상태,아이콘 이미지 num 값은 ','를 기준으로 split하여 사용하고있음
// 하늘 상태 값 : 상태,아이콘이미지 num
// 5 이하인 경우 : 맑음,1
// 8 이하인 경우 : 구름많음,3
// 10 이하인 경우 : 흐림,5
// 그 이상 : 정보없음
export const skyStatus = new Map<string, string>([
    ["5", "맑음,1"],
    ["8", "구름많음,3"],
    ["10", "흐림,5"],
    ["11", "정보없음"]
]);
export const skyValue = [5, 8, 10, 11];

// 강수 상태
// 사용중인 컴포넌트 : CurrentWeather, ShortTermWeatherList
// * 상태,아이콘 이미지 num 값은 ','를 기준으로 split하여 사용하고있음
// 강수 상태 값 : 상태, 아이콘이미지 num
// 0 : 없음
// 1 : 비,6
// 2 : 비/눈,8
// 3 : 눈,9
// 4 : 소나기,11
// 5 : 빗방울,13
// 6 : 빗방울눈날림,15
// 7 : 눈날림,17
// 그 외 : 정보없음
export const ptyStatus = new Map<string, string>([
    ["0", "없음,1"],
    ["1", "비,6"],
    ["2", "비/눈,8"],
    ["3", "눈,9"],
    ["4", "소나기,11"],
    ["5", "빗방울,13"],
    ["6", "빗방울눈날림,15"],
    ["7", "눈날림,17"],
    ["8", "정보없음"]
]);
export const ptyValue = [0, 1, 2, 3, 4, 5, 6, 7, 8];

// 풍속
// 사용중인 컴포넌트 : CurrentWeather, ShortTermWeatherList
// 풍속 값 : 상태
// 4 미만 : 약함
// 9 미만 : 약간 강함
// 14 미만 : 강함
// 14 이상 : 매우 강함
export const wsdStatus = new Map<string, string>([
    ["3.9", "약함"],
    ["8.9", "약간 강함"],
    ["13.9", "강함"],
    ["999", "매우 강함"]
]);
export const wsdValue = [3.9,8.9,13.9,99];




// value에 따라 각 카테고리의 status를 반환함
export const printCategoryStatusByValue = (value:string, categoryValueArray:number[], categoryStatusArray:Map<string, string>, isWithValue:boolean) => {
    let newStatus:string = value;
        for(let i = 0; i < categoryValueArray.length; i++) {
            if (Number(newStatus) <= categoryValueArray[i]) {
                newStatus = categoryStatusArray.get(String(categoryValueArray[i])) || "정보없음";
                newStatus = isWithValue ? newStatus + "," + value : newStatus;
                break;
            }
        }
    return newStatus;
};


export const changeDayOrNightIcon = (hour:number, iconNum:string, setIcon?: { (value: SetStateAction<string>): void; (arg0: string): void; }) => {
    // 시간에 따라 밤낮 아이콘으로 바꿈
    const time = hour;
    let newIconNum = iconNum;
    if (time >= 18 || time < 6) {
        switch (iconNum) { 
            case "1":
            case "3":
            case "11":
            case "13":
            case "15":
            case "17":
            // 밤낮 아이콘이 따로있는것중 밤 아이콘을 표시할 경우
            newIconNum = String(Number(iconNum) + 1);
            if (setIcon) {
                setIcon(newIconNum);
            }
            break;
        default:
            break;
        }
    }
    return newIconNum;
};


