import styled from "styled-components";

import { Link as RouterLink } from "react-router-dom";
import { spacing, transitions, shadows, colors } from "../../styles/variables";
import { FiX, FiPlus, FiFilter, FiAlertCircle } from "react-icons/fi";

export const NgPageContainer = styled.div`
    display: grid;
    /* grid-template-columns: auto auto auto auto; */
    align-items: start;
    padding-top: ${({ padding }) => (padding ? "20px" : "")};
    align-items: center;
    margin-bottom: ${spacing.mdSpacing};

    /* @media screen and (max-width: 1024px) {
        grid-template-columns: auto auto;       
    }; */

    /* @media screen and (max-width: 600px) {
        grid-template-columns: auto;       
    }; */

    grid-gap: ${spacing.smSpacing};
`;

export const NgPaper = styled.div`
    background: ${({ theme }) => theme.bg};

    display: ${({ header }) => (header ? `flex` : ``)};
    justify-content: ${({ header }) => (header ? `space-between` : ``)};
    align-items: ${({ header }) => (header ? `center` : ``)};

    border-radius: 10px;
    padding: ${({ padded }) => (padded ? `20px` : ``)};
    box-shadow: ${shadows.card_shadow};
    width: 100% !important;
    overflow: auto;

    /* margin-bottom: 10px; */
`;

export const List = styled.li`
    list-style: none;
`;

export const NgLink = styled(RouterLink)`
    color: ${colors.primary};
    font-size: 14px;
    text-decoration: none;
    font-weight: 600;
    &:hover {
        /* transform: scale(1.01);
        transition: ${transitions.long}; */
        color: #a0eecd;
    }
`;

// Loader elements

export const    SpinnerContainer = styled.div`
    display: ${({ btn }) => (btn ? `` : `flex`)};
    align-items: ${({ btn }) => (btn ? `` : `center`)};
    justify-content: ${({ btn }) => (btn ? `` : `center`)};
    height: ${({ btn }) => (btn ? `` : `50vh`)};
`;

export const Spinner = styled.div`
    position: relative;
    width: ${({ btn }) => (btn ? `20px` : `40px`)};;
    height: ${({ btn }) => (btn ? `20px` : `40px`)};;
    border-radius: 50%;

    ::before,
    :after {
        content: "";
        position: absolute;
        border-radius: inherit;
    }
    :before {
        width: 100%;
        height: 100%;
        background-image: linear-gradient(0deg, ${colors.primary} 0%, #333399 100%);
        animation: spin 0.5s infinite linear;
    }
    :after {
        width: 85%;
        height: 85%;
        background-color: ${({ theme }) => theme.bg};
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

export const NotFoundContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30vh;
`;

export const NotFoundWrapper = styled.div`
    display: inline-block;
    text-align: center;
`;

export const NotFoundIcon = styled.div`
    font-size: 5rem;
    color: grey;
`;

export const NotFoundText = styled.p`
    color: grey;
    margin-top: -20px;
    font-size: 1rem;
    font-weight: 500;
`;

export const LeftSidebarContainer = styled.div`
    z-index: 4;
    background: ${({ theme }) => theme.bg};
    padding: ${({ large }) => (large ? `20px` : `5px`)};
    box-shadow: ${shadows.card_shadow};
    overflow: auto;
    position: fixed;
    top: 0;
    width: ${({ large }) =>
        large ? `${spacing.leftSideBarLg}` : `${spacing.leftSideBarSm}`};
    height: ${({ large, tall }) => (large ? `100vh` : tall ? `100vh` : "")};
    right: 0;
    right: ${({ isOpened }) => (isOpened ? `0` : `-${spacing.leftSideBarLg}`)};
    transition: ${transitions.long};
`;

export const LeftSidebarHeader = styled.div`
    margin: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const FilterBtnContainer = styled.div`
    /* padding: 5px; */
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-content: center;
    cursor: pointer;

    &:hover {
        transform: scale(1.01);
        transition: ${transitions.long};
        background: #a0eecd;
        color: #fff;
    }
`;

export const FilterBtn = styled.button`
    /* font-size: 16px; */
    margin: 12px;
    cursor: pointer;

    /* &:hover {
        transform: scale(1.01);
        transition: all 0.2s ease-in-out;
        
    } */
`;

// Accordion

export const Accordion = styled.div`
    width: 100%;
    box-shadow: ${shadows.card_shadow};
    overflow: auto;
`;

export const AccordionItem = styled.div`
    background: ${({ theme }) => theme.bg};
    margin-bottom: ${spacing.smSpacing};
    padding: 10px 20px;
`;

export const AccordionTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    /* font-size: 1.2rem; */
`;
export const AccordionHeader = styled(RouterLink)`
    display: flex;
    /* color: gray; */
    font-size: 14px;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
    /* color: ; */
`;

export const AccordionIcon = styled.div`
    font-size: 16px;
`;

export const AccordionContent = styled.div`
    color: grey;
    font-size: 12px;
    display: ${({ expanded }) => (expanded ? `block` : `none`)};
    transition: ${transitions.long};
`;

export const ToolTipAlertIcon = styled(FiAlertCircle)`
    font-size: 30px;
    color: ${colors.info};
`;


export const GalleryContainer = styled.div`
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
    -webkit-column-width:33%;
    -moz-column-width: 33%;
    column-width: 33%;
    padding: 0 12px;

    .pics {
        -webkit-transition: all 350ms ease;
        transition: all 350ms ease;
        cursor: pointer;
        margin-bottom: 12px;
    }

    .pics:hover {
        filter: opacity(.8)
    }

    @media screen and (max-width: 991px) {
        -webkit-column-count:2;
        -moz-column-count: 2;
        column-count: 2;
    };

    @media screen and (max-width: 480px) {
        -webkit-column-count:1;
        -moz-column-count: 1;
        column-count: 1;
        -webkit-column-width:100%;
        -moz-column-width: 100%;
        column-width: 100%;
    };
`