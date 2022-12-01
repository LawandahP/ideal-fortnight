import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Controls from '../../components/controls/Controls'
import ToastAlert from '../../components/display/ToastAlert'
import Loading from '../../components/display/Loader'

import { MainForm, useForm } from '../../components/useForm'
import { toTitleCase, commafy, countries } from '../../utils/globalFunc'
import { FormButton } from '../../components/useForm/formElements';
import { Grid } from '@mui/material'
import { NgPageContainer, NgPaper } from '../../components/display/elements'
import { accountDetailsAction, updateAccountAction } from './actions'
import { toast } from 'react-toastify'

const AccountEditForm = () => {
    const dispatch = useDispatch()

    const updateAccount = useSelector(state => state.updateAccount)
    const { loading, error, success, message } = updateAccount

    const readAccountDetails = useSelector(state => state.readAccountDetails)
    const { loading: loadingAccountDetails, success: successLoadingAccountDetails, account} = readAccountDetails

    const [recordForEdit, setRecordForEdit] = useState(account)

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
        company_name: '',
        email: '',
        phone_number_1: '',
        phone_number_2: '',
        country: 'Kenya',
        city: '',
        physical_address: '',
        post_office_box: ''
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
            dispatch(updateAccountAction(values));
            // if (success) {
            //     toast.success(message)
            // }
            // if (error) {
            //     toast.error(error)
            // }
        } 

    }

    useEffect(() => {
        if(recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit, successLoadingAccountDetails, loading, error, setValues ])

    useEffect(() => {
        dispatch(accountDetailsAction())
    }, [success])

    useEffect(() => {
        toast.success(message)
    }, [success])
    
    useEffect(() => {
        toast.error(error)
    }, [error])
    return (
        <NgPageContainer>
            <NgPaper padded>
                <MainForm onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                        <Grid item md={6} sm={6} xs={12}>
                            <Controls.InputField 
                                value={values.company_name}
                                name='company_name'
                                onChange={handleInputChange}
                                label='Company Name*' 
                                error={errors.company_name}
                                onInput={(e) => e.target.value = toTitleCase(e.target.value)}>        
                            </Controls.InputField>
                        </Grid>

                        <Grid item md={6} sm={6} xs={12}>
                            <Controls.InputField 
                                value={values.email}
                                name='email'
                                onChange={handleInputChange}
                                label='Email'>        
                            </Controls.InputField>
                        </Grid>

                        <Grid item md={6} sm={6} xs={12}>
                            <Controls.InputField 
                                value={values.phone_number_1}
                                name='phone_number_1'
                                onChange={handleInputChange}
                                label='Phone Number' 
                                error={errors.phone_number_1}
                                onInput={(e) => e.target.value = toTitleCase(e.target.value)}>        
                            </Controls.InputField>
                        </Grid>

                        <Grid item md={6} sm={6} xs={12}>
                            <Controls.InputField 
                                value={values.phone_number_2}
                                name='phone_number_2'
                                onChange={handleInputChange}
                                label='Secondary Phone Number' 
                                placeholder="(Optional)"
                                onInput={(e) => e.target.value = toTitleCase(e.target.value)}>        
                            </Controls.InputField>
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <Controls.InputField
                                value={values.country}
                                name='country'
                                onChange={handleInputChange}
                                // options={countries}
                                label='Country'>
                            </Controls.InputField>
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <Controls.InputField
                                value={values.city}
                                name='city'
                                onChange={handleInputChange}
                                placeholder="city/county"
                                label='City'>
                            </Controls.InputField>
                        </Grid>

                        <Grid item md={12} xs={12}>
                            <Controls.InputField
                                value={values.physical_address}
                                name='physical_address'
                                onChange={handleInputChange}
                                label='Address(Optional)' 
                                placeholder="Building & floor, Road, Area, Town etc.">
                            </Controls.InputField>
                        </Grid>
                    </Grid>
                                                
                    { 
                        loading ? <Loading btn /> :
                        <FormButton type='submit'>
                            Submit
                        </FormButton>
                    }
                </MainForm>
                    
                {/* </Container> */}
            </NgPaper>
        </NgPageContainer>
    )
}

export default AccountEditForm