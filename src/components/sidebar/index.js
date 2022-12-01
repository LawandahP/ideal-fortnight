import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FcIdea, FcSettings } from "react-icons/fc";
import { MdDarkMode, MdOutlineMoney } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App";

import {
    NgSidebarContainer,
    NgLogo,
    NgDivider,
    NgCompanyName,
    NgLogoWrapper,
    NgSidebarLinkContainer,
    NgSidebarLinkWrapper,
    NgSidebarLinkLabel,
    NgSidebarLinkIcon,
    NgThemeContainer,
    NgThemeLabel,
    NgThemeToggler,
    NgThemeWrapper,
} from "./sidebarElements";


import {
    FcManager,
    FcWorkflow,
    FcSupport,
} from "react-icons/fc";
import { FiUsers, FiFileText, FiLogOut } from "react-icons/fi";
import { RiHome4Line, RiCommunityLine } from "react-icons/ri";
import ToastAlert from "../display/ToastAlert";
import { logout } from "../../auth/users/actions";
import { FaFileInvoiceDollar, FaRegMoneyBillAlt } from "react-icons/fa";
import { accountDetailsAction } from "../../screens/account/actions";

const Sidebar = ({ isopen }) => {
    const { theme, setTheme } = useContext(ThemeContext);
    const dispatch = useDispatch();

    const { pathname } = useLocation();
    const navigate = useNavigate()

    const readProfile = useSelector((state) => state.readProfile);
    const { error, loading, profile } = readProfile;

    const roles = profile?.groups;

    console.log(roles);

    const handleToggleTheme = () => {
        if (theme == "light") {
            localStorage.setItem('theme', "dark")
        } else {
            localStorage.setItem('theme', "light")
        }
    };
    
    const logoutHandler = () => {
        dispatch(logout());  
        navigate('/signin')
    };

    useEffect(() => {
        dispatch(accountDetailsAction())
    }, [])

    return (
        <NgSidebarContainer isopen={isopen}>
            {error && ""}
            <NgLogoWrapper to="/">
                <NgLogo />
                <NgCompanyName isopen={isopen}>KgHomes</NgCompanyName>
            </NgLogoWrapper>

            <NgDivider />

            {
                roles?.includes("REALTOR") ||
                roles?.includes("LANDLORD") ? (
                <NgSidebarLinkContainer isActive={pathname === "/"}>
                    <NgSidebarLinkWrapper isopen={isopen} to="/">
                        <NgSidebarLinkIcon>
                            <FcWorkflow />
                        </NgSidebarLinkIcon>
                        <NgSidebarLinkLabel isopen={isopen}>
                            Dashboard
                        </NgSidebarLinkLabel>
                    </NgSidebarLinkWrapper>
                </NgSidebarLinkContainer>
            ) : (
                ""
            )}

            {
                roles?.includes("TENANT") &&
                <NgSidebarLinkContainer isActive={pathname === "/tenants/me"}>
                    <NgSidebarLinkWrapper isopen={isopen} to="/tenants/me">
                        <NgSidebarLinkIcon>
                            <FcWorkflow />
                        </NgSidebarLinkIcon>
                        <NgSidebarLinkLabel isopen={isopen}>
                            Dashboard
                        </NgSidebarLinkLabel>
                    </NgSidebarLinkWrapper>
                </NgSidebarLinkContainer>
            }

            {roles?.includes("REALTOR") ? (
                <>
                    <NgSidebarLinkContainer isActive={pathname === "/tenants"}>
                        <NgSidebarLinkWrapper isopen={isopen} to="/tenants">
                            <NgSidebarLinkIcon>
                                <FiUsers />
                            </NgSidebarLinkIcon>
                            <NgSidebarLinkLabel isopen={isopen}>
                                Tenants
                            </NgSidebarLinkLabel>
                        </NgSidebarLinkWrapper>
                    </NgSidebarLinkContainer>

                    <NgSidebarLinkContainer
                        isActive={pathname === "/landlords"}>
                        <NgSidebarLinkWrapper isopen={isopen} to="/landlords">
                            <NgSidebarLinkIcon>
                                <FcManager />
                            </NgSidebarLinkIcon>
                            <NgSidebarLinkLabel isopen={isopen}>
                                Landlords
                            </NgSidebarLinkLabel>
                        </NgSidebarLinkWrapper>
                    </NgSidebarLinkContainer>
                </>
            ) : (
                ""
            )}

            {roles?.includes("REALTOR") ? (
                <>
                    <NgSidebarLinkContainer
                        isActive={pathname === "/properties"}
                    >
                        <NgSidebarLinkWrapper isopen={isopen} to="/properties">
                            <NgSidebarLinkIcon>
                                <RiCommunityLine />
                            </NgSidebarLinkIcon>
                            <NgSidebarLinkLabel isopen={isopen}>
                                Properties
                            </NgSidebarLinkLabel>
                        </NgSidebarLinkWrapper>
                    </NgSidebarLinkContainer>

                    <NgSidebarLinkContainer isActive={pathname === "/units"}>
                        <NgSidebarLinkWrapper isopen={isopen} to="/units">
                            <NgSidebarLinkIcon>
                                <RiHome4Line />
                            </NgSidebarLinkIcon>
                            <NgSidebarLinkLabel isopen={isopen}>
                                Units
                            </NgSidebarLinkLabel>
                        </NgSidebarLinkWrapper>
                    </NgSidebarLinkContainer>
                </>
            ) : (
                ""
            )}

            { 
                roles?.includes("LANDLORD") ? (
                <>
                    <NgSidebarLinkContainer
                        isActive={pathname === "/me/tenants"}
                    >
                        <NgSidebarLinkWrapper isopen={isopen} to="/me/tenants">
                            <NgSidebarLinkIcon>
                                <FiUsers />
                            </NgSidebarLinkIcon>
                            <NgSidebarLinkLabel isopen={isopen}>
                                Tenants
                            </NgSidebarLinkLabel>
                        </NgSidebarLinkWrapper>
                    </NgSidebarLinkContainer>

                    <NgSidebarLinkContainer
                        isActive={pathname === "/properties"}
                    >
                        <NgSidebarLinkWrapper isopen={isopen} to="/properties">
                            <NgSidebarLinkIcon>
                                <RiCommunityLine />
                            </NgSidebarLinkIcon>
                            <NgSidebarLinkLabel isopen={isopen}>
                                My Properties
                            </NgSidebarLinkLabel>
                        </NgSidebarLinkWrapper>
                    </NgSidebarLinkContainer>

                    <NgSidebarLinkContainer isActive={pathname === "/me/units"}>
                        <NgSidebarLinkWrapper isopen={isopen} to="/me/units">
                            <NgSidebarLinkIcon>
                                <RiHome4Line />
                            </NgSidebarLinkIcon>
                            <NgSidebarLinkLabel isopen={isopen}>
                                Units
                            </NgSidebarLinkLabel>
                        </NgSidebarLinkWrapper>
                    </NgSidebarLinkContainer>
                </>
            ) : (
                ""
            )}

            <NgDivider />

            {roles?.includes("REALTOR") &&
                <NgSidebarLinkContainer isActive={pathname === "/lease"}>
                    <NgSidebarLinkWrapper isopen={isopen} to="/lease">
                        <NgSidebarLinkIcon>
                            <FiFileText />
                        </NgSidebarLinkIcon>
                        <NgSidebarLinkLabel isopen={isopen}>
                            Lease
                        </NgSidebarLinkLabel>
                    </NgSidebarLinkWrapper>
                </NgSidebarLinkContainer>
            }


            {roles?.includes("TENANT") &&
                <NgSidebarLinkContainer isActive={pathname === "/lease"}>
                    <NgSidebarLinkWrapper isopen={isopen} to="/lease">
                        <NgSidebarLinkIcon>
                            <FiFileText />
                        </NgSidebarLinkIcon>
                        <NgSidebarLinkLabel isopen={isopen}>
                            Lease and Files
                        </NgSidebarLinkLabel>
                    </NgSidebarLinkWrapper>
                </NgSidebarLinkContainer>
            }

            {roles?.includes("REALTOR") &&
                <NgSidebarLinkContainer
                    isActive={pathname === "/invoices"}>
                    <NgSidebarLinkWrapper isopen={isopen} to="/invoices">
                        <NgSidebarLinkIcon>
                            <FaFileInvoiceDollar />
                        </NgSidebarLinkIcon>
                        <NgSidebarLinkLabel isopen={isopen}>
                            Invoices
                        </NgSidebarLinkLabel>
                    </NgSidebarLinkWrapper>
                </NgSidebarLinkContainer>
            }

            {roles?.includes("TENANT") &&
                <NgSidebarLinkContainer
                    isActive={pathname === "/tenants/me/invoices/"}>
                    <NgSidebarLinkWrapper isopen={isopen} to="/tenants/me/invoices/">
                        <NgSidebarLinkIcon>
                            <FaFileInvoiceDollar />
                        </NgSidebarLinkIcon>
                        <NgSidebarLinkLabel isopen={isopen}>
                            My Invoices
                        </NgSidebarLinkLabel>
                    </NgSidebarLinkWrapper>
                </NgSidebarLinkContainer>
            }

                {roles?.includes("REALTOR") &&
                    <>
                        <NgSidebarLinkContainer
                            isActive={pathname === "/payments" || pathname === "/payments/:id"}>
                            <NgSidebarLinkWrapper isopen={isopen} to="/payments">
                                <NgSidebarLinkIcon>
                                    <FaRegMoneyBillAlt />
                                </NgSidebarLinkIcon>
                                <NgSidebarLinkLabel isopen={isopen}>
                                    Payments
                                </NgSidebarLinkLabel>
                            </NgSidebarLinkWrapper>
                        </NgSidebarLinkContainer>
                        <NgDivider />
                    </>    
                }

            {roles?.includes("LANDLORD") &&
                <NgSidebarLinkContainer
                    isActive={
                        pathname === "/me/invoices" ||
                        pathname === "/invoices/:id"
                    }
                >
                    <NgSidebarLinkWrapper isopen={isopen} to="/me/invoices">
                        <NgSidebarLinkIcon>
                            <MdOutlineMoney />
                        </NgSidebarLinkIcon>
                        <NgSidebarLinkLabel isopen={isopen}>
                            Invoices
                        </NgSidebarLinkLabel>
                    </NgSidebarLinkWrapper>
                </NgSidebarLinkContainer>
            }

            {/* {roles?.includes("LANDLORD") &&
                <NgSidebarLinkContainer
                    isActive={pathname === "/maintenance"}
                >
                    <NgSidebarLinkWrapper isopen={isopen} to="/maintenance">
                        <NgSidebarLinkIcon>
                            <FcSupport />
                        </NgSidebarLinkIcon>
                        <NgSidebarLinkLabel isopen={isopen}>
                            Maintenance
                        </NgSidebarLinkLabel>
                    </NgSidebarLinkWrapper>
                </NgSidebarLinkContainer>
           } */}

            {/* {roles?.includes("REALTOR") &&
                <NgSidebarLinkContainer
                    isActive={pathname === "/maintenance"}
                >
                    <NgSidebarLinkWrapper isopen={isopen} to="/maintenance">
                        <NgSidebarLinkIcon>
                            <FcSupport />
                        </NgSidebarLinkIcon>
                        <NgSidebarLinkLabel isopen={isopen}>
                            Maintenance
                        </NgSidebarLinkLabel>
                    </NgSidebarLinkWrapper>
                </NgSidebarLinkContainer>
            } */}


            {roles?.includes("TENANT") &&
                <>
                    <NgSidebarLinkContainer
                        isActive={pathname === "/tenants/me/payments" || pathname === "/payments/:id"}>
                        <NgSidebarLinkWrapper isopen={isopen} to="/tenants/me/payments">
                            <NgSidebarLinkIcon>
                                <FaRegMoneyBillAlt />
                            </NgSidebarLinkIcon>
                            <NgSidebarLinkLabel isopen={isopen}>
                                Payment History
                            </NgSidebarLinkLabel>
                        </NgSidebarLinkWrapper>
                    </NgSidebarLinkContainer>
                    <NgDivider />
                </>    
            }

            {/* {roles?.includes("TENANT") &&
                <>
                    <NgSidebarLinkContainer
                        isActive={pathname === "/tenants/me/maintenance"}
                    >
                        <NgSidebarLinkWrapper isopen={isopen} to="/tenants/me/maintenance">
                            <NgSidebarLinkIcon>
                                <FcSupport />
                            </NgSidebarLinkIcon>
                            <NgSidebarLinkLabel isopen={isopen}>
                                Maintenance
                            </NgSidebarLinkLabel>
                        </NgSidebarLinkWrapper>
                    </NgSidebarLinkContainer>
                </>
            } */}

            
            <NgDivider />

            {roles?.includes("REALTOR") &&
                <>
                    <NgSidebarLinkContainer
                        isActive={pathname === "/settings"}
                    >
                        <NgSidebarLinkWrapper isopen={isopen} to="/settings">
                            <NgSidebarLinkIcon>
                                <FcSettings />
                            </NgSidebarLinkIcon>
                            <NgSidebarLinkLabel isopen={isopen}>
                                Settings
                            </NgSidebarLinkLabel>
                        </NgSidebarLinkWrapper>
                    </NgSidebarLinkContainer>
                </>
            }

            <NgThemeContainer onClick={handleToggleTheme}>
                <NgThemeWrapper>
                    <NgThemeToggler
                        title={
                            theme === "light"
                                ? "switch to dark mode"
                                : "switch to light mode"
                        }
                        
                    >
                        {theme === "dark" ? <FcIdea /> : <MdDarkMode />}
                    </NgThemeToggler>
                    <NgSidebarLinkLabel isopen={isopen}>
                        {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </NgSidebarLinkLabel>
                </NgThemeWrapper>
            </NgThemeContainer>

            {/* <NgSidebarLinkContainer key="Logout">
                <NgSidebarLinkWrapper isopen={isopen}>
                    <NgSidebarLinkIcon><FiLogOut /></NgSidebarLinkIcon>
                    <NgSidebarLinkLabel isopen={isopen}>Logout</NgSidebarLinkLabel>
                </NgSidebarLinkWrapper>
            </NgSidebarLinkContainer> */}
            <>
                <button onClick={logoutHandler}>Logout</button>
            </>
        </NgSidebarContainer>
    );
};

export default Sidebar;

// label: "Landlords",
//         icon: <FcTodoList />,
//         to: "/landlords",
