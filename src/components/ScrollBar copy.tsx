import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { ScrollBarWrapper } from "./ScrollBar.style";

const ScrollBar = () => {
    const [mouseDownX, setMouseDownX] = useState<number>(0);
    const [currentMouseX, setCurrentMouseX] = useState<number>(0);
    const [startScrollbarX, setStartScrollbarX] = useState<number>(0);
    const [scrollbarMoveX, setScrollbarMoveX] = useState<number>(0);
    const [isMouseDowned, setIsMouseDowned] = useState<boolean>(false);
    const [isthrottle, setIsThrottle] = useState<boolean>(false);
    const isAddedEvent = useRef<boolean>(false);

    useEffect(() => {
        console.log("시작 : ", mouseDownX, "지금 : ", currentMouseX, "trans : ", startScrollbarX);
        console.log("이전trans값 + (지금X - 시작X) = ", startScrollbarX, " + (", mouseDownX, " - ", currentMouseX, ") ");
    },[currentMouseX, mouseDownX]);
    useEffect(() => {
        console.log("isMouseDowned: ",isMouseDowned);
    },[isMouseDowned]);

    const onMouseMove = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        // console.log('무브무브');
        // if (isMouseDowned) {
        //     if (isthrottle) {
        //         console.log('스로틀!');
        //     } else if (!isthrottle) {
        //         console.log("X : ", currentMouseX, isMouseDowned);
        //         setIsThrottle(true);
        //         setTimeout(async() => {
        //             setScrollbarMoveX(startScrollbarX + (currentMouseX - mouseDownX));
        //             console.log('무브!', startScrollbarX + (currentMouseX - mouseDownX));
        //             setIsThrottle(false);
        //         }, 100);
        //     }
        // }
        if (isMouseDowned) {
                console.log("X : ", currentMouseX, isMouseDowned);
                setScrollbarMoveX(startScrollbarX + (currentMouseX - mouseDownX));
                console.log('무브!', startScrollbarX + (currentMouseX - mouseDownX));
        }
    };
    const onMouseDown = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        console.log('다운!', e.pageX);
        setIsMouseDowned(true);
        setMouseDownX(e.pageX);
    }
    const UpdatecurrentMouseX = useCallback((e: globalThis.MouseEvent) => {
        setCurrentMouseX(e.pageX);
    }, []);
    const onMouseUp = () => {
        console.log('업!');
        setIsMouseDowned(false);
        setStartScrollbarX(scrollbarMoveX);
    }
    return (
        <ScrollBarWrapper id="forecast-scroll" className="scroll-track" 
            onMouseMove={(e) => {onMouseMove(e); if (!isMouseDowned && !isAddedEvent.current) {
                console.log('생성');
                window.addEventListener('mousemove', UpdatecurrentMouseX); isAddedEvent.current = true;}}}
            onMouseLeave={() => { window.removeEventListener('mousemove', UpdatecurrentMouseX); isAddedEvent.current = false;}}>
            <div className="scroll-bar" style={{width: "200px", transition: "all 0.2s ease-in-out", transform: `translateX(${scrollbarMoveX}px)`}}
            onMouseDown={(e) => {onMouseDown(e);}}
            onMouseUp={() => {onMouseUp();}}
            
            >
                <img className="reverse" src={`${process.env.PUBLIC_URL}/image/icon/line-arrow.svg`} alt="" />
                <img src={`${process.env.PUBLIC_URL}/image/icon/line-arrow.svg`} alt="" />
            </div>
        </ScrollBarWrapper>
    );
};

export default ScrollBar;