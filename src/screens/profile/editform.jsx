import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Controls from "../../components/controls/Controls";
import ToastAlert from "../../components/display/ToastAlert";
import Loading from "../../components/display/Loader";

import { MainForm, useForm } from "../../components/useForm";
import { toTitleCase } from "../../utils/globalFunc";
import { FormButton } from "../../components/useForm/formElements";
import { NgPageContainer, NgPaper } from "../../components/display/elements";
import { readProfileAction, updateProfileAction } from "./actions";
import { FlexWrapper } from "../user.elements";
import { Avatar, Grid, Badge } from "@mui/material";
import { MdModeEditOutline } from "react-icons/md";

const ProfileEditForm = (props) => {
    const { editEntry, recordForEdit, propertyId } = props;
    const dispatch = useDispatch();
    
    const readProfile = useSelector((state) => state.readProfile);
    const { profile, success: successProfile } = readProfile;

    const updateProfile = useSelector((state) => state.updateProfile);
    const { loading, error, success } = updateProfile;

    const [file, setFile] = useState()
    const [photoURL, setPhotoUrl] = useState()


    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('company_name' in fieldValues)
            temp.company_name = fieldValues.company_name ? "" : "Company Name is Required"
        if('phone_number_1' in fieldValues)
            temp.phone_number_1 = fieldValues.phone_number_1 ? "" : "Primary Phone Number is Required"
        // if('quantity' in fieldValues)
        //     temp.quantity = fieldValues.quantity ? "" : "Quantity is Required"
            
        setErrors({ ...temp })

        // tests whether post array elements passes text implemented by validate() function
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const initialValues = {
        full_name: '',
        email: '',
        phone_number: '',
        profile: {
            emergency_contact: "",
            emergency_contact_name: "",
            emergency_contact_relationship: "",
            profile_pic: ""
        }
    }

    const { 
        values,  
        setValues,
        errors, 
        setErrors,
        handleResetForm,
        handleInputChange
    } = useForm(initialValues, true, validate);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('full_name', values.full_name)
        formData.append('email', values.email)
        formData.append('phone_number', values.phone_number);

        formData.append('profile_pic', file);

        formData.append('emergency_contact', values.profile.emergency_contact);
        formData.append('emergency_contact_name', values.profile.emergency_contact_name);
        formData.append('emergency_contact_relationship', values.profile.emergency_contact_relationship);
        
        dispatch(updateProfileAction(formData));
    };

    const handleProfileChange = e => {
        let profile = values.profile;
        var key = e.target.name;
        var value = e.target.value;
        profile[key] = value;
        setValues({
            ...values,
            profile,
            [key]: value
        });
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const photo_url = URL.createObjectURL(file);
          setFile(file)
          setPhotoUrl(photo_url)
        }
      };


    useEffect(() => {
        if(recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit, successProfile, error, setValues ])

    

 
    return (
        <NgPageContainer>
            {error && <ToastAlert severity="error">{error}</ToastAlert>}
            <NgPaper padded>
                <MainForm onSubmit={submitHandler}>
                    
                    <div style={{
                                textAlign: "center",
                                justifyContent: "center", 
                                display: "flex", 
                                alignItems: "center", 
                                flexDirection: "column"
                            }}>
                        <label htmlFor="profilePhoto">
                            <input
                                accept="image/*"
                                id="profilePhoto"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handlePhotoChange}
                            />
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={<MdModeEditOutline />}
                                >
                            <Avatar
                                src={photoURL ? photoURL : profile?.profile?.profile_pic}
                                sx={{ 
                                    width: 175, height: 175, 
                                    cursor: 'pointer', 
                                }}
                            />
                            </Badge>
                        </label>
                    </div>
                    {/* <Grid container spacing={1}> */}
                        <Grid item xs={12} sm={4}>
                            <Controls.InputField
                                value={values.full_name}
                                name="full_name"
                                onChange={handleInputChange}
                                label="Name"
                                onInput={(e) =>
                                    (e.target.value = toTitleCase(
                                        e.target.value
                                    ))
                                }
                            ></Controls.InputField>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Controls.InputField
                                value={values.phone_number}
                                name="phone_number"
                                onChange={handleInputChange}
                                label="Phone Number"
                            ></Controls.InputField>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Controls.InputField
                                value={values.email}
                                name="email"
                                onChange={handleInputChange}
                                label="Email"
                            ></Controls.InputField>
                        </Grid>
                    {/* </Grid> */}
                                
                    <h4>Emergency Contact Details</h4>
                    
                    
                        <Grid item xs={12} sm={4}>
                            <Controls.InputField 
                                value={values.profile.emergency_contact_name}
                                name='emergency_contact_name'
                                onChange={handleProfileChange}
                                label='Name' 
                                onInput={(e) => e.target.value = toTitleCase(e.target.value)}>        
                            </Controls.InputField>
                        </Grid>
                    <Grid container spacing={1}>

                        <Grid item xs={12} sm={6}>
                            <Controls.InputField
                                value={values.profile.emergency_contact}
                                name='emergency_contact'
                                onChange={handleProfileChange}
                                label='Contact'>
                            </Controls.InputField>
                        </Grid>
                            
                        <Grid item xs={12} sm={6}>
                            <Controls.InputField
                                value={values.profile.emergency_contact_relationship}
                                name='emergency_contact_relationship'
                                onChange={handleProfileChange}
                                label='Relationship'>
                            </Controls.InputField>
                        </Grid>
                    </Grid>

                    {loading ? (
                        <Loading btn />
                    ) : (
                        <FormButton type="submit">Submit</FormButton>
                    )}
                </MainForm>
            </NgPaper>

        </NgPageContainer>
    );
};

export default ProfileEditForm;
