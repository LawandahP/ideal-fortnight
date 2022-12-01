import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

import { borderRadius, colors, navBarStyles } from "../../styles/variables";
import { FaAngleLeft } from "react-icons/fa";

export const NgNavContainer = styled.nav`
    background: ${({ theme }) => theme.bg3};
    z-index: 1;
    height: ${navBarStyles.height};
    display: flex;
    justify-content: right;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    right: 0;
    padding-right: 5px;
    transition: all 500ms ease-in-out;

    @media screen and (max-width: 960px) {
        transition: all 500ms ease-in-out;
    } ;
`;

export const NgSideBarToggleButton = styled(FaAngleLeft)`
    color: #fff;
    display: block;
    position: absolute;
    left: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    color: inherit;
    cursor: pointer;
    transform: ${({ isopen="true" }) => (!isopen ? `rotate(180deg)` : `initial`)};
    transition: all 500ms ease-in-out inline;
`;

export const ProfileAvatar = styled.div`
    /* color: #fff; */
    z-index: 0;
    display: block;
    position: absolute;
    right: 20px;
    border: 1px solid;
    padding: 5px;
    border-radius: 50px;
    font-size: 12px;
    cursor: pointer;

    &:hover {
        transform: scale(1.01);
        transition: ${colors.primary} 0.2s ease-in-out;
    }
`;

export const NvItem = styled.li`
    /* width: calc(${navBarStyles.height}*0.8); */

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const IconButton = styled.a`
    /* width: calc(${navBarStyles.height}*0.5); */
    height: calc(${navBarStyles.height}*0.5);
    background-color: ${({ fill }) => (fill ? `grey` : `none`)};
    border-radius: 50%;
    padding: 5px;
    margin: 2px 5px 2px 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: filter 300ms;
    cursor: pointer;

    &:hover {
        filter: brightness(1.2);
    }
`;

export const DropDown = styled.div`
    position: absolute;
    top: 58px;
    width: 200px;
    transform: translateX(-15%);
    background-color: ${({ theme }) => theme.bg3};
    border-radius: ${borderRadius.sm};
    border: 1px solid #525357;
    padding: 0.5rem;
    overflow: hidden;
    z-index: 200;
    /* transition: height 200ms ease; */
`;
export const MenuItem = styled(LinkRouter)`
    height: 40px;
    font-size: 14px;
    display: flex;
    align-items: center;
    border-radius: ${borderRadius.sm};
    transition: 500ms;
    padding: 0.5rem;
    text-decoration: none;
    color: grey;

    &:hover {
        background-color: #525357;
    }
`;

export const ProfileContainer = styled.div`
    display: flex;
    gap: 3px;
    align-items: center;
    /* justify-content: center; */
    cursor: pointer;
    padding: 5px;

    /* &:hover {
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;;
    } */
`;

export const ProfileInfoWrapper = styled.div`
    display: block;
    text-align: ${({ right }) => (right ? `right` : `left`)}; ;
`;

export const UserName = styled.p`
    font-size: 12px;
    font-weight: 600;
`;
export const UserRole = styled.p`
    font-size: 10px;
    color: grey;
`;
