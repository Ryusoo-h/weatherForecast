
// 대기질 등급
// 사용중인 훅 : useGetAirQualityGrade
// 등급 숫자 : 등급
// 0(초기값) : 정보 없음
// 1: 좋음
// 2: 보통
// 3: 나쁨
// 4: 매우나쁨
// 그외 : 정보 없음
export const airQualityGradeStatus = new Map<string, string>([
    ["0", "정보없음"],
    ["1", "좋음"],
    ["2", "보통"],
    ["3", "나쁨"],
    ["4", "매우나쁨"]
]);

export const getAirQualityGrade = (grade :string):string => {
    let newGrade:string = airQualityGradeStatus.get(grade) || "정보없음";
    return newGrade;
}

export const gradeColorClassName = {
    "1" : { // 좋음
        main: "status-good-gradation",
        totalStatus: "status-good-gradation-darker",
        detailStatus: "status-good",
    },
    "2" : { // 보통
        main: "status-normal-gradation",
        totalStatus: "status-normal-gradation-darker",
        detailStatus: "status-normal",
    },
    "3" : { // 나쁨
        main: "status-bad-gradation",
        totalStatus: "status-bad-gradation-darker",
        detailStatus: "status-bad",
    },
    "4" : { // 매우 나쁨
        main: "status-very-bad-gradation",
        totalStatus: "status-very-bad-gradation-darker",
        detailStatus: "status-very-bad",
    },
    "0" : { // 값이 없을때 : 보통
        main: "status-normal-gradation",
        totalStatus: "status-normal-gradation-darker",
        detailStatus: "status-no-info",
    }
};
