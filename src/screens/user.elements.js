import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import {
    borderColors,
    colors,
    lightColors,
    spacing,
} from "../styles/variables";

export const UserCard = styled.div`
    background: ${({ theme }) => theme.bg};
    display: grid;
    grid-template-columns: auto auto auto auto;
    padding: 10px;
    margin-bottom: 10px;
    /* justify-content: space-evenly; */
    align-items: center;

    @media screen and (max-width: 768px) {
        grid-template-columns: auto;
    }
`;

export const UserInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    /* padding: 10px; */
`;

export const ProfilePicture = styled.img`
    width: 100px;
    height: auto;
    margin-right: 15px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

export const DetailsWrapper = styled.div`
    display: block;
`;

export const Chip = styled.div`
    font-size: 6px;
    background: grey;
    color: #fff;
    margin: 3px;
    padding: 5px;
    border-radius: 10px;
`;

export const UserName = styled.h3`
    font-weight: bold;

    @media screen and (max-width: 768px) {
        font-size: 12px;
        font-weight: bold;
    }
`;

export const Status = styled.div`
    background: ${({ active }) => (!active ? "red" : "#0057D9")};
    text-align: center;
    font-size: 10px;
    color: #fff;
    border-radius: 20px;
    width: ${({ active }) => (!active ? "70px" : "50px")};
    cursor: pointer;
`;

export const FlexWrapper = styled.div`
    display: flex;
    padding-top: ${spacing.xsSpacing};
    align-items: center;
    justify-content: space-between;
`;
export const Icon = styled.div`
    font-size: 1rem;
    margin-right: 5px;
    display: flex;
`;

export const IconText = styled.p`
    text-transform: ${({ header }) => (header ? `uppercase` : ``)};
    margin-left: 2px;
    display: block;
    flex: 1;
    color: inherit;
    font-size: ${({ header, amount }) =>
        header ? `11px` : amount ? `1.9rem` : `12px`};
    font-weight: ${({ header, amount }) =>
        header ? `700` : amount ? `900` : "600"};
    /* color: grey; */
`;

export const InfoWrapper = styled.div`
    display: inline-block;
`;

export const UserLinkWrapper = styled.div`
    /* font-size: 10px; */
    margin: 3px;
`;

export const UserLink = styled(RouterLink)`
    color: ${colors.primary};
    text-decoration: none;
    /* font-weight: 700; */
    &:hover {
        transform: scale(1.01);
        transition: all 0.2s ease-in-out;
        color: #a0eecd;
    }
`;
export const InlineWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

export const TableWrapper = styled.div`
    background: ${({ theme }) => theme.bg};
    display: grid;
    grid-template-columns: auto auto auto;
    padding: 20px;
    margin-bottom: 10px;
    justify-content: space-evenly;
    align-items: center;
`;

export const IconWrapper = styled.div`
    /* position: relative; */
    /* top: 3;
    right: 3; */
    /* display: flex;
    flex-direction: row;
    align-items: center; */
`;

export const UserCardWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto auto;
    align-items: start;
    margin-bottom: ${spacing.mdSpacing};

    @media screen and (max-width: 1024px) {
        grid-template-columns: auto auto;
    }

    @media screen and (max-width: 600px) {
        grid-template-columns: auto;
    }

    grid-gap: ${spacing.smSpacing};
`;

export const Button = styled.button`
    margin: 3px;
    border-radius: 5px;
    background: ${({ primary, warning, info, danger }) =>
        primary
            ? `${colors.primary}`
            : warning
            ? `${colors.warning}`
            : info
            ? `${colors.info}`
            : danger
            ? `${colors.danger}`
            : "none"};

    border: ${({
        primary,
        warning,
        info,
        danger,
        primary_outline,
        warning_outline,
        info_outline,
        danger_outline,
    }) =>
        primary
            ? `${borderColors.primary}`
            : warning
            ? `${borderColors.warning}`
            : info
            ? `${borderColors.info}`
            : danger
            ? `${borderColors.danger}`
            : primary_outline
            ? `${borderColors.primary}`
            : warning_outline
            ? `${borderColors.warning}`
            : info_outline
            ? `${borderColors.info}`
            : danger_outline
            ? `${borderColors.danger}`
            : "#010606"};

    padding: ${({ big }) => (big ? `14px 18px` : `5px 10px 5px 10px`)};

    color: ${({
        dark,
        primary_outline,
        warning_outline,
        info_outline,
        danger_outline,
    }) =>
        dark
            ? "#010606"
            : primary_outline
            ? `${colors.primary}`
            : warning_outline
            ? `${colors.warning}`
            : info_outline
            ? `${colors.info}`
            : danger_outline
            ? `${colors.danger}`
            : "#fff"};

    font-size: ${({ fontBig }) => (fontBig ? "20px" : "11px")};
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 500ms ease-in-out;
        background: ${({
            dark,
            primary_outline,
            warning_outline,
            info_outline,
            danger_outline,
        }) =>
            dark
                ? "#010606"
                : primary_outline
                ? `${colors.primary}`
                : warning_outline
                ? `${colors.warning}`
                : info_outline
                ? `${colors.info}`
                : danger_outline
                ? `${colors.danger}`
                : "none"};

        color: ${({ primary, warning, info, danger }) =>
            primary
                ? `${colors.primary}`
                : warning
                ? `${colors.warning}`
                : info
                ? `${colors.info}`
                : danger
                ? `${colors.danger}`
                : "#fff"};

        border: ${({
            primary,
            warning,
            info,
            danger,
            primary_outline,
            warning_outline,
            info_outline,
            danger_outline,
        }) =>
            primary
                ? `${borderColors.primary}`
                : warning
                ? `${borderColors.warning}`
                : info
                ? `${borderColors.info}`
                : danger
                ? `${borderColors.danger}`
                : primary_outline
                ? `${borderColors.primary}`
                : warning_outline
                ? `${borderColors.warning}`
                : info_outline
                ? `${borderColors.info}`
                : danger_outline
                ? `${borderColors.danger}`
                : "#010606"};
    }
`;

export const Hide = styled.div`
    display: ${({ hide }) => (hide ? `none` : "")};
`;

export const ProfileUserCard = styled.div`
    background: ${({ theme }) => theme.bg};
    border-radius: 10px;
    padding: 15px 15px;
    width: 100%;
    /* display: flex;
    justify-content: center; */
    align-content: center;
    text-align: center;

    /* @media screen and (max-width: 600px) {
        display: flex;
        align-items: center;
        justify-content: space-evenly;

    } */
`;

export const Name = styled.p`
    font-size: 14px;
    font-weight: 600;
`;

export const PhoneNumber = styled.div`
    background: ${colors.primary};
    color: #fff;
    display: inline-block;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    cursor: pointer;
    /* font-weight: ; */
`;
