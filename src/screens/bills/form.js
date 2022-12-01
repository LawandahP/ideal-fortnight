import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Controls from '../../components/controls/Controls'
import ToastAlert from '../../components/display/ToastAlert'
import Loading from '../../components/display/Loader'

import { MainForm, useForm } from '../../components/useForm'
import { commafy, toTitleCase } from '../../utils/globalFunc'
import { Container, Icon, FormButton, 
        FormContent, FormH1, FormInput, FormLabel,
        FormWrapper 
    } 
from '../../components/useForm/formElements';

const BillForm = (props) => {
    const { newEntry, invoice } = props;

    const createBill = useSelector(state => state.createBill)
    const { loading, error, success, message } = createBill

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('item' in fieldValues)
            temp.item = fieldValues.item ? "" : "Item is Required"
        // if('description' in fieldValues)
        //     temp.description = fieldValues.description ? "" : "Description is Required"
        if('quantity' in fieldValues)
            temp.quantity = fieldValues.quantity ? "" : "Quantity is Required"
        
        setErrors({ ...temp })

        // tests whether post array elements passes text implemented by validate() function
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }
    
    const initialValues = {
        invoice: invoice,
        item: '',
        description: '',
        quantity: 1,
        rate: '',
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
            newEntry(values, handleResetForm);
        } 
    }
  
    return (
        <>
            <MainForm onSubmit={submitHandler}>
                <Controls.InputField 
                    value={values.item}
                    name='item'
                    onChange={handleInputChange}
                    label='Bill for' 
                    error={errors.item}
                    placeholder="Water, Electricity, Parking etc"
                    onInput={(e) => e.target.value = toTitleCase(e.target.value)}>        
                </Controls.InputField>
                
                <Controls.InputField
                    multiline
                    label="Description"
                    rows={4}
                    value={values.description}
                    name='description'
                    placeholder="Short Description of Bill, May be electricity/water reading"
                    onChange={handleInputChange}>
                </Controls.InputField>

                <Controls.InputField
                    type="number"
                    min="1"
                    value={values.quantity}
                    name='quantity'
                    onChange={handleInputChange}
                    label='Quantity' 
                    error={errors.quantity}>
                </Controls.InputField>

                <Controls.InputField
                    type="number"
                    value={values.rate}
                    name='rate'
                    onChange={handleInputChange}
                    label='Unit Rate' 
                    error={errors.rate}>
                </Controls.InputField>

                <Controls.InputField
                    disabled
                    value={`Ksh. ${commafy(Number(values.rate * values.quantity).toFixed(2))}`}
                    onChange={handleInputChange}
                    label='Amount' >
                </Controls.InputField>
                        
                { 
                    loading ? <Loading btn /> :
                    <FormButton type='submit'>
                        Submit
                    </FormButton>
                }
            </MainForm>
        </>
    )
}

export default BillForm