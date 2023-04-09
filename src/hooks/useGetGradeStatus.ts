import { useEffect, useState } from "react";

const useGetGradeStatus = (grades:string[]):string[] => {
    const [prevGrades, setPrevGrades] = useState<string[]>([]);
    const [gradeStatus, setGradeStatus] = useState<string[]>([]);
    useEffect(() => {
        if (JSON.stringify(prevGrades) !== JSON.stringify(grades)) {
            setGradeStatus([]);
            grades.forEach((grade) => {
                switch (grade) {
                    case "0":
                        setGradeStatus((prevGradeStatus) => [...prevGradeStatus, "정보없음"]);
                        break;
                    case "1":
                        setGradeStatus((prevGradeStatus) => [...prevGradeStatus, "좋음"]);
                        break;
                    case "2":
                        setGradeStatus((prevGradeStatus) => [...prevGradeStatus, "보통"]);
                        break;
                    case "3":
                        setGradeStatus((prevGradeStatus) => [...prevGradeStatus, "나쁨"]);
                        break;
                    case "4":
                        setGradeStatus((prevGradeStatus) => [...prevGradeStatus, "매우나쁨"]);
                        break;
                    default:
                        console.log("✅잘못된 등급 값입니다");
                }
            });
            setPrevGrades(grades);
        }
    }, [grades, prevGrades]);
    return gradeStatus;
};

export default useGetGradeStatus;