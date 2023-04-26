import styled from "styled-components";

export const ScrollBarWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    background-color: #F4F4F4;
    border-radius: 15px;
    .scroll-bar {
        height: 30px;
        border-radius: 15px;
        background-color: #fff;
        border: solid 1px #F4F4F4;
        box-shadow: 0px 0px 4px rgba(89, 130, 162, 0.14);
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: 0.2s all ease-in-out;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        &:hover {
            box-shadow: 0px 0px 6px rgba(89, 130, 162, 0.3);
        }
        &.hidden {
            opacity: 0;
            width: 0;
        }
        img {
            pointer-events: none;
            width: 24px;
            height: 24px;
            &.reverse {
                transform: rotateZ(180deg);
            }
        }
    }
`;