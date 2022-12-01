import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker as DynamicDatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateInputPicker, HelperText } from './elements';

export const DateInput = (props) => {

    const { name, value, onChange, label, views } = props

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <p>{label}</p>
            <DynamicDatePicker
                name={name}
                views={['year']}
                value={value}
                onChange={date => onChange(convertToDefEventPara(name, date))}
                renderInput={(params) => <TextField {...params} size="small" helperText={null} />}
            />
        </LocalizationProvider>
    )
}

export const DatePicker = (props) => {
    const { name, value, onChange, label, helperText } = props
    // const convertToDefEventPara = (name, value) => ({
    //     target: {
    //         name, value
    //     }
    // })

    return (
        <>
            <p>{label}</p>
            <DateInputPicker
                type="date"
                name={name}
                value={value}
                onChange={onChange}>
            </DateInputPicker>
            <HelperText>{helperText}</HelperText>
        </>
    )
}

