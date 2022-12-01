import { FaBitbucket, FaCar, FaHouzz, FaPeopleCarry, FaSearchengin, FaStackExchange } from "react-icons/fa";
import { FcElectroDevices, FcHome, FcManager, FcSearch, FcSettings, FcStatistics, FcWorkflow, FcSupport, FcLineChart, FcTodoList } from 'react-icons/fc'

export const sideBarLinks = [

    {
        label: "Dashboard",
        icon: <FcWorkflow />,
        to: "/dashboard",
        // notification: 5
    },
    {
        label: "Tenants",
        icon: <FcManager />,
        to: "/tenants",
        // notification: 5
    },
    {
        label: "Landlords",
        icon: <FcTodoList />,
        to: "/landlords",
        // notification: 5
    },
    {
        label: "Properties",
        icon: <FcLineChart />,
        to: "/properties",
        // notification: 5
    },
    {
        label: "Units",
        icon: <FcSupport />,
        to: "/units",
        // notification: 5
    },
    {
        label: "Employees",
        icon: <FcManager />,
        to: "/employees",
        // notification: 5
    },

]

export const sideBarLinks2 = [

    {
        label: "Engines",
        icon: <FcElectroDevices />,
        to: "/engines",
        // notification: 5
    },
    {
        label: "Settings",
        icon: <FcSettings />,
        to: "/settings",
        // notification: 5
    },

]