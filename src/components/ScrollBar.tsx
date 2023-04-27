import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { ScrollBarWrapper } from "./ScrollBar.style";

type ScrollBarProps = {
    wrapperWidth: number | undefined;
    list: HTMLUListElement | null;
    listWidth: number;
    listScrollWidth: number;
}

const ScrollBar = ({ wrapperWidth, list, listWidth, listScrollWidth }:ScrollBarProps) => {
    const scrolltrack: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
    const scrollbar: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
    const mouseDownX = useRef<number>(0); // 시작 마우스 X위치(마우스가 다운 된 순간)
    const prevScrollbarX = useRef<number>(0); // 이전 스크롤바 X위치
    const scrollbarMoveX = useRef<number>(0); // 스크롤바가 이동할 계산된 X위치
    const scrollbarMaxX = useRef<number>(300); // 스크롤바가 이동할 수 있는 최대 X위치
    const isthrottle = useRef<boolean>(false);
    const scrollbarWidth = useRef<number>(0);
    const [ishiddenScrollbar, setIshiddenScrollbar] = useState<boolean>(true); // 아직 스크롤 콘텐츠의 데이터가 없을 때 스크롤바를 숨기기 위함

    useEffect(() => { // 스크롤바 길이를 업데이트함
        if (wrapperWidth && listWidth && listScrollWidth && scrolltrack.current && scrollbar.current) { 
            if (listWidth === listScrollWidth) {
                scrollbarWidth.current = 0;
            } else {
                setIshiddenScrollbar(false);
                scrollbarWidth.current = (listWidth / listScrollWidth) * scrolltrack.current.clientWidth;
            }
                scrollbar.current.style.setProperty("width", `${scrollbarWidth.current}px`); // 스크롤바 길이 업데이트
                scrollbarMaxX.current = wrapperWidth - scrollbarWidth.current; // 스크롤바가 이동할 수 있는 최대 위치 업데이트함
        }
    },[listWidth, listScrollWidth, scrollbar, scrollbarWidth, wrapperWidth, scrollbarMaxX]);

    const updateScrollX = useCallback((e: globalThis.MouseEvent | globalThis.TouchEvent) => {
        if (!isthrottle.current) {
            isthrottle.current = true;
            setTimeout(async() => {
                let newScrollbarMoveX = prevScrollbarX.current + (('clientX' in e ? e.clientX : e.touches[0].clientX) - mouseDownX.current);
                // console.log("이전 위치 : ", prevScrollbarX.current, 
                //     "\n새 위치(지금X - 시작X) : ", newScrollbarMoveX, " = ", e.clientX, " - ", mouseDownX.current);
                
                // 스크롤바가 스크롤트랙 영역을 넘어가지 않도록함 : 0이상 scrollbarMaxX 이하
                if (newScrollbarMoveX < 0) { 
                    newScrollbarMoveX = 0;
                } else if (newScrollbarMoveX > scrollbarMaxX.current ) {
                    newScrollbarMoveX = scrollbarMaxX.current ;
                }
                if (scrollbar.current) { // 스크롤바 옮기기
                    scrollbar.current.style.setProperty("transform", `translateX(${newScrollbarMoveX}px)`);
                }
                if (list && listWidth && listScrollWidth && scrolltrack.current) { // 실제 리스트를 스크롤하기
                    const moveLeft = (newScrollbarMoveX / listWidth) * listScrollWidth;
                    list.scrollLeft = moveLeft;
                    // console.log('실제 list가 움직일 거리 : ' , moveLeft, ' = (', newScrollbarMoveX, " / ", listWidth, ") *", listScrollWidth);
                }
                scrollbarMoveX.current = newScrollbarMoveX;
                isthrottle.current = false;
            }, 80);
        }
    },[list, listScrollWidth, listWidth]);

    const onMouseUp = useCallback(() => {
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('touchstart', onMouseUp);
        window.removeEventListener('mousemove', updateScrollX);
        window.removeEventListener('touchmove', updateScrollX);
        prevScrollbarX.current = scrollbarMoveX.current;
    },[updateScrollX]);
    const onMouseDown = useCallback((e: MouseEvent<HTMLDivElement, globalThis.MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
        if (e.target === scrollbar.current) {
            console.log('down?');
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('touchend', onMouseUp);
            window.addEventListener('mousemove', updateScrollX);
            window.addEventListener('touchmove', updateScrollX);
            mouseDownX.current = 'clientX' in e ? e.clientX : e.touches[0].clientX;
        }
    }, [onMouseUp, updateScrollX]);

    // 스크롤바에 onMouseDown이 발생하면, 처음 Down이 발생한 X위치와 현재 마우스의 X위치의 차이를 계산하여
    // 스크롤을 움직입니다. onMouseUp이 발생하면 멈춥니다.
    return (
        <ScrollBarWrapper id="forecast-scroll" className="scroll-track" ref={scrolltrack}
            onMouseDown={(e) => {onMouseDown(e);}}
            onTouchStart={(e) => {onMouseDown(e);}}
        >
            <div className={ishiddenScrollbar ? "scroll-bar hidden" : "scroll-bar"} ref={scrollbar} >
                <img className="reverse" src={`${process.env.PUBLIC_URL}/image/icon/line-arrow.svg`} alt="left-arrow-icon" />
                <img src={`${process.env.PUBLIC_URL}/image/icon/line-arrow.svg`} alt="right-arrow-icon" />
            </div>
        </ScrollBarWrapper>
    );
};

export default ScrollBar;