import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Controls from '../../../components/controls/Controls';
import { NgLink } from '../../../components/display/elements';
import { MainForm, useForm } from '../../../components/useForm';
import { Container, FormButton, FormContent, FormH1, FormWrapper, NgFormWrapper, Text } from '../../../components/useForm/formElements';
import { resetPasswordWithEmail } from '../actions';


const SendResetPasswordEmailScreen = () => {
    
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('email' in fieldValues)
            temp.email = (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).test(fieldValues.email) ? "" : "Enter a valid Email"
        if('password' in fieldValues)
            temp.password = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.^])[A-Za-z\d@$!%*?&#.^]{8,}$/).test(fieldValues.password) ? "" : "Minimum 8 Characters. Atleast 1 Capital, Small and Special Character"
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
        setValues,
        errors, 
        setErrors,
        handleResetForm,
        handleInputChange
    } = useForm(initialValues, true, validate);

    const submitHandler = (e) => {
        e.preventDefault()
        if (validate()) {
            dispatch(resetPasswordWithEmail(values))
            // handleResetForm()
        }
    }

    // useEffect(() => {
    //     if(success) {
    //         navigate("/dashboard") 
    //     }
    // }, [success])

    return (
        <>
            
            {/* { loading ? <Loading /> : ""} */}
            <Container>
                <FormWrapper>
                    {/* <Icon to="/">KgHomes</Icon> */}
                    <FormContent>
                        <NgFormWrapper dark>
                            <MainForm onSubmit={submitHandler}>
                                {/* {error && <ToastAlert severity='error'>{error}</ToastAlert>} */}
                                {/* {success && <ToastAlert severity='success'>{userInfo.success}</ToastAlert>} */}
                                <FormH1>Reset Your Password</FormH1>                       
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
                                    error={errors.password}
                                /> 
                    
                                { 
                                    loading ? <Loading btn /> :
                                    <FormButton type='submit'>
                                        Submit
                                    </FormButton>
                                }
                                <Text>Don't have an account ? <NgLink to="/signup">Sign Up</NgLink></Text>
                            </MainForm>
                            
                        </NgFormWrapper>
                    </FormContent>
                </FormWrapper>
            </Container>
        </>
    )
}

export default SendResetPasswordEmailScreen