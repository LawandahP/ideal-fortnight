import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Grid, InputAdornment, Select } from '@mui/material'

import { Icon, FormButton, 
        FormContent, FormH1, FormInput, FormLabel,
        FormWrapper, 
        FormButtonWrapper
    } 
from '../../components/useForm/formElements';

import { NgPageContainer, NgPaper } from '../../components/display/elements'
import { readPropertiesAction } from '../properties/actions'
import { readUnitsAction } from '../units/actions'
import Loader from '../../components/display/Loader'
import Controls from '../../components/controls/Controls'
import ToastAlert from '../../components/display/ToastAlert'
import { MainForm, useForm } from '../../components/useForm'
import { toTitleCase, commafy, TabTitle, radioItems, dateList, paymentFrequency, roundNearest5 } from '../../utils/globalFunc'
import { createLeaseAction } from './actions'

import moment from 'moment' 

import { RentInlineContainer, RentContainer, RentAmount, RentHeader, RTPaper,
         Container, NgDivider, PayDate, RentSummary, RText, InlineWrapper 
} from './elements';

import { toast } from 'react-toastify';
import PaperHeader from '../../components/display/paperHeader';
import { FaFileSignature } from 'react-icons/fa';
import { MdOutlineSummarize } from 'react-icons/md';



const LeaseForm = (props) => {

    TabTitle('Add Lease')

    const { newEntry } = props;
    const dispatch = useDispatch()

    const createLease = useSelector(state => state.createLease)
    const { loading, error: leaseCreateError, success, message } = createLease

    const readProperties = useSelector(state => state.readProperties)
    const { loading: readLoading, error: readError, success: readSuccess, properties, count } = readProperties

    const readUnits = useSelector(state => state.readUnits)
    const { loading: readUnitsLoading, error: readUnitsError, success: readUnitsSuccess, units, count: unitsCount } = readUnits

    let [ generateDate, setGenerateDate ] = useState([])

    let [ months, setMonths ] = useState()
    let [ days, setDays ] = useState()
    let [ years, setYears ] = useState()
    

    const dateDiff = useCallback((startingDate, endingDate) => {
        if (startingDate > endingDate) {
          const swap = startingDate;
          startingDate = endingDate;
          endingDate = swap;
        }
        const startYear = startingDate.getFullYear();
        const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
        const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      
        let yearDiff = endingDate.getFullYear() - startYear;
        let monthDiff = endingDate.getMonth() - startingDate.getMonth();
        if (monthDiff < 0) {
          yearDiff--;
          monthDiff += 12;
        }
        let dayDiff = endingDate.getDate() - startingDate.getDate();
        if (dayDiff < 0) {
          if (monthDiff > 0) {
            monthDiff--;
          } else {
            yearDiff--;
            monthDiff = 11;
          }
          dayDiff += daysInMonth[startingDate.getMonth()];
        }
        setMonths(monthDiff)
        setDays(dayDiff)
        setYears(yearDiff)
      
        // console.log(yearDiff + 'Y ' + monthDiff + 'M ' + dayDiff + 'D');
    })

    const removeDuplicateObjectFromArray = useCallback((array, key) => {
        var check = new Set();
        return array.filter(obj => !check.has(obj[key]) && check.add(obj[key]));
    });
    
    let finalDates = removeDuplicateObjectFromArray(generateDate, 'id')
    finalDates.shift()

   const totalInvoices = days > 0 ? months + years*12 + 1 : months + years*12

    const initialValues = {
        property: '',
        lease_unit: '',
        deposit: '',
        deposit_received : true,
        payment_frequency: "Monthly",
        rent_amount: "",
        rent_monthly_due_day: 5,
        first_invoice_date: "",
        lease_start: "",
        lease_end: ""
    }

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if('property' in fieldValues)
            temp.property = fieldValues.property ? "" : "Property is Required"
        if('lease_unit' in fieldValues)
            temp.lease_unit = fieldValues.lease_unit ? "" : "Unit is Required"
        if('rent_amount' in fieldValues)
            temp.rent_amount = fieldValues.rent_amount ? "" : "Rent is Required"
        if('first_invoice_date' in fieldValues)
            temp.first_invoice_date = fieldValues.first_invoice_date ? "" : "Date is Required"
        setErrors({ ...temp })

        // tests whether post array elements passes text implemented by validate() function
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }


    const { 
        values,  
        errors, 
        setErrors,
        handleInputChange
    } = useForm(initialValues, true, validate);

    const getUnits = () => {
        let property_id = values.property
        dispatch(readUnitsAction(property_id))
    }

    const totalRent = commafy(roundNearest5(Number(values.rent_amount*months + values.rent_amount*(years*12) + values.rent_amount/31 * days))) 
    
    
    let date = new Date().toISOString().slice(0, 10)
   
    let lease_start_date = new Date(values.lease_start);
    let lease_end_date   = new Date(values.lease_end);

    function pad2(n) {
        return (n < 10 ? '0' : '') + n;
    }

    var month = pad2(lease_start_date.getMonth()+1);//months (1-12)
    var day   = pad2(lease_start_date.getDate());//day (1-31)
    var year  = lease_start_date.getFullYear();
    
    let today =  year + "-" + month + "-" + day;

    let loop_dates = useCallback(() => {    
        let loop = new Date(lease_start_date);
        let i = 0;
        
        while (i<=lease_end_date.length || loop <= lease_end_date) {
            setMonths(i++ + 1)
            console.log("months", months)
            let invoice_start = new Date(loop)
            invoice_start.setDate(values.rent_monthly_due_day)
                var date  = invoice_start;
                var month = pad2(date.getMonth()+1);//months (1-12)
                var day   = pad2(date.getDate());//day (1-31)
                var year  = date.getFullYear();
                
                var formattedDate =  year + "-" + month + "-" + day;
                // alert(formattedDate); //2021-02-28
             
            if (!generateDate.includes(invoice_start)) {
                generateDate.push({id: i+1, value: formattedDate})
                let newDate = loop.setMonth(loop.getMonth() + 1);
                console.log("jiJane", generateDate)
                loop = new Date(newDate)
            }    
        }   
    })

    const submitHandler = (e) => {
        e.preventDefault()
        if (validate()) {
            dispatch(createLeaseAction(values, totalInvoices));
        }
    }   
    
    useEffect(() => {
        loop_dates()
        dateDiff(lease_start_date, lease_end_date)
    }, [values.lease_end, values.lease_start, values.rent_monthly_due_day])

    useEffect(() => {
        if (!values.properties) {
            dispatch(readPropertiesAction())
        }
    }, [])

    useEffect(() => {
        getUnits()
    }, [values.property])    
    
    
    

    return (
        <NgPageContainer>
            <Container>
            
            <InlineWrapper>
                <NgPaper padded>
                    {/* <PaperHeader heading="Create Lease">
                        <FaFileSignature />
                    </PaperHeader> */}
                    <MainForm onSubmit={submitHandler}>
                        <Grid container spacing={2}>
                            <Grid item md={6} sm={6} xs={12}>
                                <Controls.SelectField 
                                    label="Select Property"
                                    name="property"
                                    value={values.property}
                                    onChange={handleInputChange}
                                    options={properties}
                                    loadingText={readLoading && "fetching listed properties...."}
                                    successText={readSuccess && `${count} properties found`}
                                    error={count < 0 ? `No properties found...`
                                            : readError ? readError
                                            : errors.property
                                        }
                                />   
                                
                                {
                                    values.property && <Controls.SelectField 
                                        label="Select Occupied Unit"
                                        name="lease_unit"
                                        value={values.lease_unit}
                                        onChange={handleInputChange}
                                        options={units}
                                        loadingText={readUnitsLoading && "fetching listed units...."}
                                        successText={readUnitsSuccess && `${unitsCount} units found`}
                                        error = {count < 0 ? `No properties found...`: readUnitsError ? readUnitsError: errors.lease_unit}
                                    />
                                }

                                <Controls.InputField
                                    value={values.deposit}
                                    label="Deposit"
                                    name="deposit"
                                    type="number"
                                    onChange={handleInputChange}
                                />

                                <Controls.RadioGroup row
                                    name="deposit_received"
                                    value={values.deposit_received}
                                    label="Deposit Paid"
                                    onChange={handleInputChange}
                                    items={radioItems}>
                                </Controls.RadioGroup>

                                {
                                    values.lease_end && 
                                    <Controls.SelectDateField
                                        id = "date-list"
                                        label="When do you want the first invoice to be generated?"
                                        name="first_invoice_date"
                                        value={values.first_invoice_date}
                                        start_date={today}
                                        onChange={handleInputChange}
                                        options={finalDates}
                                        error={errors.first_invoice_date}
                                    />   
                                }    
                            </Grid>
                            
                            <Grid item md={6} sm={6} xs={12}>
                                <Controls.SelectField 
                                    label="Payment Frequency"
                                    name="payment_frequency"
                                    value={values.payment_frequency}
                                    onChange={handleInputChange}
                                    options={paymentFrequency}
                                />

                                <Controls.InputField
                                    name='rent_amount'
                                    value={values.rent_amount}
                                    onChange={handleInputChange}
                                    label='Rent'
                                    type="number"
                                    error={errors.rent_amount}
                                />

                                <Controls.DatePicker
                                    name="lease_start"
                                    label="Lease Start"
                                    value={values.lease_start}
                                    onChange={handleInputChange}
                                />

                                { 
                                    values.lease_start && <Controls.SelectField 
                                        label="Rent due on the"
                                        name="rent_monthly_due_day"
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <PayDate>of every month</PayDate>
                                            </InputAdornment>
                                        }
                                        value={values.rent_monthly_due_day}
                                        onChange={handleInputChange}
                                        options={dateList}
                                    />
                                }   

                                {
                                    values.lease_start && <Controls.DatePicker
                                        name="lease_end"
                                        label="Lease End"
                                        value={values.lease_end}
                                        onChange={handleInputChange}
                                    />
                                }
                            </Grid>
                        </Grid>
                        
                        <FormButtonWrapper>
                            
                                { loading ? <Loader btn /> : 
                                    <FormButton type='submit' disabled={loading}>Create Lease</FormButton> 
                                }
                            
                        </FormButtonWrapper>
                    </MainForm>
                </NgPaper>
            </InlineWrapper>

            <InlineWrapper>
                <NgPaper padded>
                    <PaperHeader heading="Rental Summary">
                        <MdOutlineSummarize />
                    </PaperHeader>
                    
                    <RentContainer>
                        <RentInlineContainer>
                            <RentHeader>
                                {
                                    values.rent_amount 
                                    ? <RentAmount>{totalRent}</RentAmount> 
                                    : <RentAmount>0.00</RentAmount>
                                }
                                <p>Total rent from lease for {`${months && months} months`}, {`${years && years} years`} and {`${days && days} days`}</p>
                                <RText>Unit: {values.unit}</RText>
                            </RentHeader>
                            
                            <RentSummary>
                                <div>
                                    <RText head>Rental lease for</RText>
                                    <RText>Fixed Term</RText>
                                </div>
                                <div>
                                    <RText head>Rent</RText>
                                    <RText>{commafy(values.rent_amount)}/month</RText>
                                </div>
                                <div>
                                    <RText head>Rental starts on</RText>
                                    <RText>{moment(values.lease_start).format('ll')}</RText>
                                </div>
                                <div>
                                    <RText head>Rental ends on</RText>
                                    {values.lease_end ? <RText>{moment(values.lease_end).format('ll')}</RText> : <RText>N/A</RText>}
                                </div>
                                {values.deposit && <div>
                                    <RText head>Deposit</RText>
                                    {values.deposit_received == true ? <strike><RText>{commafy(Number(values.deposit))}</RText></strike> : <RText>{commafy(Number(values.deposit))}</RText>}
                                </div>}
                                {values.first_invoice_date && <div>
                                    <RText head>First invoice due on</RText>
                                    <RText>{moment(values.first_invoice_date).format('ll')}</RText>
                                </div>}

                                {totalInvoices ? <div>
                                    <RText head>Total # invoices</RText>
                                    <RText>{totalInvoices}</RText>
                                </div> : ""}
                                
                            </RentSummary>
                        </RentInlineContainer>
                    </RentContainer>

                    <NgDivider />
                    <RentInlineContainer>
                        <RentSummary>
                            
                        </RentSummary>

                        <FormButton outline>
                            View rent schedule
                        </FormButton>
                    </RentInlineContainer>                    
                </NgPaper>
            </InlineWrapper>
        </Container>
            
        </NgPageContainer>
    )
}

export default LeaseForm


