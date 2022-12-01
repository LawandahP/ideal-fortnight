import { TiArrowSync } from "react-icons/ti";
import styled from "styled-components";
import { colors, spacing } from "../../styles/variables";

export const Container = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 10px;

    @media screen and (max-width: 600px) {
        grid-template-columns: auto;
    }
`;

export const CategoryWrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 10px;
    padding-bottom: 10px;

    @media screen and (max-width: 912px) {
        grid-template-columns: auto auto;
    }

    @media screen and (max-width: 820px) {
        grid-template-columns: auto;
    }

    @media screen and (max-width: 600px) {
        grid-template-columns: auto auto;
    }

    @media screen and (max-width: 300px) {
        grid-template-columns: auto;
    }
`;

export const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    position: relative;
    border: 1px solid #ccc;
    padding-right: 8px;

    &:hover {
        border: 1px solid ${colors.primary};
    }
`;

export const RadioButtonLabel = styled.label`
    position: absolute;
    top: 25%;
    left: 8px;
    width: 24px;
    height: 24px;
    border-radius: 20%;
    background: white;
    border: 1px solid #ccc;
`;

export const RadioButton = styled.input`
    opacity: 0;
    z-index: 1;
    cursor: pointer;
    width: 25px;
    height: 25px;
    margin-right: 30px;

    &:hover ~ ${RadioButtonLabel} {
        border: 1px solid ${colors.primary};
        &::after {
            content: "✔";
            color: ${colors.primary};
            width: 12px;
            height: 12px;
            margin: 4px;
        }
    }
    &:hover ~ ${Item} {
        background: blue;
        border: 2px solid red;
    }
    &:checked + ${RadioButtonLabel} {
        background: ${colors.primary};
        /* border: 1px solid yellowgreen; */
        &::after {
            content: "✔";
            color: white;
            width: 12px;
            height: 12px;
            margin: 4px;
        }
    }
`;

export const CategoryInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
`;
export const Label = styled.p`
    font-size: 14px;
`;
export const ControlLabel = styled.p`
    font-size: 12px;
    color: grey;
    margin-bottom: 10px;
    margin-top: 10px;
    font-weight: 400;
`;

export const InlineContainer = styled.div`
    display: inline-block;
`;

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export const Header = styled.p`
    font-size: 14px;
    font-weight: 500;
    color: grey;
`;

export const MaintenanceCard = styled.div`
    position: relative;
    display: inline-block;
    box-shadow: 0 1px 3px rgba(0.2, 0.2, 0.2, 0.2);
    background: ${({ theme }) => theme.bg};
    border-radius: 5px;
`;

export const MaintenanceImageContainer = styled.div`
    height: 120px;
    width: auto;
    border-radius: 5px;
`;

export const MaintenanceImage = styled.img`
    object-fit: fill;
    height: 120px;
    width: 100%;
    border-radius: 5px 5px 0px 0px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

export const MaintenanceContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 5px;
    padding-top: 5px;

    @media screen and (max-width: 912px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 500px) {
        grid-template-columns: auto;
    }
`;
export const Category = styled.p`
    color: grey;
    font-size: 1rem;
    text-transform: uppercase;
`;
export const InfoContainer = styled.div`
    padding: 10px;
`;

export const SectionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
    grid-gap: 5px;
`;

export const SectionInline = styled.div`
    display: inline-block;
`;

export const NgDivider = styled.div`
    height: 1px;
    /* width: ${({ header }) => (header ? `95%` : `80%`)}; */
    background: ${({ theme }) => theme.bg3};
    margin: 5px 0px 5px 0px;
`;

export const Title = styled.p`
    font-size: 9px;
    margin-top: 3px;
    color: grey;
`;
export const Data = styled.p`
    font-size: 11px;
    /* text-transform: uppercase; */
`;

export const CategoryButton = styled.button`
    background: ${({ cancel }) => (cancel ? `grey` : `#0057D9`)};
    padding: 8px 8px;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    justify-content: center;
    font-size: 8px;
    width: 100%;
    border: ${({ cancel }) => (cancel ? `` : `1px solid #0057D9`)};

    &:hover {
        background: ${({ cancel }) => (cancel ? `#ccc` : `#fff`)};
        color: ${({ cancel }) => (cancel ? `grey` : `#0057D9`)};
    }
`;
export const MaintenanceStatus = styled.p`
    position: absolute;
    top: 4px;
    right: 4px;
    /* z-index: 1; */
    background: ${({ UnResolved, Resolved, Pending, Cancelled }) =>
        UnResolved
            ? `#f7cbcb`
            : Resolved
            ? `#bbfce2`
            : Pending
            ? `#43d1f7`
            : Cancelled
            ? `#ccc`
            : `#fff`};
    border: ${({ UnResolved, Resolved, Pending, Cancelled }) =>
        UnResolved
            ? `1px solid #ff0000`
            : Resolved
            ? `1px solid green`
            : Pending
            ? `1px solid #00c8ff`
            : Cancelled
            ? `1px solid grey`
            : `#fff`};
    color: ${({ UnResolved, Resolved, Pending, Cancelled }) =>
        UnResolved
            ? `#ff0000`
            : Resolved
            ? `#0057D9`
            : Pending
            ? `#00c8ff`
            : Cancelled
            ? `grey`
            : ""};
    padding: 3px;
    border-radius: 3px;
    text-transform: uppercase;
`;

export const RefreshButton = styled(TiArrowSync)`
    font-size: 1.5rem;
    cursor: pointer;
    color: grey;

    &:hover {
        color: ${colors.primary};
    }
`;


export const DashboardMaintenanceContainer = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 7px 10px 7px;
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.bg2};
    font-size: 9px;

    .details {
        display: block;
        margin: 0px 0px 0px 5px;
        
        #category {
            /* font-size: 12px; */
            font-weight: 700;
        }
    }
`
