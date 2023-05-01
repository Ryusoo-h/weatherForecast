import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import useScrollBar from "../hooks/scrollBar.ts/useScrollBar";
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
    const [ishiddenScrollbar, mouseDownX, prevScrollbarX, scrollbarMoveX, updateScrollX] = useScrollBar(wrapperWidth, list, listWidth, listScrollWidth, scrolltrack, scrollbar);

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