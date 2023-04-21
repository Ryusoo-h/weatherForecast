import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { ScrollBarWrapper } from "./ScrollBar.style";

type ScrollBarProps = {
    wrapperWidth: number | undefined;
    list: HTMLUListElement | null;
    listWidth: number;
    listScrollWidth: number;
}

const ScrollBar = ({ wrapperWidth, list, listWidth, listScrollWidth }:ScrollBarProps) => {
    const scrollbar: React.MutableRefObject<HTMLDivElement | null> = useRef(null); // 스크롤바 DOM
    const mouseDownX = useRef<number>(0); // 시작 마우스 X값
    const currentMouseX = useRef<number>(0); // 지금 마우스 X값
    const prevScrollbarX = useRef<number>(0); // 이전 스크롤바 위치 X값
    const [scrollbarMoveX, setScrollbarMoveX] = useState<number>(0); // 계산된 스크롤바 위치
    const [scrollbarMaxX, setScrollbarMaxX] = useState<number>(300); // 스크롤바가 이동할 수 있는 최대 위치
    const [isMouseDowned, setIsMouseDowned] = useState<boolean>(false);
    const [isthrottle, setIsThrottle] = useState<boolean>(false);
    const isAddedEvent = useRef<boolean>(false); // window에 mousemove 이벤트를 여러개 생성하지 않기 위해 이벤트 생성 여부 저장
    const [scrollbarWidth, setScrollbarWidth] = useState<number>(0);
    const [ishiddenScrollbar, setIshiddenScrollbar] = useState<boolean>(true); // 아직 스크롤 콘텐츠의 데이터가 없을 때 스크롤바를 숨기기 위함

    useEffect(() => { // 스크롤바가 이동할 수 있는 최대 위치 업데이트함
        if (wrapperWidth && wrapperWidth - scrollbarWidth !== 0) {
            setScrollbarMaxX(wrapperWidth - scrollbarWidth)
        }
    },[wrapperWidth, scrollbarWidth]);

    useEffect(() => { // 스크롤바 길이를 업데이트함
        if (listWidth && listScrollWidth && scrollbar.current) { 
            if (listWidth === listScrollWidth) {
                setScrollbarWidth(0);
            } else {
                setIshiddenScrollbar(false);
                setScrollbarWidth((listWidth / listScrollWidth) * scrollbar.current.clientWidth);
            }
        }
    },[listWidth, listScrollWidth]);

    const onMouseMove = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        if (isMouseDowned) {
            if (isthrottle) {
                // console.log('스로틀!');
            } else if (!isthrottle) {
                setIsThrottle(true);
                setTimeout(async() => {
                    let newScrollbarMoveX = prevScrollbarX.current + (currentMouseX.current - mouseDownX.current);
                    // console.log("시작 마우스 X값 : ", mouseDownX.current, "\n지금 마우스 X값 : ", currentMouseX.current, 
                    //     "\n이전 위치 : ", prevScrollbarX.current, "\n새 위치(지금X - 시작X) : ", newScrollbarMoveX);
                    if (newScrollbarMoveX < 0) { // 스크롤 영역을 넘어가지 않도록함
                        newScrollbarMoveX = 0;
                    } else if (newScrollbarMoveX > scrollbarMaxX) {
                        newScrollbarMoveX = scrollbarMaxX;
                    }
                    setScrollbarMoveX(newScrollbarMoveX);
                    if (list && listWidth && listScrollWidth && scrollbar.current) { // 실제 스크롤에 반영
                        const moveLeft = (newScrollbarMoveX / listWidth) * listScrollWidth;
                        list.scrollLeft = moveLeft;
                        // console.log('실제 list가 움직일 거리 : ' , moveLeft, ' = (', newScrollbarMoveX, " / ", listWidth, ") *", listScrollWidth);
                    }
                    setIsThrottle(false);
                }, 80);
            }
        }
    };
    const onMouseDown = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        // console.log('다운!', e.pageX);
        setIsMouseDowned(true);
        mouseDownX.current = e.pageX;
    }
    const UpdatecurrentMouseX = useCallback((e: globalThis.MouseEvent) => {
        currentMouseX.current = e.pageX;
    }, []);
    const onMouseUp = () => {
        // console.log('업!');
        setIsMouseDowned(false);
        prevScrollbarX.current = scrollbarMoveX;
    }
    // 스크롤바에 onMouseDown이 발생하면, 처음 Down이 발생한 X위치와 현재 마우스의 X위치의 차이를 계산하여
    // 스크롤을 움직입니다. 마우스가 스크롤트랙을 벗어나거나 onMouseUp이 발생하면 멈춥니다.
    return (
        <ScrollBarWrapper id="forecast-scroll" className="scroll-track" ref={scrollbar}
            onMouseMove={(e) => {onMouseMove(e); if (!isMouseDowned && !isAddedEvent.current) { window.addEventListener('mousemove', UpdatecurrentMouseX); isAddedEvent.current = true;}}}
            onMouseLeave={() => { window.removeEventListener('mousemove', UpdatecurrentMouseX); isAddedEvent.current = false; onMouseUp();}}
            onMouseUp={() => {onMouseUp();}}
        >
            <div className={ishiddenScrollbar ? "scroll-bar hidden" : "scroll-bar"} 
                style={{width: `${scrollbarWidth}px`, transform: `translateX(${scrollbarMoveX}px)`}}
                onMouseDown={(e) => {onMouseDown(e);}}
            >
                <img className="reverse" src={`${process.env.PUBLIC_URL}/image/icon/line-arrow.svg`} alt="left-arrow-icon" />
                <img src={`${process.env.PUBLIC_URL}/image/icon/line-arrow.svg`} alt="right-arrow-icon" />
            </div>
        </ScrollBarWrapper>
    );
};

export default ScrollBar;