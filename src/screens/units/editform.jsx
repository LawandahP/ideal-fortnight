import React, { useEffect, useContext } from 'react'
import axios from 'axios';

import { useSelector } from 'react-redux'
import { UnitPropertiesContext } from '../../context';

import Controls from '../../components/controls/Controls'
import ToastAlert from '../../components/display/ToastAlert'
import Loading from '../../components/display/Loader'

import { MainForm, useForm } from '../../components/useForm'
import { toTitleCase } from '../../utils/globalFunc'
import { FormButton } from '../../components/useForm/formElements';

import { MdOutlineKingBed, MdOutlineBathtub, MdSquareFoot } from "react-icons/md";
import { InputAdornment } from '@mui/material';



const UnitEditForm = (props) => {
    const { editEntry, recordForEdit, unitId } = props;

    const { properties, tenants, loading, error } = useContext(UnitPropertiesContext)

    const updateUnit = useSelector(state => state.updateUnit)
    const { loading: loadingUpdate, error: errorUpdate, success, message } = updateUnit

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('unit_no' in fieldValues)
            temp.unit_no = fieldValues.unit_no ? "" : "Unit name is Required"
        // if('square_feet' in fieldValues)
        //     temp.square_feet = (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).test(fieldValues.square_feet) ? "" : "Enter a valid Address"
        // if('bedrooms' in fieldValues)
        //     temp.bedrooms = (/^0([0-9](?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/).test(fieldValues.bedrooms) ? "" : "Enter a Valid Description"

        setErrors({ ...temp })

        // tests whether post array elements passes text implemented by validate() function
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const initialValues = {
        unit_no: '',
        square_feet: '',
        bedrooms: '',
        bathrooms: '',
        property: '',
        tenant: ""
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
            editEntry(values, handleResetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })

    }, [recordForEdit, success, loading, error, setValues, unitId])

    return (
        <>
            <MainForm onSubmit={submitHandler}>
                <Controls.InputField
                    value={values.unit_no}
                    name='unit_no'
                    onChange={handleInputChange}
                    label='Name'
                    error={errors.unit_no}
                    onInput={(e) => e.target.value = toTitleCase(e.target.value)}>
                </Controls.InputField>

                <Controls.InputField
                    value={values.square_feet}
                    name='square_feet'
                    onChange={handleInputChange}
                    label='Square Feet'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <MdSquareFoot />
                            </InputAdornment>
                        ),
                    }}
                    error={errors.square_feet}>
                </Controls.InputField>

                <Controls.InputField
                    value={values.bedrooms}
                    name='bedrooms'
                    onChange={handleInputChange}
                    label='Bedrooms'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <MdOutlineKingBed />
                            </InputAdornment>
                        ),
                    }}
                    error={errors.bathrooms}>
                </Controls.InputField>

                <Controls.InputField
                    value={values.bathrooms}
                    name='bathrooms'
                    onChange={handleInputChange}
                    label='Bathrooms'
                    // endElement={<><MdOutlineBathtub /></>}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <MdOutlineBathtub />
                            </InputAdornment>
                        ),
                    }}
                    error={errors.bathrooms}>
                </Controls.InputField>

                <Controls.SelectField
                    label="Property"
                    value={values.property}
                    name="property"
                    onChange={handleInputChange}
                    options={properties}
                />

                <Controls.SelectField
                    label="Tenant"
                    value={values.tenant}
                    name="tenant"
                    onChange={handleInputChange}
                    options={tenants}
                />

                {
                    loadingUpdate ? <Loading btn /> : 
                    <FormButton type='submit'>
                        Submit
                    </FormButton>
                }
                
            </MainForm>

            {/* </Container> */}
        </>
    )
}

export default UnitEditForm