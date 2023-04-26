import styled from "styled-components";

export const AirQualityListSection = styled.section`
    padding: 8px 0 48px;
    #air-quality-list > li {
        margin-top: 12px;
        &:nth-child(2) {
            padding-bottom: 12px;
            border-bottom: solid 1px #DDD;
        }
    }
    @media screen and (max-width: 859px) {
        #air-quality-list > li {
            justify-content: center;
            margin-top: 36px;
            &:nth-child(2) {
                padding-bottom: 20px;
                border-bottom: solid 1px #DDD;
            }
        }
    }
    @media screen and (max-width: 489px) {
        #air-quality-list > li {
            flex-direction: column;
            margin-top: 24px;
        }
    }
`;