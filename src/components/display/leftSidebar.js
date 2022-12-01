import React from "react";
import Tooltip from "@mui/material/Tooltip";

import {
    FilterBtn,
    FilterBtnContainer,
    LeftSidebarContainer,
    LeftSidebarHeader,
} from "./elements";
import Controls from "../controls/Controls";

import { NgDivider } from "../sidebar/sidebarElements";

export const FilterButton = ({ onClick, title }) => {
    return (
        <Tooltip title={title || "filter by"} placement="top-start">
            {/* <FilterBtnContainer > */}
            <FilterBtn onClick={onClick}>Active filter: month, year</FilterBtn>
            {/* </FilterBtnContainer> */}
        </Tooltip>
    );
};

const LeftSidebar = ({ large, tall, heading, isOpened, setIsOpened, children }) => {
    return (
        <LeftSidebarContainer large={large} tall={tall} isOpened={isOpened}>
            <LeftSidebarHeader>
                <p>{heading}</p>
                <Controls.CancelButton
                    flt
                    onClick={() => setIsOpened(false)}
                ></Controls.CancelButton>
            </LeftSidebarHeader>

            <NgDivider />

            {children}
        </LeftSidebarContainer>
    );
};

export default LeftSidebar;
