import styled from "styled-components";



export const ShortTermWeatherListSection = styled.section`
    background-color: #fff;
    div.container {
        margin: 0 auto;
        text-align: center;
        h2 {
            color: #09458E;
            margin: 12px 0;
            padding: 12px 48px;
            display: inline-block;
            img {
                width: 32px;
                height: 32px;
                vertical-align: top;
                margin-top: -2px;
            }
        }
        #forecast-contents {
            overflow: hidden;
            height: 380px;
            opacity: 1;
            transition: all 0.4s ease-in-out;
            &.hidden {
                height: 0;
                opacity: 0;
            }
        }
        .forecast-wrapper {
            position: relative;
            overflow: hidden;
            &::after {
                content: '';
                position: absolute;
                top: 0;
                right: 0px;
                width: 20px;
                height: 100vh;
                background: linear-gradient(to left, #fff, transparent);
            }
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
            overflow-x: hidden;
            & > li {
                padding: 8px 0;
                & > ul {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    li {
                        margin: 0;
                    }
                }
            }
            ul > li {
                font-size: 14px;
            }
            .listName {
                text-align: left;
                position: -webkit-sticky;
                position: sticky;
                top: 0;
                left: 0;
                z-index: 99;
                background: linear-gradient(to right, white 70%, transparent);
                
                .icon {
                    visibility: hidden;
                }
            }
            .listValue {
                border-left: solid 1px #E8E8E8;
                background: linear-gradient(to top, #fafcfd, transparent 50%);
                & > ul {
                    align-items: center;
                }
                .temperatures {
                    color: #FFB800;
                }
                .humidity {
                    color: #09458E;
                }
                .wind {
                    color: #008061;
                    .wind-direction-and-wind-speed {
                        display: flex;
                        flex-wrap: nowrap;
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
            }
            .date {
                display: inline-block;
                margin: 8px 0 4px;
                color: #6D86A3;
                font-size: 14px;
            }
            .time {
                display: inline-block;
                margin-bottom: 4px;
                font-weight: bold;
                font-size: 16px;
                color: #39a7ff;
                &.night {
                    color: #0067CC;
                }
            }
            .icon, .icon img {
                margin: 0;
                width: 80px;
                height: 80px;
                font-size: 0;
            }
            .weather {
                display: inline-block;
                margin: 6px 0 8px;
                font-size: 15px;
                font-weight: bold;
            }
        }
    }
    @media screen and (max-width: 599px) {
        div.container {
            h2 {
                margin: 20px 0 4px;
                padding: 4px 48px;
                img {
                    width: 28px;
                    height: auto;
                }
            }
            .forecast-wrapper {
                &::after {
                    width: 8px;
                }
            }
            .TimeForecastList {
                ul > li {
                    font-size: 12px;
                }
                .listName {
                    width: calc(13.88vw + 8px);
                    background: linear-gradient(to right, white 80%, transparent);
                    .icon {
                        width: calc(13.88vw + 8px);
                    }
                }
                .listValue {
                    .wind {
                        .wind-direction {
                            width: 12px;
                            height: 12px;
                            padding-right: 2px;
                            img {
                                width: 12px;
                                height: 12px;
                            }
                        }
                    }
                }
                .date {
                    font-size: 12px;
                    margin: 8px 0 4px;
                }
                .time {
                    font-size: 14px;
                }
                .icon, .icon img {
                    width: 13.88vw;
                    height: 13.88vw;
                }
                .weather {
                    font-size: 13px;
                }
            }
        }
    }
`;