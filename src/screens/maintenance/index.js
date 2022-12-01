import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TableComponent } from "../../components/useTable";

import { NgPageContainer } from "../../components/display/elements";

import { TabTitle } from "../../utils/globalFunc";

import MaintenanceTable from "./list";



const MaintenanceList = () => {
    TabTitle("Maintenances")

    const readMaintenance = useSelector((state) => state.readMaintenance);
    const { loading, error, maintenances, count } = readMaintenance;
       
    return (
        <NgPageContainer>
            <MaintenanceTable
                loading={loading}
                error={error}
                maintenances={maintenances}
                count={count}
            />
        </NgPageContainer>
    );
};

export default MaintenanceList;
