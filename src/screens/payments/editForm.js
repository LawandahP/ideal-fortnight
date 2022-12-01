import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Grid, InputAdornment, Select } from '@mui/material'

import { FormButton, FormButtonWrapper } from '../../components/useForm/formElements';

import { NgPageContainer, NgPaper } from '../../components/display/elements'
import { readPaymentsAction } from '../payments/actions'


import Loader from '../../components/display/Loader'
import Controls from '../../components/controls/Controls'
import ToastAlert from '../../components/display/ToastAlert'
import { MainForm, useForm } from '../../components/useForm'
import { toTitleCase, commafy, TabTitle, radioItems, dateList, paymentMethod } from '../../utils/globalFunc'
import { updatePaymentAction } from './actions'


const PaymentEditForm = (props) => {

    TabTitle("Edit Payment")
    const dispatch = useDispatch()

    const { editEntry, recordForEdit, paymentId } = props;

    const updatePayment = useSelector(state => state.updatePayment)
    const { loading, error, success, message } = updatePayment


    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('amount_paid' in fieldValues)
            temp.amount_paid = fieldValues.amount_paid ? "" : "Paid amount is Required"
        if('payment_method' in fieldValues)
            temp.payment_method = fieldValues.payment_method ? "" : "Payment method is Required"
        // if('paid_on' in fieldValues)
        //     temp.paid_on = fieldValues.invoice ? "" : "Paid is Required"
        setErrors({ ...temp })

        // tests whether post array elements passes text implemented by validate() function
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    let date = new Date().toISOString().slice(0, 10)
    
    const initialValues = {
        id: "",
        payment_method: "",
        check_number: "",
        mpesa_receipt_number : "",
        is_confirmed: false,
        phone_number: "",
        amount_paid: "",
        paid_on: date,
    }

    const { 
        values,  
        setValues,
        errors, 
        setErrors,
        handleInputChange
    } = useForm(initialValues, true, validate);

    // const carry_forward = useMemo(() => {
    //     if (!invoice.balance && invoice.total_amount < values.amount_paid) 
    //         return values.amount_paid - invoice.total_amount
    // })
      
    const submitHandler = (e) => {
        e.preventDefault()
        if (validate()) {
            dispatch(editEntry(values));
        } 
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit,
            });
    }, [recordForEdit, success, loading, error, setValues, paymentId]);


    return (
        <NgPageContainer>            
            <>
                <MainForm onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                        <Grid item md={6} sm={6} xs={12}>                          
                            <Controls.InputField
                                type="number"
                                size="small"
                                value={values.amount_paid}
                                label="Amount Paid"
                                name="amount_paid"
                                onChange={handleInputChange}
                                error={errors.amount_paid}
                            />

                            <Controls.SelectField 
                                label="Payment Method"
                                name="payment_method"
                                value={values.payment_method}
                                onChange={handleInputChange}
                                options={paymentMethod}
                            />      

                            <Controls.RadioGroup row
                                name="is_confirmed"
                                value={values.is_confirmed}
                                label="Payment Confirmed"
                                onChange={handleInputChange}
                                items={radioItems}>
                            </Controls.RadioGroup>
                                                              
                        </Grid>

                        <Grid item md={6} sm={6} xs={12}>

                        {values.payment_method == "M Pesa" &&
                            <>
                                <Controls.InputField
                                    size="small"
                                    name='mpesa_receipt_number'
                                    value={values.mpesa_receipt_number}
                                    onChange={handleInputChange}
                                    label='Mpesa Receipt Number'
                                    placeholder="KG10H6OMEY"
                                    // error={errors.address}
                                />

                                <Controls.InputField
                                    size="small"
                                    name='phone_number'
                                    value={values.phone_number}
                                    onChange={handleInputChange}
                                    label='Phone Number'
                                    placeholder="0702343434"
                                    // error={errors.address}
                                />
                            </>
                            
                        }      
                        {
                            values.payment_method == "Cheque" &&
                                <Controls.InputField
                                    size="small"
                                    name='check_number'
                                    value={values.check_number}
                                    onChange={handleInputChange}
                                    label='Check Number'
                                    // error={errors.address}
                                />
                        }

                            <Controls.DatePicker
                                name="paid_on"
                                label="Paid On"
                                value={values.paid_on}
                                onChange={handleInputChange}
                                error={errors.paid_on}
                            />
                        </Grid>

                    </Grid>
                    
                    {/* {loading ? <Loader /> */}
                        <FormButtonWrapper>
                        { loading ? <Loader btn />  : 
                            <FormButton type='submit' disabled={loading}>
                                Submit Payment
                            </FormButton>
                        }
                        </FormButtonWrapper>
                    {/* } */}

                </MainForm>

            
        </>
            
        </NgPageContainer>
    )
}

export default PaymentEditForm