
import styled from "styled-components";

export const CurrentWeatherSection = styled.section`
    background: linear-gradient(180deg, #8FC9FF 9.38%, rgba(203, 255, 252, 0.14) 80.21%);
    height: 338px;
    padding: 36px 0 32px;
`;

export const CurrentWeatherWrapper = styled.div`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    display: grid;
    justify-content: center;
    grid: 60px 178px / 196px calc(100% - 256px);
    gap: 32px 16px;
`;

export const Title = styled.h2`
    margin: 0;
    text-align: center;
    color: #fff;
    text-shadow: 0px 2px 8px rgba(73, 121, 181, 0.3);
    font-size: 28px;
    line-height: 0.9em;
    grid-area: 1/2/2/3;
    span {
        font-size: 16px;
        font-weight: normal;
    }
`;

export const CurrentWeatherStatus = styled.div`
    position: relative;
    width: 228px;
    height: 279px;
    padding: 16px 8px 8px;
    grid-area: 1/1/2/2;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0px 2px 8px rgba(93, 109, 128, 0.04);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    .icon {
        width: 180px;
        height: 180px;
        transition: all 0.25s ease-in-out;
        &.blur {
            filter: blur(6px);
            opacity: 0.3;
        }
    }
    span {
        margin-top: 18px;
        font-size: 24px;
        font-weight: bold;
        transition: all 0.25s ease-in-out;
        &::after {
            opacity: 1;
        }
        &.blur {
            filter: blur(6px);
            opacity: 0.3;
        }
    }
    .detail-all {
        position: absolute;
        top: 0;
        left: 0;
        padding: 28px 32px;
        width: 100%;
        height: 288px;
        list-style: none;
        margin: 0;
        transition: all 0.3s ease-in-out;
        z-index: 5;
        &.hidden {
            top: 100%;
            opacity: 0;
        }
        li {
            margin: 0.5em 0;
        }
    }
    &:hover {
        & .icon:not(.blur) {
            filter: blur(3px);
            opacity: 0.4;
            & + span:not(.blur) {
                filter: blur(3px);
                opacity: 0.4;
            }
        }
        .detail-all {
            top: 0;
            opacity: 1;
        }
    }
`;

export const CurrentWeatherDetailList = styled.ul`
    margin: 0 auto;
    width: 100%;
    max-width: 340px;
    grid-area: 2/2/3/3;
    display: flex;
    justify-content: space-around;
    list-style: none;
`;
