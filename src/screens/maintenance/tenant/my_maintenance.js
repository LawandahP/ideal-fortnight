import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import ToastAlert from "../../../components/display/ToastAlert";
import Loader from "../../../components/display/Loader";
import { FcSupport } from "react-icons/fc";
import { TiArrowSync } from "react-icons/ti";

import { List, NgPaper } from "../../../components/display/elements";
import { config } from "../../../utils/globalFunc";
import {
    Category,
    CategoryButton,
    Container,
    Data,
    Header,
    HeaderContainer,
    InfoContainer,
    MaintenanceCard,
    MaintenanceContainer,
    MaintenanceImage,
    MaintenanceImageContainer,
    MaintenanceStatus,
    NgDivider,
    RefreshButton,
    SectionGrid,
    SectionInline,
    Title,
} from "../elements";
import NotFound from "../../../components/display/notFound";
import { TLeaseFlex } from "../../lease/elements";
import { FlexWrapper, Icon, IconText } from "../../user.elements";

const MyMaintenance = () => {
    const [count, setCount] = useState();
    const [resolveLoading, setResolveLoading] = useState(false);
    const [resolveSuccess, setResolveSuccess] = useState();

    const [cancelLoading, setCancelLoading] = useState(false);
    const [cancelSuccess, setCancelSuccess] = useState();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [maintenances, setMaintenances] = useState([]);

    const getMaintenance = async () => {
        setLoading(true);
        await axios
            .get(`/my/maintenance/requests`, config)
            .then((res) => {
                setLoading(false);
                console.log("my_maintenances", res?.data);
                setMaintenances(res?.data?.data?.payload);
                setCount(res?.data?.data?.count);
                // setAuth({ checkUser, password, roles });
            })
            .catch((err) => {
                setError(
                    err.response && err.response.data.detail ? (
                        <>
                            {Object.keys(err.response.data.detail).map(
                                function (s) {
                                    return (
                                        <List>
                                            {err.response.data.detail[s]}
                                        </List>
                                    );
                                }
                            )}
                        </>
                    ) : (
                        err.message
                    )
                );
                setLoading(false);
            });
    };

    const cancelRequest = async (id) => {
        setCancelLoading(true);
        await axios
            .put(`/maintenance/cancelled/${id}`, config)
            .then((res) => {
                setCancelLoading(false);
                setCancelSuccess(true);
            })
            .catch((err) => {
                setCancelLoading(false);
                setCancelSuccess(false);
                setError(
                    err.response && err.response.data.detail ? (
                        <>
                            {Object.keys(err.response.data.detail).map(
                                function (s) {
                                    return (
                                        <List>
                                            {err.response.data.detail[s]}
                                        </List>
                                    );
                                }
                            )}
                        </>
                    ) : (
                        err.message
                    )
                );
            });
    };

    useEffect(() => {
        getMaintenance();
    }, [resolveSuccess, cancelSuccess]);

    return (
        <NgPaper padded>
            <TLeaseFlex>
                <FlexWrapper>
                    <Icon>
                        <FcSupport />
                    </Icon>
                    <IconText header>Maintenance ({count} Requests)</IconText>
                </FlexWrapper>
                <RefreshButton title="refresh" onClick={getMaintenance} />
            </TLeaseFlex>

            <NgDivider header />

            {loading ? (
                <Loader />
            ) : error ? (
                <ToastAlert severity="error">{error}</ToastAlert>
            ) : count > 0 ? (
                <MaintenanceContainer>
                    {maintenances?.map((maintenance) => (
                        <MaintenanceCard key={maintenance.id}>
                            <MaintenanceStatus
                                UnResolved={maintenance.status === "UnResolved"}
                                Resolved={maintenance.status === "Resolved"}
                                Pending={maintenance.status === "Pending"}
                                Cancelled={maintenance.status === "Cancelled"}
                            >
                                {maintenance.status}
                            </MaintenanceStatus>
                            <MaintenanceImageContainer>
                                {/* { maintenance?.maintenance_images?.map((image) => { */}
                                {maintenance?.images?.map((image) => (
                                    <MaintenanceImage src={image?.file_url} />
                                ))}

                                {/* //     console.log(image.file_url) */}
                                {/* // })}  */}
                            </MaintenanceImageContainer>
                            <InfoContainer>
                                <Category>{maintenance?.category}</Category>

                                <SectionGrid>
                                    <SectionInline>
                                        <Title>CREATED BY</Title>
                                        <Data>
                                            {maintenance?.user?.full_name}
                                        </Data>

                                        <NgDivider />

                                        <Title>CONSENT BY</Title>
                                        {maintenance?.grant_entry === true ? (
                                            <Data>
                                                {maintenance?.user?.full_name}
                                            </Data>
                                        ) : (
                                            <Data>N/A</Data>
                                        )}

                                        <NgDivider />

                                        <Title>RESOLVED ON</Title>
                                        {maintenance?.resolved_on ? (
                                            <Data>
                                                {moment(
                                                    maintenance?.resolved_on
                                                ).format("ll")}
                                            </Data>
                                        ) : (
                                            <Data>N/A</Data>
                                        )}
                                    </SectionInline>

                                    <SectionInline>
                                        <Title>RAISED ON</Title>
                                        <Data>
                                            {moment(
                                                maintenance?.created_at
                                            ).format("ll")}
                                        </Data>

                                        <NgDivider />

                                        <Title>CONSENT ALLOWED</Title>
                                        {maintenance?.grant_entry === true ? (
                                            <Data style={{ color: "#0057D9" }}>
                                                Yes
                                            </Data>
                                        ) : (
                                            <Data style={{ color: "red" }}>
                                                No
                                            </Data>
                                        )}
                                    </SectionInline>
                                </SectionGrid>
                                <Title>Description</Title>
                                <Data>{maintenance?.description}</Data>

                                <NgDivider />

                                <SectionGrid>
                                    {maintenance?.status === "Cancelled" ? (
                                        ""
                                    ) : maintenance?.status === "Resolved" ? (
                                        ""
                                    ) : (
                                        <>
                                            <SectionInline>
                                                <CategoryButton
                                                    cancel
                                                    onClick={() =>
                                                        cancelRequest(
                                                            maintenance?.id
                                                        )
                                                    }
                                                >
                                                    {cancelLoading
                                                        ? "cancelling request ..."
                                                        : "Cancel Request"}
                                                </CategoryButton>
                                            </SectionInline>
                                        </>
                                    )}
                                </SectionGrid>
                            </InfoContainer>
                        </MaintenanceCard>
                    ))}
                </MaintenanceContainer>
            ) : (
                <>
                    <NotFound text="No Requests found" />
                </>
            )}
        </NgPaper>
    );
};

export default MyMaintenance;
