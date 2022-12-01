import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NgPageContainer, NgPaper } from '../../../components/display/elements'
import Controls from '../../../components/controls/Controls'
import ToastAlert from '../../../components/display/ToastAlert'

import { Container, CategoryWrapper, ControlLabel, InlineContainer, HeaderContainer, Header, NgDivider } from '../elements'
import { MdLocalFireDepartment, MdPlumbing, MdElectricalServices, MdAir, MdConnectedTv, MdOutlineSettingsSuggest } from "react-icons/md"

import { MainForm, useForm } from '../../../components/useForm'
import { createMaintenanceRequestAction } from '../actions'
import { FormButton, FormButtonWrapper } from '../../../components/useForm/formElements'
import { FiCoffee } from 'react-icons/fi'

import Loader from '../../../components/display/Loader'
import DropFileInput from '../../../components/drag_and_drop/DropFileInput'
import MaintenanceList from '../index'
import MyMaintenance from './my_maintenance'
import { TLeaseFlex } from '../../lease/elements'
import { FlexWrapper, Icon, IconText } from '../../user.elements'
import { FaSimplybuilt } from 'react-icons/fa'
import PaperHeader from '../../../components/display/paperHeader'

// interface {

// }

const MaintenanceRequestForm = () => {
    const [select, setSelect] = useState(null);
    const [ files, setFiles] = useState([])

    const dispatch = useDispatch()
    
    const createMaintenance = useSelector(state => state.createMaintenance)
    const { loading, error, success, message } = createMaintenance

    const readProfile = useSelector(state => state.readProfile)
    const { error: errorProfile, loading: loadingProfile, profile } = readProfile

    const roles = profile?.groups

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        // if('category' in fieldValues)
        //     temp.category = fieldValues.category ? "" : "Category is Required"
        if('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "Description is Required"
               
        setErrors({ ...temp })

        // tests whether post array elements passes text implemented by validate() function
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    
    const radioItems = [
        { id:true, title: 'Yes'},
        { id:false, title: 'No'}
    ]

    const categoryList = [
        { id: "Electricity", title: 'Electricity', icon: <MdElectricalServices />},
        { id: "Plumbing", title: 'Plumbing', icon: <MdPlumbing />},
        { id: "A/C", title: 'A/C', icon: <MdAir />},
        { id: "Heat", title: 'Heat', icon: <MdLocalFireDepartment />},
        { id: "Kitchen", title: 'Kitchen', icon: <FiCoffee />},
        { id: "Appliance", title: 'Appliance', icon: <MdConnectedTv />},
        { id: "Other", title: 'Other', icon: <MdOutlineSettingsSuggest />}
    ]

    const initialValues = {
        user: 1,
        category: '',
        maintenance_images: "",
        description: '',
        grant_entry: false
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
        e.preventDefault()
        if (validate()) {
            const formData = new FormData()
            formData.append('user', values.user)
            formData.append('category', values.category)
            for (let i = 0; i < files.length; i++) {
                formData.append('maintenance_images', files[i])
            }
            formData.append('description', values.description)
            formData.append('grant_entry', values.grant_entry)
            dispatch(createMaintenanceRequestAction(formData));
            // handleResetForm()
        }
    }



    return (   
        <NgPageContainer>
            <NgPaper padded>
                
                <PaperHeader heading="Raise a new maintenance request">
                    <FaSimplybuilt />
                </PaperHeader>

                
                    {error && <ToastAlert severity="error">{error}</ToastAlert>}
                    {success && <ToastAlert severity="success">{message}</ToastAlert>}
                    <MainForm onSubmit={submitHandler}>
                        <Container>
                            <InlineContainer>
                                <ControlLabel>Select category</ControlLabel>
                                <CategoryWrapper>
                                    <Controls.CategoryGroup
                                        name="category"
                                        onChange={handleInputChange}
                                        items={categoryList}
                                        >
                                    </Controls.CategoryGroup>
                                </CategoryWrapper>

                                <ControlLabel>
                                    Do you want to grant maintenance personnel permission to enter the premisses if necessary ?
                                </ControlLabel>
                                
                                <Controls.RadioGroup row
                                    name="grant_entry"
                                    value={values.grant_entry}
                                    onChange={handleInputChange}
                                    items={radioItems}>
                                </Controls.RadioGroup>

                                <ControlLabel>Description</ControlLabel>
                                <Controls.InputField
                                    multiline
                                    rows={4}
                                    sx={{width: "100%", fontFamily: "Poppins"}}
                                    error={errors.description}
                                    value={values.description}
                                    name='description'
                                    onChange={handleInputChange}>
                                </Controls.InputField>

                                {loading ? <Loader btn />
                                    :   <FormButtonWrapper>
                                            <FormButton type='submit'>
                                                Submit Request
                                            </FormButton>
                                        </FormButtonWrapper>
                                }
                            </InlineContainer>
                            
                            <InlineContainer>
                                <ControlLabel>Upload Images(Optional)</ControlLabel>
                                <DropFileInput files={files} setFiles={setFiles}/>
                            </InlineContainer>                            
                        </Container>
                    </MainForm>

                </NgPaper>
                

                <MyMaintenance />

            </NgPageContainer>
    
    )
}

export default MaintenanceRequestForm