import React, { useState } from "react";
import Navbar from "../navbar";
import Sidebar from "../sidebar";
import { NgLayout, NgMain, NgMainContainer } from "./layoutElements";

const Layout = ({ children }) => {
    const [sideBarOpen, setSideBarOpen] = useState(true);

    const handleToggleSideBar = () => {
        setSideBarOpen((prev) => !prev);
    };

    return (
        <NgLayout>
            <Sidebar isopen={sideBarOpen} toggle={handleToggleSideBar} />
            <NgMainContainer>
                <Navbar toggle={handleToggleSideBar} isopen={sideBarOpen} />
                <NgMain>{children}</NgMain>
            </NgMainContainer>
        </NgLayout>
    );
};

export default Layout;
