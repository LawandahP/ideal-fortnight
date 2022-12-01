import { Grid } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react'
import { FaSimplybuilt } from 'react-icons/fa';
import { FiCoffee } from 'react-icons/fi';
import { MdAir, MdConnectedTv, MdElectricalServices, MdLocalFireDepartment, MdOutlineSettingsSuggest, MdPlumbing } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import Controls from '../../components/controls/Controls';
import { NgPageContainer, NgPaper } from '../../components/display/elements';
import Loader from '../../components/display/Loader';
import PaperHeader from '../../components/display/paperHeader';
import ToastAlert from '../../components/display/ToastAlert';
import DropFileInput from '../../components/drag_and_drop/DropFileInput';
import { MainForm, useForm } from '../../components/useForm';
import { FormButton, FormButtonWrapper } from '../../components/useForm/formElements';
import { categoryList } from '../../utils/globalFunc';
import { readPropertiesAction } from '../properties/actions';
import { readUnitsAction } from '../units/actions';
import { CategoryWrapper, Container, ControlLabel, InlineContainer } from './elements';



// interface {

// }

const MaintenanceAdminRequestForm = (props) => {
    const { newEntry } = props;

    const [select, setSelect] = useState(null);

    const [ files, setFiles] = useState([])

    const dispatch = useDispatch()
    
    const readProperties = useSelector(state => state.readProperties)
    const { loading: readLoading, error: readError, success: readSuccess, properties, count } = readProperties

    const readUnits = useSelector(state => state.readUnits)
    const { loading: readUnitsLoading, error: readUnitsError, success: readUnitsSuccess, units, count: unitsCount } = readUnits

    const createMaintenance = useSelector(state => state.createMaintenance)
    const { loading, error, success, message } = createMaintenance

    const readProfile = useSelector(state => state.readProfile)
    const { error: errorProfile, loading: loadingProfile, profile } = readProfile

    const roles = profile?.groups

    const handleSelectChange = event => {
        const value = event.target.value;
        setSelect(value);
    };

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('category' in fieldValues)
            temp.category = fieldValues.category ? "" : "Category is Required"
        if('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "Description is Required"
        if('unit' in fieldValues)
            temp.unit = fieldValues.unit ? "" : "Unit is Required"
        if('grant_entry' in fieldValues)
            temp.grant_entry = fieldValues.grant_entry ? "" : "Required"
               
        setErrors({ ...temp })

        // tests whether post array elements passes text implemented by validate() function
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    
    const radioItems = [
        { id:true, title: 'Yes'},
        { id:false, title: 'No'}
    ]


    const initialValues = {
        property: '',
        unit: '',
        category: '',
        maintenance_images: '',
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
            formData.append('unit', values.unit)
            formData.append('category', values.category)

            for (let i = 0; i < files.length; i++) {
                formData.append('maintenance_images', files[i])
            }
            formData.append('description', values.description)
            formData.append('grant_entry', values.grant_entry)
            dispatch(newEntry(formData));
            if (success) {
                toast.success(message)
            } else {
                if (error) {
                    toast.error(error)
                }
            }
        }
    }

    const getUnits = () => {
        let property_id = values.property
        dispatch(readUnitsAction(property_id))
    }

    useEffect(() => {
        if (!values.properties) {
            dispatch(readPropertiesAction())
        }
    }, [])

    useEffect(() => {
        getUnits()
    }, [values.property])

    const steps_list = [
        {label: 'Details'},
        {label: 'Images'}
    ]

    return (   
        <NgPageContainer>
            <NgPaper padded>              
                <MainForm onSubmit={submitHandler}>
                        
                            <Grid container spacing={2}>
                                <Grid item md={6} sm={6} xs={12}>
                                    <Controls.SelectField 
                                        label="Select Property"
                                        name="property"
                                        value={values.property}
                                        onChange={handleInputChange}
                                        options={properties}
                                        loadingText={readLoading && "fetching listed properties...."}
                                        successText={readSuccess && `${count} properties found`}
                                        error={count < 0 ? `No properties found...`
                                                : readError ? readError
                                                : errors.property
                                            }
                                    />
                                </Grid>
                            
                                
                                <Grid item md={6} sm={6} xs={12}>
                                    <Controls.SelectField 
                                        label="Select Occupied Unit"
                                        name="unit"
                                        value={values.unit}
                                        onChange={handleInputChange}
                                        options={units}
                                        loadingText={readUnitsLoading && "fetching listed units...."}
                                        successText={readUnitsSuccess && `${unitsCount} units found`}
                                        error = {count < 0 ? `No properties found...`: readUnitsError ? readUnitsError: errors.unit}
                                    />                                
                                    
                                </Grid>
                            </Grid>
                   
                            <Controls.SelectField
                                name="category"
                                value={values.category}
                                onChange={handleInputChange}
                                options={categoryList}
                                label="Select Category"
                                error={errors.category}>
                            </Controls.SelectField>

                            <ControlLabel>
                                Would you grant maintenance personnel permission to enter the premisses if necessary ?
                            </ControlLabel>
                            
                            <Controls.RadioGroup row
                                name="grant_entry"
                                value={values.grant_entry}
                                onChange={handleInputChange}
                                items={radioItems}
                                error={errors.grant_entry}>

                            </Controls.RadioGroup>
                            
                            <Controls.InputField
                                label="Description"
                                multiline
                                rows={4}
                                sx={{width: "100%", fontFamily: "Poppins"}}
                                error={errors.description}
                                value={values.description}
                                name='description'
                                onChange={handleInputChange}
                                placeholder="Brief description of the maintenance issue">
                            </Controls.InputField>
                    
                            <ControlLabel>Upload Images(Optional)</ControlLabel>
                            <DropFileInput files={files} setFiles={setFiles}/>


                            

                            {loading ? <Loader btn/>
                                :   <FormButtonWrapper>
                                        <FormButton type='submit'>
                                            Submit Request
                                        </FormButton>
                                    </FormButtonWrapper>
                            }
                      
                </MainForm>
            </NgPaper>
        </NgPageContainer>
    
    )
}

export default MaintenanceAdminRequestForm