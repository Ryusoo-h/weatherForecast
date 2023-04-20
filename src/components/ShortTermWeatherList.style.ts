import styled from "styled-components";



export const ShortTermWeatherListBox = styled.div`
    width: 800px;
    margin: 0 auto;
    text-align: center;
    h2 {
        color: #09458E;
        font-size: 24px;
        margin: 12px 0;
        padding: 12px 48px;
        display: inline-block;
    }
    .forecast-wrapper {
        overflow: auto;
    }
    .forecastDateTime {
        display: block;
        text-align: right;
        color: #6D86A3;
        opacity: 0.5;
        margin: 0.5rem 0 1rem;
    }
    ul {
        list-style: none;
        margin: none;
        padding: none;
        li {
            margin: 4px 0;
        }
    }
    .frctDateTime {
        color: #838383;
        grid-row: 1 / 2;
        grid-column: 1 / 3;
    }
    .TimeForecastList {
        display: flex;
        flex-direction: row;
        word-break: keep-all;
        font-size: 0;
        & > li {
            padding: 8px 0;
        }
        ul > li {
            font-size: 14px;
        }
        .listName {
            .icon {
                visibility: hidden;
            }
        }
        .listValue {
            border-left: solid 1px #E8E8E8;
            .temperatures {
                color: #FFB800;
            }
            .humidity {
                color: #09458E;
            }
            .wind {
                color: #008061;
                .wind-direction {
                    display: inline-block;
                    width: 14px;
                    height: 14px;
                    padding-right: 4px;
                    position: relative;
                    img {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%,-40%) rotateZ(0deg);
                        transform-origin: center;
                        width: 14px;
                        height: 14px;
                    }
                }
            }
        }
        .date {
            color: #6D86A3;
            font-size: 14px;
        }
        .time {
            font-weight: bold;
            font-size: 16px;
            color: #39a7ff;
            &.night {
                color: #0067CC;
            }
        }
        .icon, .icon img {
            width: 80px;
            height: 80px;
            font-size: 0;
        }
        .weather {
            font-size: 15px;
            font-weight: bold;
        }
    }
`;