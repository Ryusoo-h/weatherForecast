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
            font-size: 16px;
            font-weight: normal;
        }
    }
    ul {
        width: calc(100% - 92px);
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0 8px 0 0;
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
`;