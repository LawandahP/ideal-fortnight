import React, { useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
import Controls from '../../components/controls/Controls'
import ToastAlert from '../../components/display/ToastAlert'
import Loading from '../../components/display/Loader'

import { MainForm, useForm } from '../../components/useForm'
import { toTitleCase } from '../../utils/globalFunc'
import {
    FormButton,
}
    from '../../components/useForm/formElements';
import { PropertyPropertiesContext } from '../../context'

const PropertyEditForm = (props) => {
    const { editEntry, recordForEdit, propertyId } = props;

    const { types, landlords } = useContext(PropertyPropertiesContext)

    const updateProperty = useSelector(state => state.updateProperty)
    const { loading: loadingUpdate, error: errorUpdate, success, message } = updateProperty

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "Name is Required"
        // if('address' in fieldValues)
        //     temp.address = (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).test(fieldValues.address) ? "" : "Enter a valid Address"
        // if('description' in fieldValues)
        //     temp.description = (/^0([0-9](?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/).test(fieldValues.description) ? "" : "Enter a Valid Description"

        setErrors({ ...temp })

        // tests whether post array elements passes text implemented by validate() function
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const initialValues = {
        name: '',
        address: '',
        property_type: '',
        owner: '',
        description: '',
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

    }, [recordForEdit, success, loadingUpdate, errorUpdate, setValues, propertyId])

    return (
        <>
            <MainForm onSubmit={submitHandler}>
                <Controls.InputField
                    value={values.name}
                    name='name'
                    onChange={handleInputChange}
                    label='Name'
                    error={errors.name}
                    onInput={(e) => e.target.value = toTitleCase(e.target.value)}>
                </Controls.InputField>

                <Controls.InputField
                    multiline
                    rows={2}
                    value={values.address}
                    name='address'
                    onChange={handleInputChange}
                    label='Address'
                    error={errors.address}>
                </Controls.InputField>

                <Controls.SelectField
                    label="Property Type"
                    value={values.property_type}
                    name="property_type"
                    onChange={handleInputChange}
                    list_value="property_model"
                    options={types}
                />

                <Controls.SelectField
                    label="Owner"
                    value={values.owner}
                    name="owner"
                    onChange={handleInputChange}
                    list_value="full_name"
                    options={landlords}
                />

                <Controls.InputField
                    multiline
                    label="Description"
                    rows={4}
                    value={values.description}
                    name='description'
                    onChange={handleInputChange}
                    error={errors.description}>
                </Controls.InputField>

                {
                    loadingUpdate ? 
                    <Loading btn/> : 
                    <FormButton type='submit'>
                        Submit
                    </FormButton>
                }
            </MainForm>

            {/* </Container> */}
        </>
    )
}

export default PropertyEditForm