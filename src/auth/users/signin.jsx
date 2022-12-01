import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { useDispatch } from 'react-redux'
import { useNavigate, Link, useLocation } from 'react-router-dom';

import Controls from '../../components/controls/Controls'
import ToastAlert from '../../components/display/ToastAlert'
import Loading from '../../components/display/Loader'

import { MainForm, useForm } from '../../components/useForm'
import { Container, FormButton, 
        FormContent, FormH1, NgFormWrapper,
        FormWrapper, 
        Text
    } 
from '../../components/useForm/formElements'
import { List, NgLink } from '../../components/display/elements';
import { useAuth } from '../use.auth';
import { getCookie } from './cookies';
import { AuthFormContainer } from './resetPassword/elements';
import { errorToast } from '../../utils/globalFunc';
import { toast } from 'react-toastify';


const SignInPage = () => {
    // const { setAuth } = useAuth();

    let navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"  //get previous page

    const [ loading, setLoading ] = useState(false)
    const [ error, setError ]     = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [ message, setMessage ] = useState(false)

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('email' in fieldValues)
            temp.email = (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).test(fieldValues.email) ? "" 
            : "Enter a valid Email"
            
        // if('password' in fieldValues)
        //     temp.password = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.^])[A-Za-z\d@$!%*?&#.^]{8,}$/).test(fieldValues.password) ? "" 
        //     : "Minimum 8 Characters. Atleast 1 Capital, Small and Special Character"
        setErrors({ ...temp })

        // tests whether post array elements passes text implemented by validate() function
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    
    const initialValues = {
        email: '',
        password: ''
    }

    const { 
        values,  
        errors, 
        setErrors,
        handleInputChange
    } = useForm(initialValues, true, validate);

    const submitHandler = async (e) => {
        e.preventDefault()
        if (validate()) {
            setLoading(true)
            await axios.post(
                '/api/v1/auth/login/', values,
                { headers: { 'Content-Type': 'application/json'}}
            ).then(res => {
                setLoading(false)
                setSuccess(true)
                setMessage(res?.data.success)
                toast.success(res?.data?.success)

                localStorage.setItem(
                    "invoice_filter", 
                    JSON.stringify({"status": "", "date_month": new Date().getMonth() + 1, "date_year": new Date().getFullYear(), "property": ""})
                )
                navigate(from, { replace: true});

            }).catch(err => {
                setLoading(false)
                errorToast(err)                
            });
        }
    }

    return (
        <>
            { loading ? <Loading /> : ""}
            <Container>
                <FormWrapper>
                    {/* <Icon to="/">KgHomes</Icon> */}
                    <FormContent>
                        <AuthFormContainer>
                            <NgFormWrapper>
                                <MainForm onSubmit={submitHandler}>
                                    {success && <ToastAlert severity='success'>{message}</ToastAlert>}
                                    <FormH1>Login To Your Account</FormH1>                       
                                        <Controls.InputField
                                            value={values.email}
                                            name='email'
                                            onChange={handleInputChange}
                                            label='Email' 
                                            error={errors.email}>
                                        </Controls.InputField>
                            
                                        <Controls.PasswordInputField
                                            value={values.password}
                                            onChange={handleInputChange}
                                            // error={errors.password}
                                        /> 
                            
                                        
                                            { 
                                                loading ? <Loading btn /> :
                                                <FormButton type='submit'>
                                                    Submit
                                                </FormButton>
                                            }
                                </MainForm>
                                <Text spacing>Don't have an account ? <NgLink to="/signup">Sign Up</NgLink></Text>
                                <Text>Forgot Password ? <NgLink to="/password_reset">Reset Password</NgLink></Text>
                            </NgFormWrapper>
                        </AuthFormContainer>
                        
                    </FormContent>
                </FormWrapper>
            </Container>
        </>
    )
}

export default SignInPage























// const submitHandler = async (e) => {
    //     e.preventDefault()
    //     if (validate()) {
    //         try {
    //             setLoading(true)
    //             const response = await axios.post(
    //                 '/auth/login/', values,
    //                 { headers: { 'Content-Type': 'application/json'}, withCredentials: true }
    //             );
    //             setLoading(false)
    //             setSuccess(true)
    //             console.log(JSON.stringify(response?.data));
    //         } catch(err) {
    //             setError(err.response && err.response.data.detail ?
    //                 <>
    //                     {Object.keys(err.response.data.detail).map(function(s) {
    //                     return (
    //                         <List>{err.response.data.detail[s]}</List>
    //                     )})}
    //                 </> 
    //                 : err.message)
    //             setLoading(false)
    //         }
    //     }
    // }