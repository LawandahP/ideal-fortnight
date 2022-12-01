import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Grid, InputAdornment, Select } from '@mui/material'

import { Icon, FormButton, 
        FormContent, FormH1, FormInput, FormLabel,
        FormWrapper, 
        FormButtonWrapper
    } 
from '../../components/useForm/formElements';

import { NgPageContainer, NgPaper } from '../../components/display/elements'
import { readUnitsAction } from '../units/actions'
import Loader from '../../components/display/Loader'
import Controls from '../../components/controls/Controls'
import ToastAlert from '../../components/display/ToastAlert'
import { MainForm, useForm } from '../../components/useForm'
import { toTitleCase, commafy, TabTitle, status } from '../../utils/globalFunc'
import { updateInvoiceAction } from './actions'

import moment from 'moment' 

import { RentInlineContainer, RentContainer, RentAmount, RentHeader, RTPaper,
         Container, NgDivider, PayDate, RentSummary, RText 
} from './elements';


const InvoiceEditForm = (props) => {

    TabTitle('Invoice')

    const { editEntry, recordForEdit, invoiceId } = props;
    const dispatch = useDispatch()

    const updateInvoice = useSelector(state => state.updateInvoice)
    const { loading, error, success, message } = updateInvoice

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('full_name' in fieldValues)
            temp.full_name = fieldValues.full_name ? "" : "Full Name is Required"
        if('email' in fieldValues)
            temp.email = (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).test(fieldValues.email) ? "" : "Enter a valid Email"
        if('phone_number' in fieldValues)
            temp.phone_number = (/^0([0-9](?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/).test(fieldValues.phone_number) ? "" : "Enter a Valid Phone Number"
        
        setErrors({ ...temp })

        // tests whether post array elements passes text implemented by validate() function
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

        
    let date = new Date().toISOString().slice(0, 10)
   
    const initialValues = {       
        due_on : "",
        amount_paid: null,
        status: ""
    }

    const { 
        values,  
        setValues,
        errors, 
        setErrors,
        // handleResetForm,
        handleInputChange
    } = useForm(initialValues, true, validate);
 

    const submitHandler = (e) => {
        e.preventDefault()
        if (validate()) {
            dispatch(editEntry(values));
        } 
    }

    // const getUnits = () => {
    //     let property_id = values.property
    //     dispatch(readUnitsAction(property_id))
    // }

    
    useEffect(() => {
        if(recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    
    }, [recordForEdit, success, loading, error, setValues, invoiceId ])


    return (
        <NgPageContainer>         
            <MainForm onSubmit={submitHandler}>
                        
                        <Controls.DatePicker
                            name="due_on"
                            label="Due On"
                            value={values.due_on}
                            onChange={handleInputChange}
                        />

                        <Controls.DatePicker
                            name="paid_on"
                            label="Paid On"
                            value={values.paid_on}
                            onChange={handleInputChange}
                        />

                        <Controls.SelectField 
                            size="small"
                            label="Status"
                            name="status"
                            value={values.status}
                            onChange={handleInputChange}
                            options={status}
                        />                      
        
                        
                        {/* 
                        <Grid item md={6} sm={6} xs={12}>

                            <Controls.InputField
                                name='rent_amount'
                                value={values.rent_amount}
                                onChange={handleInputChange}
                                label='Rent'
                                // error={errors.address}
                            />     

                            <Controls.InputField
                                name='amount_paid'
                                value={values.amount_paid}
                                onChange={handleInputChange}
                                label='Amount Paid'
                                // error={errors.address}
                            />                         

                        </Grid> */}
                    
                        <FormButtonWrapper>
                            
                            { loading ? <Loader btn /> : 
                                <FormButton type='submit' disabled={loading}>
                                    update
                                </FormButton> 
                            }
                           
                        </FormButtonWrapper>

                </MainForm>
        </NgPageContainer>
    )
}

export default InvoiceEditForm



// // "invoice_id", "lease", "due_on", "paid_on", "status", "rent_amount", "amount_paid", "balance"

// invoice_id = models.CharField(default=uuid.uuid4().hex.upper()[
//     0:6], editable=False, max_length=6)
// lease = models.ForeignKey(Lease, on_delete=models.SET_NULL, null=True)
// rent_amount = models.IntegerField()
// bills_amount = models.IntegerField()
// total_amount = models.IntegerField()

// due_on = models.DateField(blank=True, null=True)
// amount_paid = models.IntegerField()
// paid_on = models.DateTimeField(blank=True, null=True)
// payment_method = models.CharField(choices=payment_method, max_length=255)
// balance = models.IntegerField()
// status = models.CharField(choices=status, max_length=255)