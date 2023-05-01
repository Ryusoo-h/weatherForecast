import { useCallback, useEffect, useRef, useState } from "react";

type UpdateScrollX = (e: globalThis.MouseEvent | globalThis.TouchEvent)=>void;

type UseScrollBar = (
    wrapperWidth: number | undefined,
    list: HTMLUListElement | null,
    listWidth: number,
    listScrollWidth: number,
    scrolltrack: React.MutableRefObject<HTMLDivElement | null>,
    scrollbar: React.MutableRefObject<HTMLDivElement | null>
) => [boolean, React.MutableRefObject<number>, React.MutableRefObject<number>, React.MutableRefObject<number>, UpdateScrollX];


const useScrollBar:UseScrollBar = (wrapperWidth, list, listWidth, listScrollWidth, scrolltrack, scrollbar) => {
    const [ishiddenScrollbar, setIshiddenScrollbar] = useState<boolean>(true); // 아직 스크롤 콘텐츠의 데이터가 없을 때 스크롤바를 숨기기 위함
    const scrollbarWidth = useRef<number>(0);
    const prevScrollbarX = useRef<number>(0); // 이전 스크롤바 X위치
    const scrollbarMaxX = useRef<number>(300); // 스크롤바가 이동할 수 있는 최대 X위치
    const scrollbarMoveX = useRef<number>(0); // 스크롤바가 이동할 계산된 X위치
    const mouseDownX = useRef<number>(0); // 시작 마우스 X위치(마우스가 다운 된 순간)

    const isthrottle = useRef<boolean>(false);

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
    },[wrapperWidth, listWidth, listScrollWidth, scrolltrack, scrollbar, scrollbarWidth, scrollbarMaxX]);

    const updateScrollX:UpdateScrollX = useCallback((e) => {
        if (!isthrottle.current) {
            isthrottle.current = true;
            setTimeout(async() => {
                let newScrollbarMoveX = prevScrollbarX.current + (('clientX' in e ? e.clientX : e.touches[0].clientX) - mouseDownX.current);
                // console.log("이전 위치 : ", prevScrollbarX.current, 
                //     "\n새 위치(지금X - 시작X) : ", newScrollbarMoveX, " = ", e.clientX, " - ", mouseDownX.current);
                
                // 스크롤바가 스크롤트랙 영역을 넘어가지 않도록함 : 0이상 scrollbarMaxX 이하
                if (newScrollbarMoveX < 0) { 
                    newScrollbarMoveX = 0;
                } else if (newScrollbarMoveX > scrollbarMaxX.current) {
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

    return [ishiddenScrollbar, mouseDownX, prevScrollbarX, scrollbarMoveX, updateScrollX];
};

export default useScrollBar;