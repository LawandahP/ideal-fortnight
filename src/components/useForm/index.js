import React, { useState } from 'react'

import { makeStyles } from '@mui/styles';
import { NgFormWrapper } from './formElements';


const useStyle = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root' : {
            width: '100%',
            marginTop: '3px',
            marginBottom: '8px'
        }

    }
}))

export const useForm = (initialValues, validateOnChange=false, validate) => {

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleResetForm = () => {
        setValues({})
        // document.getElementById('contained-button-file').value = null
        setErrors({})
    }

    const handleInputChange = e => {
        // if (e.target.files && e.target.files[0]) {
        //     let image_file = e.target.files[0];
        //     let staff_image = e.target.files[0];
        //     const reader = new FileReader();
        //     reader.onload = x => {
        //         setValues({
        //             ...values,
        //             image_file,
        //             staff_image,
        //             image_src: x.target.result
        //         })
        //     }
        //     reader.readAsDataURL(image_file)
        // }  else {
        const { name, value } = e?.target
        setValues({
            ...values,
            [name]:value
        })


        //check whether validateonChange is true
        if(validateOnChange)
            validate({[name]:value})  
    }
    
    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleResetForm,
    }
}


export const MainForm = (props) => {
    const classes = useStyle();
    const { children, ...other } = props
    return (
        <form className={classes.root} {...other}>
            {children}
        </form>
    )
}
