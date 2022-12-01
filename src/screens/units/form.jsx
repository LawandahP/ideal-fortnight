import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux'
import { UnitPropertiesContext } from '../../context';

import Controls from '../../components/controls/Controls'
import ToastAlert from '../../components/display/ToastAlert'
import Loading from '../../components/display/Loader'

import { MainForm, useForm } from '../../components/useForm'
import { FormButton } from '../../components/useForm/formElements';

import { toTitleCase } from '../../utils/globalFunc';

import { MdOutlineKingBed, MdOutlineBathtub, MdSquareFoot } from "react-icons/md";
import { InputAdornment } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const amenitiez = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, val, theme) {
    return {
        fontWeight:
            val.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}




const UnitForm = (props) => {
    const { newEntry } = props;

    const { properties, setProperties, tenants, setTenants,
        loading, setLoading, error, setError } = useContext(UnitPropertiesContext)

    const createUnit = useSelector(state => state.createUnit)
    const { loading: loadingCreate, error: errorCreate, success } = createUnit


    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('unit_no' in fieldValues)
            temp.unit_no = fieldValues.unit_no ? "" : "Name is Required"
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
        tenant: '',
        is_occupied: false
    }

    const {
        values,
        errors,
        setValues,
        setErrors,
        handleResetForm,
        handleInputChange
    } = useForm(initialValues, true, validate);

    const submitHandler = (e) => {
        e.preventDefault()
        if (validate()) {
            newEntry(values, handleResetForm);
        }
    }

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
                    // endElement={<MdSquareFoot />}
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
                    // endElement={<><MdOutlineKingBed /></>}
                    error={errors.bathrooms}>
                </Controls.InputField>

                <Controls.InputField
                    value={values.bathrooms}
                    name='bathrooms'
                    onChange={handleInputChange}
                    label='Bathrooms'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <MdOutlineBathtub />
                            </InputAdornment>
                        ),
                    }}
                    // endElement={<><MdOutlineBathtub /></>}
                    error={errors.bathrooms}>
                </Controls.InputField>

                <Controls.SelectField
                    label="Property"
                    value={values.property}
                    name="property"
                    onChange={handleInputChange}
                    options={properties}
                    error={error}
                />

                <Controls.SelectField
                    label="Tenant"
                    value={values.tenant}
                    name="tenant"
                    onChange={handleInputChange}
                    options={tenants}
                    error={error}
                />

                {
                    loadingCreate ? <Loading btn /> : 
                    <FormButton type='submit'>
                        Submit
                    </FormButton>
                }
            </MainForm>

            {/* </Container> */}
        </>
    )
}

export default UnitForm