
import styled from "styled-components";

export const WeatherDetail = styled.li`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    .category {
        color: #09458E;
        font-size: 20px;
        font-weight: bold;
    }
    ul {
        list-style: none;
    }
    .icon-and-value {
        position:relative;
        width: 100px;
        height: 100px;
        margin: 4px 0 8px;
        &.temperature .value{ color: #FFC328; }
        &.humidity .value{ color: #09458E; }
        &.wind .value{ color: #00A37C; }
        &.wind::before,
        &.wind::after {
            content: '';
            display: block;
            width: 90px;
            height: 1px;
            background: linear-gradient(to left, #00a37C, #00a37C 8%, transparent 8%, transparent 92%, #00a37C 92%, #00a37C);
            opacity: 0.5;
            position: absolute;
            top: 53%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
        }
        &.wind::after {
            transform: translate(-50%, -50%) rotate(90deg);
            background: linear-gradient(to left, #00a37C, #00a37C 8%, transparent 8%, transparent 92%, #00a37C 92%, #00a37C);
        }
        .icon {
            width: 100px;
            height: 100px;
            position: relative;
            z-index: 1;
            filter: drop-shadow(0px 2px 8px rgba(93, 109, 128, 0.14));
        }
        .value {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -38%);
            font-size: 20px;
            z-index: 2;
        }
    }
    .info {
        color: #6D86A3;
        height: 2.5rem;
        &.humidity, &.wind{
            line-height: 2.5rem;
        }
        span {
            display: block;
        }
    }
    @media screen and (max-width: 599px) {
        .category {
            font-size: 16px;
        }
        .icon-and-value {
            width: 100%;
            height: auto;
            .icon {
                width: 100%;
                height: auto;
            }
            .value {
                font-size: 3.6vw;
            }
            &.wind::before,
            &.wind::after {
                width: 64px;
            }
        }
        .info {
            font-size: 14px;
        }
    }
`;