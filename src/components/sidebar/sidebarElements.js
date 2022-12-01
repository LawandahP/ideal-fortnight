import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { colors, spacing } from "../../styles/variables";
import { FaPiedPiperPp } from "react-icons/fa";

export const NgSidebarContainer = styled.div`
    /* z-index: 999; */
    width: ${({ isopen }) => (!isopen ? `` : spacing.sidebarWidth)};
    height: 100vh;
    overflow: auto;
    background: ${({ theme }) => theme.bg};
    position: sticky;
    top: 0;

    left: 0;
    left: ${({ isopen }) => (isopen ? `0` : `-${spacing.sidebarWidth}`)};
    padding: ${spacing.mdSpacing};
    transition: all 500ms ease-in-out;

    @media screen and (max-width: 700px) {
        display: ${({ isopen }) => (isopen ? `auto` : "none")};
        transition: all 500ms ease-in-out;
    } ;
`;

export const NgLogoWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    color: inherit;
    text-decoration: none;
    align-items: center;
`;

export const NgLogo = styled(FaPiedPiperPp)`
    font-size: 2rem;
    cursor: pointer;
    margin-right: ${spacing.smSpacing};
    img {
        max-width: 100%;
        height: auto;
    }
`;

export const NgCompanyName = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    display: ${({ isopen }) => (isopen ? "block" : "none")};

    @media screen and (max-width: 600px) {
        font-size: 1rem;
    }
`;

export const NgDivider = styled.div`
    height: 1px;
    width: 100%;
    background: ${({ theme }) => theme.bg3};
    margin: ${spacing.mdSpacing} 0;
`;

export const NgSidebarLinkContainer = styled.div`
    border-radius: ${spacing.borderRadius} 0px 0px ${spacing.borderRadius};
    background: ${({ theme, isActive }) =>
        !isActive ? `transparent` : theme.bg3};
    border-right: ${({ theme, isActive }) =>
        isActive ? `3px solid #0057D9` : theme.bg3};
    font-weight: ${({ isActive }) => (isActive ? `600` : "")};
    margin: 2px, 0;
    font-size: 0.95rem;

    &:hover {
        box-shadow: inset 0 0 0 1 ${({ theme }) => theme.bg3};
        font-weight: 600;
        border-right: 3px solid ${colors.primary};
        transition: all 0.2s ease-in-out;
    }

    @media screen and (max-width: 600px) {
        font-size: 0.7rem;
    }
`;

export const NgSidebarLinkWrapper = styled(RouterLink)`
    cursor: pointer;
    width: ${({ isopen }) => (!isopen ? `fit-content` : {})};
    align-items: center;
    display: flex;
    color: inherit;
    /* font-size: 16px; */
    text-decoration: none;
    padding-bottom: calc(${spacing.smSpacing} - 2px) 0;
`;

export const NgSidebarLinkIcon = styled.div`
    padding: ${spacing.smSpacing} ${spacing.smSpacing};
    display: flex;
    /* font-size: 18px; */
`;

export const NgSidebarLinkLabel = styled.div`
    margin-left: ${spacing.smSpacing};
    display: block;
    flex: 1;
    color: inherit;
    font-size: 12px;
    display: ${({ isopen }) => (isopen ? "block" : "none")};
`;

export const NgThemeContainer = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
`;

export const NgThemeWrapper = styled.div`
    cursor: pointer;
    width: ${({ isopen }) => (!isopen ? `fit-content` : {})};
    align-items: center;
    display: flex;
    color: inherit;
    font-size: 12px;
    text-decoration: none;
    padding: calc(${spacing.smSpacing} - 2px) 0;
`;

export const NgThemeLabel = styled.span`
    flex: 1;
    display: ${({ isopen }) => (isopen ? "block" : "none")};
`;

export const NgThemeToggler = styled.div`
    padding: ${spacing.smSpacing} ${spacing.smSpacing};
    display: flex;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    /* transform: rotate(180deg); */
`;
