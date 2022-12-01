import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Controls from '../../components/controls/Controls'
import ToastAlert from '../../components/display/ToastAlert'
import Loading from '../../components/display/Loader'

import { MainForm, useForm } from '../../components/useForm'
import { countries, toTitleCase } from '../../utils/globalFunc'
import { signUpUserAction } from './actions'
import { Container, Icon, FormButton, 
        FormContent, FormH1, NgFormWrapper, FormLabel,
        FormWrapper , Text
    } 
from '../../components/useForm/formElements'

import Grid from '@mui/material/Grid'
import { NgLink } from '../../components/display/elements'
import { AuthFormContainer, AuthText } from './resetPassword/elements'
import { TextAnimation } from '../../components/animations/TextAnimations'

// import { AuthFormContainer } from './elements';

const SignUpPage = () => {
    
    const dispatch = useDispatch()

    const signUpUser = useSelector(state => state.signUpUser)
    const { error, loading, success, message } = signUpUser

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('company_name' in fieldValues)
            temp.company_name = fieldValues.company_name ? "" : "Company Name is Required"
        if('full_name' in fieldValues)
            temp.full_name = fieldValues.full_name ? "" : "Full Name is Required"
        if('email' in fieldValues)
            temp.email = (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).test(fieldValues.email) ? "" : "Enter a valid Email"
        if('phone_number' in fieldValues)
            temp.phone_number = (/^0([0-9](?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/).test(fieldValues.phone_number) ? "" : "Enter a Valid Phone Number"
        if('password' in fieldValues)
            temp.password = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.^])[A-Za-z\d@$!%*?&#.^]{8,}$/).test(fieldValues.password) ? "" : "Minimum 8 Characters. Atleast 1 Capital, Small and Special Character"
        setErrors({ ...temp })

        // tests whether post array elements passes text implemented by validate() function
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    
    const initialValues = {
        account: {
            company_name: '',
            phone_number_1: '',
            country: 'Kenya',
            city: '',
            physical_address: '',
            post_office_box: '',
        },
        full_name: '',
        email: '',
        phone_number: '',
        password: ''
    }

    const handleAccountOnChange = e => {
        let account = values.account;
        var key = e.target.name;
        var value = e.target.value;
        account[key] = value;
        setValues({
            ...values,
            account,
            [key]:value
        });
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
            dispatch(signUpUserAction(values))
            // handleResetForm()
        }
 
    }

    return (
        <>
            <Container>
                <Icon to="/">KgHomes</Icon>
                    <FormContent>
                            <AuthFormContainer>
                                <div>
                                    <AuthText>Everything</AuthText>
                                    <TextAnimation text="Property"></TextAnimation>
                                    <TextAnimation text="Managers"></TextAnimation>
                                    <AuthText>Need</AuthText>
                                </div>
                                
                            </AuthFormContainer>


                            <AuthFormContainer>
                                <NgFormWrapper>
                                    <MainForm onSubmit={submitHandler}>
                                    {success && <ToastAlert severity='success'>{message}</ToastAlert>}
                                    {error && <ToastAlert severity='error'>{error}</ToastAlert>}
                                        {/* <FormH1>Create Account</FormH1> */}

                                        <Grid container spacing={1}>
                                            <Grid item md={6} xs={12}>
                                                <Controls.InputField 
                                                    label="Company Name"
                                                    value={values.account.company_name}
                                                    name='company_name'
                                                    onChange={handleAccountOnChange}
                                                    error={errors.company_name}>
                                                </Controls.InputField>
                                            </Grid>

                                            <Grid item md={6} xs={12}>
                                                <Controls.InputField 
                                                    value={values.full_name}
                                                    name='full_name'
                                                    onChange={handleInputChange}
                                                    label='Full Name' 
                                                    error={errors.full_name}
                                                    placeholder="John Doe"
                                                    onInput={(e) => e.target.value = toTitleCase(e.target.value)}>        
                                                </Controls.InputField>
                                            </Grid>
                                            
                                            <Grid item md={6} xs={12}>
                                                <Controls.InputField
                                                    type="email"
                                                    value={values.email}
                                                    name='email'
                                                    onChange={handleInputChange}
                                                    label='Email' 
                                                    placeholder="johndoe@gmail.com"
                                                    error={errors.email}>
                                                </Controls.InputField>
                                            </Grid>
                                        {/* </Grid> */}

                                        {/* <Grid container spacing={2}> */}
                                            <Grid item md={6} xs={12}>
                                                <Controls.InputField
                                                    value={values.phone_number}
                                                    name='phone_number'
                                                    onChange={handleInputChange}
                                                    label='Phone Number 1' 
                                                    error={errors.phone_number}>
                                                </Controls.InputField>
                                            </Grid>

                                            <Grid item md={6} xs={12}>
                                                <Controls.InputField
                                                    value={values.account.phone_number_1}
                                                    name='phone_number_1'
                                                    onChange={handleAccountOnChange}
                                                    label='Phone Number 2' 
                                                    placeholder="(Optional)">
                                                </Controls.InputField>
                                            </Grid>

                                            <Grid item md={6} xs={12}>
                                                <Controls.AutoCompleteField
                                                    value={values.account.country}
                                                    name='country'
                                                    onChange={handleInputChange}
                                                    options={countries}
                                                    label='Country'>
                                                </Controls.AutoCompleteField>
                                            </Grid>

                                            <Grid item md={12} xs={12}>
                                                <Controls.InputField
                                                    value={values.account.physical_address}
                                                    name='physical_address'
                                                    onChange={handleAccountOnChange}
                                                    label='Address' 
                                                    placeholder="Building & floor, Road, Area, Town etc.">
                                                </Controls.InputField>
                                            </Grid>

                                            <Grid item md={6} xs={12}>
                                                <Controls.PasswordInputField
                                                    value={values.password}
                                                    onChange={handleInputChange}
                                                    error={errors.password}
                                                /> 
                                            </Grid>
                                        </Grid>  

                                        <Grid item>

                                        </Grid>                          
                            
                                            { 
                                                loading ? <Loading btn /> :
                                                <FormButton type='submit'>
                                                    Submit
                                                </FormButton>
                                            }
                                    </MainForm>
                                    {/* <Text>Have an account? <NgLink to="/signin">sign in</NgLink></Text> */}
                                </NgFormWrapper>
                            </AuthFormContainer>                                                
                    </FormContent>
            
            </Container>
        </>
    )
}

export default SignUpPage