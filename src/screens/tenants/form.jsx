import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Controls from "../../components/controls/Controls";
import ToastAlert from "../../components/display/ToastAlert";
import Loading from "../../components/display/Loader";

import { MainForm, useForm } from "../../components/useForm";
import { toTitleCase } from "../../utils/globalFunc";
import {
    Container,
    Icon,
    FormButton,
    FormContent,
    FormH1,
    FormInput,
    FormLabel,
    FormWrapper,
} from "../../components/useForm/formElements";
import { toast } from "react-toastify";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'


const TenantForm = (props) => {
    const { newEntry } = props;

    const createTenant = useSelector((state) => state.createTenant);
    const { loading, error, success, message } = createTenant;

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("full_name" in fieldValues)
            temp.full_name = fieldValues.full_name
                ? ""
                : "Full Name is Required";
        if ("email" in fieldValues)
            temp.email =
                /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
                    fieldValues.email
                )
                    ? ""
                    : "Enter a valid Email";
        // if ("phone_number" in fieldValues)
        //     temp.phone_number =
        //         /^0([0-9](?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/.test(
        //             fieldValues.phone_number
        //         )
        //             ? ""
        //             : "Enter a Valid Phone Number";

        setErrors({ ...temp });

        // tests whether post array elements passes text implemented by validate() function
        if (fieldValues === values)
            return Object.values(temp).every((x) => x === "");
    };

    const initialValues = {
        full_name: "",
        email: "",
        phone_number: "",
    };


    const {
        values,
        setValues,
        errors,
        setErrors,
        handleResetForm,
        handleInputChange,
    } = useForm(initialValues, true, validate);

    const [ phoneNumber, setPhoneNumber ] = useState()

    const submitHandler = (e) => {
        e.preventDefault();
        if (validate()) {
            newEntry(values, handleResetForm);
        }
    };

    
    return (
        <>
            <MainForm onSubmit={submitHandler}>
                <Controls.InputField
                    value={values.full_name}
                    name="full_name"
                    onChange={handleInputChange}
                    label="Full Name"
                    error={errors.full_name}
                    onInput={(e) =>
                        (e.target.value = toTitleCase(e.target.value))
                    }
                ></Controls.InputField>

                <Controls.InputField
                    value={values.email}
                    name="email"
                    onChange={handleInputChange}
                    label="Email"
                    error={errors.email}
                ></Controls.InputField>

                <Controls.InputField
                    value={values.phone_number}
                    name="phone_number"
                    onChange={handleInputChange}
                    label="Phone Number"
                    error={errors.phone_number}
                />

                {/* <PhoneInput
                    inputProps={{
                        name: 'phone_number',
                        required: true,
                        autoFocus: true
                    }}
                    country={'ke'}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target?.value)}
                /> */}

               
                {loading ? (
                    <Loading btn />
                ) : (
                    <FormButton type="submit">Submit</FormButton>
                )}
            </MainForm>

            {/* </Container> */}
        </>
    );
};

export default TenantForm;
