import { useEffect, useState } from "react";

const useGetGradeStatus = (grades:string[]):string[] => {
    const [prevGrades, setPrevGrades] = useState<string[]>([]);
    const [gradeStatus, setGradeStatus] = useState<string[]>([]);
    useEffect(() => {
        if (JSON.stringify(prevGrades) !== JSON.stringify(grades)) {
            setGradeStatus([]);
            const newGradeStatus:string[] = [];
            grades.forEach((grade) => {
                switch (grade) {
                    case "0":
                        newGradeStatus.push("정보없음");
                        break;
                    case "1":
                        newGradeStatus.push("좋음");
                        break;
                    case "2":
                        newGradeStatus.push("보통");
                        break;
                    case "3":
                        newGradeStatus.push("나쁨");
                        break;
                    case "4":
                        newGradeStatus.push("매우나쁨");
                        break;
                    default:
                        newGradeStatus.push("정보없음");
                        console.log("✅잘못된 등급 값입니다");
                }
            });
            setGradeStatus(newGradeStatus);
            setPrevGrades(grades);
        }
    }, [grades, prevGrades]);
    return gradeStatus;
};

export default useGetGradeStatus;