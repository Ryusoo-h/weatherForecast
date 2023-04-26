import styled from "styled-components";

export const TitleList = styled.li`
    display: flex;
    gap: 36px;
    .title {
        width: 92px;
        text-align: right;
        font-size: 20px;
        font-weight: bold;
        .unit {
            display: block;
            font-size: 16px;
            font-weight: normal;
        }
    }
    ul {
        width: calc(100% - 92px);
        display: flex;
        list-style: none;
        margin: 0;
        padding: 8px;
        .graph {
            padding-top: 20px;
            width: 330px;
            position: relative;
            --color0: #78F4C8;
            --color3: #64D0FF;
            --color2: #FEDA7F;
            --color1: #FF7979;
            .graph-bar-wrapper {
                display: flex;
                width: 80%;
                font-size: 14px;
                .graph-bar {
                    flex-grow: 1;
                    position: relative;
                    width: 100%;
                    height: 6px;
                    & span {
                        position: absolute;
                        top: 0;
                        left: 0;
                        transform: translate(-50%, -120%)
                    }
                    &.color0 {
                        background-color: var(--color0);
                    }
                    &.color3 {
                        background-color: var(--color3);
                    }
                    &.color2 {
                        background-color: var(--color2);
                    }
                    &.color1 {
                        background-color: var(--color1);
                    }
                }
                .unit {
                    position: absolute;
                    top: 0;
                    right: 0;
                    transform: translate(-16px, calc(-120% + 20px))
                }
            }
            .dot {
                width: 15px;
                height: 15px;
                background-color: #fff;
                border: 3px solid #64D0FF;
                border-radius: 8px;
                position: absolute;
                top: 15px;
                left: -7px;
                transition: all 0.4s ease-in-out;
                &.color0 {
                    border-color: var(--color0);
                }
                &.color3 {
                    border-color: var(--color3);
                }
                &.color2 {
                    border-color: var(--color2);
                }
                &.color1 {
                    border-color: var(--color1);
                }
            }
        }
        .grade-and-value {
            flex-grow: 1;
            & ul {
                width: 100%;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                gap: 4px;
                border-radius: 8px;
                overflow: hidden;
                &.doubleList {
                    li {
                        width: 50%;
                    }
                }
                li {
                    box-sizing: border-box;
                    flex-grow: 1;
                    background-color: #F8F8F8;
                    padding: 8px;
                    font-size: 15px;
                }
            }
        } 
    }
    @media screen and (max-width: 859px) {
        .title {
            flex-shrink: 0;
            width: 92px;
            text-align: right;
            font-size: 20px;
            font-weight: bold;
            .unit {
                font-size: 16px;
                font-weight: normal;
            }
        }
        & > ul {
            flex-direction: column;
            gap: 16px;
            max-width: 500px;
            .graph {
                width: unset;
                max-width: 500px;
                .graph-bar-wrapper {
                    width: 100%;
                    font-size: 14px;
                    .unit {
                        position: absolute;
                        top: 0;
                        right: 0;
                        transform: translate(0, calc(-120%))
                    }
                }
            }
        }
    }
    @media screen and (max-width: 489px) {
        gap: 12px;
        .title {
            width: auto;
            text-align: left;
            font-size: 3.88vw;
            .unit {
                display: inline;
                font-size: 3.33vw;
                padding-left: 4px;
            }
        }
        & > ul {
            width: 100%;
            padding: 0;
            .graph {
                .graph-bar-wrapper {
                    width: 100%;
                    font-size: 3.33vw;
                    .unit {
                        transform: translate(0, calc(-180%))
                    }
                }
            }
        }
        ul {
            .grade-and-value {
                flex-grow: 1;
                & ul {
                    width: 100%;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    gap: 4px;
                    border-radius: 8px;
                    overflow: hidden;
                    &.doubleList {
                        li {
                            width: 50%;
                        }
                    }
                    li {
                        box-sizing: border-box;
                        flex-grow: 1;
                        background-color: #F8F8F8;
                        padding: 8px;
                        font-size: 3.33vw;
                    }
                }
            } 
        }
    }
    @media screen and (max-width: 360px) {
        .title {
            font-size: 14px;
            .unit {
                font-size: 12px;
            }
        }
        & > ul {
            .graph {
                .graph-bar-wrapper {
                    font-size: 12px;
                }
            }
        }
        ul {
            .grade-and-value {
                & ul {
                    li {
                        font-size: 12px;
                    }
                }
            } 
        }
    }
`;