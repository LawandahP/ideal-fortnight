import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TabTitle, toTitleCase } from "../../utils/globalFunc";

import {
    NgLink,
    NgPaper,
    List,
    NgPageContainer,
} from "../../components/display/elements";

import UnitsList from "./list";

function UnitReadScreen() {
    TabTitle("Units");

    const [search, setSearch] = useState({
        fn: (items) => {
            return items;
        },
    });

    const readUnits = useSelector((state) => state.readUnits);
    const { loading: loadingRead, error: errorRead, units, count } = readUnits;

    const handleSearch = (e) => {
        e.preventDefault();
        let target = e.target;
        setSearch({
            fn: (items) => {
                if (target.value === "") return items;
                else
                    return items.filter((x) =>
                        x.unit_no.includes(toTitleCase(e.target.value))
                    );
            },
        });
    };

    return (
        <NgPageContainer>
            <UnitsList
                loadingRead={loadingRead}
                errorRead={errorRead}
                units={units}
                count={count}
            />
        </NgPageContainer>
    );
}

export default UnitReadScreen;
