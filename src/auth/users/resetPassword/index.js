import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Controls from "../../../components/controls/Controls";
import { NgLink } from "../../../components/display/elements";
import ToastAlert from "../../../components/display/ToastAlert";
import { MainForm, useForm } from "../../../components/useForm";
import {
    Container,
    FormButton,
    FormContent,
    FormH1,
    FormWrapper,
    Icon,
    NgFormWrapper,
    Text,
} from "../../../components/useForm/formElements";
import { resetPasswordWithEmailAction } from "../actions";
import {
    AuthFormContainer,
    AuthFormImageContainer,
    AuthImage,
} from "./elements";

const SendResetPasswordEmailScreen = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const emailPasswordReset = useSelector((state) => state.emailPasswordReset);
    const { error, loading, success, message } = emailPasswordReset;

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("email" in fieldValues)
            temp.email =
                /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
                    fieldValues.email
                )
                    ? ""
                    : "Enter a valid Email";
        setErrors({ ...temp });
        // tests whether post array elements passes text implemented by validate() function
        if (fieldValues === values)
            return Object.values(temp).every((x) => x === "");
    };

    const initialValues = {
        email: "",
    };

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleResetForm,
        handleInputChange,
    } = useForm(initialValues, true, validate);

    const submitHandler = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(resetPasswordWithEmailAction(values));
            // handleResetForm()
        }
    };

    useEffect(() => {
        if (success) {
            // await sleep(1)
            // navigate("/password_confirmation")
        }
    }, [success]);

    return (
        <Container>
            <FormContent>
                <AuthFormContainer>
                    {/* <Icon to="/">KgHomes</Icon> */}
                    <AuthFormImageContainer>
                        <AuthImage src="forgotPassword.png" />
                    </AuthFormImageContainer>
                </AuthFormContainer>

                <AuthFormContainer>
                    <NgFormWrapper>
                        <MainForm onSubmit={submitHandler}>
                            {error && (
                                <ToastAlert severity="error">
                                    {error}
                                </ToastAlert>
                            )}
                            {success && (
                                <ToastAlert severity="success">
                                    {message}
                                </ToastAlert>
                            )}
                            <FormH1>Reset Your Password</FormH1>
                            <Controls.InputField
                                value={values.email}
                                name="email"
                                onChange={handleInputChange}
                                label="Enter your Email"
                                error={errors.email}
                            ></Controls.InputField>

                            <FormButton type="submit">
                                {loading
                                    ? "Sending Email"
                                    : "Email Me Reset Instructions"}
                            </FormButton>
                            <Text spacing>
                                Never mind{" "}
                                <NgLink to="/signin">Return to Login</NgLink>
                            </Text>
                        </MainForm>
                    </NgFormWrapper>
                </AuthFormContainer>
            </FormContent>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0057D9" fill-opacity="1" d="M0,32L80,74.7C160,117,320,203,480,213.3C640,224,800,160,960,122.7C1120,85,1280,75,1360,69.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg> */}
        </Container>
    );
};

export default SendResetPasswordEmailScreen;
