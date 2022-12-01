import styled from "styled-components";
import { colors, fontSize, spacing } from "../../styles/variables";

export const NgDashboardContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    background: ${({ theme }) => theme.bg2};
    overflow: hidden;
    display: grid;
    /* margin: ${spacing.smSpacing} */
    /* grid-template-columns: auto; */
`;

export const NgDashboardCardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: start;
    margin-bottom: ${spacing.mdSpacing};

    @media screen and (max-width: 1024px) {
        grid-template-columns: auto auto;
    }

    @media screen and (max-width: 913px) {
        grid-template-columns: auto auto auto;
    }

    @media screen and (max-width: 600px) {
        grid-template-columns: auto;
    }

    grid-gap: ${spacing.smSpacing};
`;

export const NgDashboardCard = styled.div`
    background: ${({ theme }) => theme.bg};
    color: grey;
    display: flex;
    position: relative;
    overflow: hidden;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 5px;
    height: 80px;
    padding: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: ${colors.primary} 0.2s ease-in-out;

    &:hover {
        transform: scale(1.01);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }
    &:first-child {
        color: #34ebe8;
        border-left: 7px solid #34ebe8;
    }
    &:nth-child(2) {
        color: #ebc934;
        border-left: 7px solid #ebc934;
    }
    &:nth-child(3) {
        color: ${colors.primary};
        border-left: 7px solid ${colors.primary};
    }
    &:nth-last-child(2) {
        color: #eb7734;
        border-left: 7px solid #eb7734;
    }
    &:last-child {
        color: #5c34eb;
        border-left: 7px solid #5c34eb;
    }
`;

export const NgDashboardCardText = styled.p`
    font-size: 15px;
    font-weight: 300;

    &:last-child {
        font-size: 17px;
        font-weight: 600;
    }

    @media screen and (max-width: 768px) {
        font-size: ${fontSize.sm};
    }
`;

export const NgDashboardCardIcon = styled.div`
    font-size: 3rem;
`;

export const NgCardDivider = styled.div`
    border-left: 1px solid grey;
    height: 40px;
`;
export const CardDataWrapper = styled.div`
    justify-content: center;
    text-align: left;
`;

/* OverView */

export const NgDashBoardOverviewContainer = styled.div``;
export const NgDashboardOverviewWrapper = styled.div`
    display: grid;
    /* align-items: start; */
    /* justify-content: start; */
    grid-template-columns: 3fr 1fr;
    grid-gap: ${spacing.smSpacing};
    /* margin: ${spacing.mdSpacing}; */

    @media screen and (max-width: 812px) {
        grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 768px) {
        grid-template-columns: auto;
    } ;
`;

export const NgDashboardOverview = styled.div`
    display: block;
`;

export const NgDashboardTableCard = styled.div`
    background: ${({ theme }) => theme.bg};
    align-items: start;
    /* border-radius: 10px; */
    min-height: 140px;
    padding: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;
    overflow: auto;

    &:hover {
        cursor: pointer;
    }
`;

export const Greeting = styled.div`
    margin-bottom: 5px;
    font-size: 0.9rem;
    font-weight: 600;
`;

export const DCardContainer = styled.div`
    padding: 10px 5px 10px 5px;
`;

export const DCardFlex = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const GreetingsUserName = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
`;
