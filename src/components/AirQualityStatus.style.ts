
import styled from "styled-components";

export const TotalStatusSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 24px;
    padding: 32px 0;
    color: #fff;
    text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12);
    text-align: center;
    .date-and-location {
        & > span {
            display: block;
        }
    }
    .location {
        margin-bottom: 6px;
    }
    .date {
        font-size: 24px;
        font-weight: bold;
    }
`;
export const TotalStatusWrapper = styled.section`
    position: relative;
    width: 205px;
    height: 205px;
    border-radius: 110px;
    border: 1px solid rgba(255, 255, 255, 0.7);
    box-shadow: 0px 0px 40px #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .status {
        display: flex;
        flex-direction: column-reverse;
        gap: 12px;
        margin: 28px 0 20px;
    }
    .status-title {

    }
    .status-grade {
        font-size: 40px;
        font-weight: bold;
    }
`;

export const DetailStatusDotWrapper = styled.section`
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        & > li {
            width: 16px;
            height: 16px;
            border: solid 2px #fff;
            border-radius: 8px;
            &::after {
                content: '';
                display: block;
                opacity: 0;
                width: 0px;
                height: 0px;
                border-top: 12px solid #fff;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                transform: translate(-2px, -18px);
                transition: all 0.2s ease-in-out;
            }
            &:hover::after {
                opacity: 1;
            }
            & + li {
                margin-left: 6px;
            }
            & > span {
                position: absolute;
                bottom: 60px;
                left: 50%;
                transform: translate(-50%);
                width: 140px;
                background-color: #fff;
                color: #333;
                text-shadow: none;
                padding: 4px;
                border-radius: 8px;
                transition: all 0.2s ease-in-out;
                opacity: 0;
            }
            &:hover > span {
                opacity: 1;
            }
        }
    }
`;