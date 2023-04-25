import styled from "styled-components";

export const AirQualityListSection = styled.section`
    padding: 8px 0 48px;
    #air-quality-list > li {
        padding-top: 12px;
        &:nth-child(2) {
            padding-bottom: 12px;
            border-bottom: solid 1px #DDD;
        }
    }
`;