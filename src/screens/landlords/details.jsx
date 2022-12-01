import React, { useEffect, useState } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    MdDomain,
    MdEmail,
    MdOutlineHouse,
    MdPhoneAndroid,
} from "react-icons/md";

import Loading from "../../components/display/Loader";
import ToastAlert from "../../components/display/ToastAlert";

import {
    deleteLandlordAction,
    landlordDetailsAction,
    updateLandlordAction,
} from "./actions";
import {
    UserInfoWrapper,
    ProfilePicture,
    UserCard,
    UserName,
    DetailsWrapper,
    Status,
    Icon,
    IconText,
    FlexWrapper,
    InfoWrapper,
    Chip,
    UserLink,
    UserLinkWrapper,
    IconWrapper,
} from "../user.elements";
import { List, NgPageContainer } from "../../components/display/elements";
import Controls from "../../components/controls/Controls";

import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";

import Modal from "../../components/display/modal";
import ConfirmDialog from "../../components/display/dialog";
import LandlordEditForm from "./editform";

import { LandlordDetailContext } from "../../context";
import LandlordCards from "./landlord.dashboard";
import { RiCommunityLine, RiUser2Line } from "react-icons/ri";

import PropertyCardComponent from "../properties/property_card";
import { Avatar } from "@mui/material";
import { TabTitle } from "../../utils/globalFunc";
import PaperHeader from "../../components/display/paperHeader";

const LandlordDetailsScreen = () => {
    const match = { params: useParams() };
    const dispatch = useDispatch();

    const [confirmDialog, setConfirmDialog] = useState({
            open: false,
            title: "",
            subTitle: "",
        });
    
    const updateLandlord = useSelector(state => state.updateLandlord)
    const { success } = updateLandlord

    const landlordDetails = useSelector((state) => state.landlordDetails);
    const {
        loading,
        error,
        landlord,
        properties,
        properties_count,
        unit_count,
        groups,
        tenant_count,
    } = landlordDetails;

    const vacant_units = unit_count - tenant_count;

    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);

    const editEntry = (landlord, handleResetForm) => {
        dispatch(updateLandlordAction(landlord));
        // setOpenPopup(false);
        // handleResetForm()
    };

    const editHandler = (landlord) => {
        setRecordForEdit(landlord);
        setOpenPopup(true);
    };

    const deleteHandler = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            open: false,
        });
        dispatch(deleteLandlordAction(id));
    };

    useEffect(() => {
        dispatch(landlordDetailsAction(match.params.id));
    }, [dispatch, success]);

    TabTitle(landlord?.full_name);

    return (
        <>
            {  error ? 
                <ToastAlert severity="error">{error}</ToastAlert> : 
                loading ? 
                <Loading /> : 
                <>
                    <LandlordDetailContext.Provider
                        value={{
                            properties,
                            properties_count,
                            unit_count,
                            tenant_count,
                            vacant_units,
                        }}
                    >
                        <LandlordCards />
                    </LandlordDetailContext.Provider>

                    <>
                        <UserCard>
                            <UserInfoWrapper>
                                <Avatar variant="rounded" 
                                    sx={{width: "120px", height: "120px", marginRight: "20px"}} 
                                    src={landlord?.profile?.profile_pic} 
                                />
                                <DetailsWrapper>
                                    <FlexWrapper>
                                        {groups?.map((group) => (
                                            <Chip>{group}</Chip>
                                        ))}
                                    </FlexWrapper>

                                    <UserName>{landlord?.full_name}</UserName>
                                    {landlord?.is_active === true ? (
                                        <Status active>active</Status>
                                    ) : (
                                        <Status>inactive</Status>
                                    )}
                                    {/* <FlexWrapper>
                                            <Icon><MdOutlineHouse /></Icon>
                                            <IconText></IconText>
                                        </FlexWrapper> */}
                                </DetailsWrapper>
                            </UserInfoWrapper>

                            <InfoWrapper>
                                <FlexWrapper>
                                    <Icon>
                                        <MdPhoneAndroid />
                                    </Icon>
                                    <IconText>
                                        {landlord?.phone_number}
                                    </IconText>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <Icon>
                                        <MdEmail />
                                    </Icon>
                                    <IconText>{landlord?.email}</IconText>
                                </FlexWrapper>
                            </InfoWrapper>

                            {/* <FlexWrapper>
                                <Icon><RiCommunityLine /></Icon>
                                <IconText>
                                    My properties
                                    {properties?.map((property) => (
                                        
                                        <UserLinkWrapper>
                                            <UserLink
                                                to={`/property/${property?.slug}`}
                                            >
                                                {property?.name} - {property?.units?.length} units
                                            </UserLink>
                                        </UserLinkWrapper>
                                    ))}
                                </IconText>
                            </FlexWrapper> */}

                            <IconWrapper>
                                <Controls.ActionButton
                                    title="edit"
                                    onClick={() => editHandler(landlord)}
                                    edit
                                >
                                    <MdModeEditOutline />
                                </Controls.ActionButton>
                                <Controls.ActionButton
                                    title="delete"
                                    onClick={() => {
                                        setConfirmDialog({
                                            open: true,
                                            title: "Are you sure you want to delete this Landlord?",
                                            subTitle:
                                                "You can't undo this operation",
                                            onConfirm: () => {
                                                deleteHandler(landlord?.slug);
                                            },
                                        });
                                    }}
                                >
                                    <MdDeleteOutline />
                                </Controls.ActionButton>
                            </IconWrapper>
                        </UserCard>
                        
                        <PaperHeader 
                            heading="Properties"
                        >
                            <RiCommunityLine />
                        </PaperHeader>
                        
                        <PropertyCardComponent
                            properties={properties}
                            count={properties_count}
                        />
                    </>
                </>
            }
        
            <Modal
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                title="Edit Landlord"
                icon={<RiUser2Line />}
            >
                <LandlordEditForm
                    recordForEdit={recordForEdit}
                    editEntry={editEntry}
                />
            </Modal>

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    );
};

export default LandlordDetailsScreen;
