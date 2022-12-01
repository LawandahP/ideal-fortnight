import React, { useEffect, useState } from "react";

import "./nav.css";
import {
    FaUserShield,
    FaAngleDown,
    FaUserCircle,
    FaSignOutAlt,
    FaAngleUp,
} from "react-icons/fa";
import { FcSettings, FcPrivacy } from "react-icons/fc";
import { FiArrowLeft } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { readProfileAction } from "../../screens/profile/actions";
import {
    IconButton,
    NgSideBarToggleButton,
    NvItem,
    MenuItem,
    DropDown,
    ProfileContainer,
    ProfileInfoWrapper,
    UserName,
    UserRole,
} from "./navbarElements";
import { NgNavContainer } from "./navbarElements";

import { CSSTransition } from "react-transition-group";
import CustomAvatar from "../display/CustomAvatar";

import { Avatar } from "@mui/material";
import { textTitleCase, toTitleCase } from "../../utils/globalFunc";

const DropDownMenu = () => {
    const [activeMenu, setActiveMenu] = useState("main");
    const [menuHeight, setMenuHeight] = useState(null);

    function calcHeight(el) {
        const height = el.offSetHeight;
        setMenuHeight(height);
    }

    const DropDownItem = (props) => {
        return (
            <MenuItem
                to={props.to}
            >
                <IconButton>{props.rightIcon}</IconButton>
                {props.children}
                {/* <IconButton>{leftIcon}</IconButton> */}
            </MenuItem>
        );
    };
    return (
        <DropDown>
            <div className="menu">
                <DropDownItem to="/profile" rightIcon={<FaUserCircle />}>
                    My profile
                </DropDownItem>
                {/* <DropDownItem rightIcon={<FaUbuntu />}>My profile</DropDownItem> */}
                <DropDownItem
                    to="/"
                    rightIcon={<FcSettings />}
                    goToMenu="settings"
                >
                    Settings
                </DropDownItem>
                {/* <DropDownItem rightIcon={<FcPrivacy />}>
                    Logout
                </DropDownItem> */}
            </div>
        </DropDown>
    );
};

const NavItem = ({ icon, fill, children }) => {
    const [isDropDownOpen, setIsDropdownOpen] = useState(false);
    return (
        <NvItem>
            <IconButton fill={fill}>{icon}</IconButton>
        </NvItem>
    );
};

const Navbar = ({ toggle, isopen }) => {
    const dispatch = useDispatch();

    const readProfile = useSelector((state) => state.readProfile);
    const { error, loading, profile } = readProfile;

    const [isDropDownOpen, setIsDropdownOpen] = useState(false);
    // console.log(profile)

    // useEffect(() => {
    //     dispatch(readProfileAction());
    // }, []);

    return (
        <NgNavContainer>
            <NgSideBarToggleButton isopen={isopen} onClick={toggle} />
            {/* <NavItem fill icon={<FaUserShield />} onClick={() => setIsDropdownOpen(!isDropDownOpen)}>
			
			</NavItem> */}

            <ProfileContainer
                onClick={() => setIsDropdownOpen(!isDropDownOpen)}
            >
                {/* {isDropDownOpen} */}
                <ProfileInfoWrapper right>
                    <UserName>{toTitleCase(profile?.full_name)}</UserName>
                    {profile?.groups?.map((group) => (
                        <UserRole key={group}>{toTitleCase(group)}</UserRole>
                    ))}
                </ProfileInfoWrapper>
                    {  profile?.profile?.profile_pic 
                    ? <Avatar src={profile?.profile?.profile_pic} /> 
                    : <Avatar {...CustomAvatar(profile?.full_name)} />
                    }
                <NavItem
                    icon={isDropDownOpen ? <FaAngleUp /> : <FaAngleDown />}
                />
                {isDropDownOpen && <DropDownMenu />}
            </ProfileContainer>

        </NgNavContainer>
    );
};

export default Navbar;
