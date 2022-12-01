import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";

import { TabTitle, toTitleCase } from "../../utils/globalFunc";
import { readProfileAction, updateProfileAction } from "./actions";

import ProfileEditForm from "./editform";

import Controls from "../../components/controls/Controls";
import ToastAlert from "../../components/display/ToastAlert";
import Loading from "../../components/display/Loader";
import { TableComponent } from "../../components/useTable/index";
import { Chip, TableTop } from "../../components/useTable/elements";
import { ActionButtonWrapper } from "../../components/controls/Button";
import ConfirmDialog from "../../components/display/dialog";
import Modal from "../../components/display/modal";
import {
    NgLink,
    NgPageContainer,
    NgPaper,
} from "../../components/display/elements";
import { DetailsWrapper, FlexWrapper, Icon, IconText, IconWrapper, InfoWrapper, Status, UserCard, UserInfoWrapper, UserName } from "../user.elements";
import { Avatar, Grid, IconButton } from "@mui/material";
import { FormButton } from "../../components/useForm/formElements";
import { MainForm } from "../../components/useForm";
import { RiMailSendLine, RiPhoneLine } from "react-icons/ri";
import moment from "moment";
import { FiCamera, FiClock, FiUser } from "react-icons/fi";
import { NgDivider } from "../../components/sidebar/sidebarElements";



function ProfileScreen() {
    const dispatch = useDispatch()
    
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);

    const [first_name, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [phone_number, setPhoneNumber] = useState('')

    const [date_of_birth, setDateOfBirth] = useState('')
    const [emergency_contact, setEmergencyContact] = useState('')
    const [emergency_contact_name, setEmergencyContactName] = useState('')
    const [emergency_contact_relationship, setEmergencyContactRelationShip] = useState('')

    const readProfile = useSelector(state => state.readProfile)
    const { error, loading, profile } = readProfile

    const updateProfile = useSelector(state => state.updateProfile)
    const { error: errorUpdate, loading: loadingUpdate, success } = updateProfile  

    const values = {
        emergency_contact,
        emergency_contact_name,
        emergency_contact_relationship
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProfileAction(values));
    }

    const editEntry = (property, handleResetForm) => {
        // dispatch(updateProfileAction(property));
        // setOpenPopup(false);
        // handleResetForm()
    };

    const editHandler = (profile) => {
        setRecordForEdit(profile);
        setOpenPopup(true);
    };

    TabTitle(`${profile?.full_name} . Profile`);

    useEffect(() => {
        dispatch(readProfileAction())
    }, [dispatch, success])

    return (
        <NgPageContainer>
        
                { loading && <Loading /> }
                { error && <ToastAlert severity="error">{error}</ToastAlert> }
                <UserCard>
                    <UserInfoWrapper>
                        <Avatar 
                            src={profile?.profile?.profile_pic}
                            variant="rounded" 
                            sx={{width: "120px", height: "120px", marginRight: "20px"}}
                        />
                       
                        <DetailsWrapper>
                            <UserName>{profile?.full_name}</UserName>
                            {profile?.is_active === true ? <Status active>active</Status> : <Status>dormant</Status>}
                        </DetailsWrapper>
                    </UserInfoWrapper>

                    <InfoWrapper>
                        <FlexWrapper>
                            <Icon><RiPhoneLine /></Icon>
                            <IconText>{profile?.phone_number}</IconText>
                        </FlexWrapper> 
                        <FlexWrapper>
                            <Icon><RiMailSendLine /></Icon>
                            <IconText>{profile?.email}</IconText>
                            {/* <a href={`mailto:${profile?.email}`}>{profile?.email}</a> */}
                        </FlexWrapper>
                    </InfoWrapper>

                    <FlexWrapper>
                        <Icon><FiClock /></Icon>
                        <IconText><p>Joined {moment(profile?.profile?.created_at).format("LLLL")}</p></IconText>
                    </FlexWrapper>

                    <IconWrapper>
                        <Controls.ActionButton
                            title="edit"
                            onClick={() => editHandler(profile)}
                            edit
                        >
                            <MdModeEditOutline />
                        </Controls.ActionButton>
                    </IconWrapper>
                </UserCard>

                { error && <ToastAlert severity="error">{error}</ToastAlert>}
                <NgPaper padded>
                    <h4>Secondary Contact Details</h4>
                    <NgDivider />
                    <p>Name: {profile?.profile?.emergency_contact_name}</p> 
                    <p>Phone Number: {profile?.profile?.emergency_contact}</p>
                    <p>Relationship: {profile?.profile?.emergency_contact_relationship}</p>
                </NgPaper>

                <Modal
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    title="Update Profile"
                    icon={<FiUser />}
                >
                    <ProfileEditForm
                        recordForEdit={recordForEdit}
                        editEntry={editEntry}
                    />
                </Modal>

        </NgPageContainer>
    );
}

export default ProfileScreen;
