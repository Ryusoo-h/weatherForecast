
import styled from "styled-components";

export const CurrentWeatherSection = styled.section`
    background: linear-gradient(180deg, #8FC9FF 9.38%, rgba(203, 255, 252, 0.14) 80.21%);
    max-height: 338px;
    padding: 36px 0 32px;
    @media screen and (max-width: 599px) {
        padding: 24px 0 16px;
    }
`;

export const CurrentWeatherWrapper = styled.div`
    width: 100%;
    max-width: 700px;
    width: 100%;
    margin: 0 auto;
    display: grid;
    justify-content: center;
    grid: 60px 178px / 196px calc(100% - 252px);
    gap: 32px 16px;
    @media screen and (max-width: 599px) {
        grid: 60px 41.1vw / 32.22vw calc(100% - (32.22vw + 56px));
        gap: 16px;
    }
    @media screen and (max-width: 360px) {
        width: 312px;
        grid: 60px 148px / 116px calc(100% - (116px + 8px));
        gap: 8px;
    }
`;

export const Title = styled.h2`
    margin: 0;
    color: #fff;
    text-shadow: 0px 2px 8px rgba(73, 121, 181, 0.3);
    grid-area: 1/2/2/3;
    position: relative;
    span {
        font-size: 16px;
        font-weight: normal;
    }
    .alert {
        display: inline-block;
        background-color: rgba(255,255,255,0.8);
        color: #EA4B4B;
        text-shadow: none;
        margin-top: 16px;
        padding: 2px 16px;
        border-radius: 20px;
        font-size: 14px;
        line-height: 20px;
    }
    @media screen and (max-width: 599px) {
        grid-area: 1/1/2/3;
        span {
            font-size: 3.33vw;
        }
    }
    @media screen and (max-width: 360px) {
        grid-area: 1/1/2/3;
        span {
            font-size: 12px;
        }
    }
`;

export const CurrentWeatherStatus = styled.div`
    position: relative;
    width: 196px;
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
        width: 100%;
        height: auto;
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
        padding: 28px 0px 28px 18px;
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
    @media screen and (max-width: 599px) {
        padding-top: 8px;
        width: 32.22vw;
        height: 41.1vw;
        grid-area: 2/1/3/3;
        span {
            margin-top: 0;
            font-size: 18px;
        }
        .detail-all{
            padding: 12px 0px 12px 18px;
            font-size: 2.55vw;
            li {
                margin: 0.3em 0px;
            }
        }
    }
    @media screen and (max-width: 469px) {
        .icon {
            &.blur {
                filter: none;
                opacity: 1;
            }
        }
        span {
            font-size: 4.44vw;
            &.blur {
                filter: none;
                opacity: 1;
            }
        }
        .detail-all{
            display: none;
        }
        &:hover {
            & .icon:not(.blur) {
                filter: none;
                opacity: 1;
                & + span:not(.blur) {
                    filter: none;
                    opacity: 1;
                }
            }
        }
    }
    @media screen and (max-width: 360px) {
        width: 116px;
        height: 148px;
        span {
            font-size: 16px;
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
    align-items: center;
    list-style: none;
`;
