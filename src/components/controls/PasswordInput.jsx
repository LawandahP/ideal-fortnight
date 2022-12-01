import React, { useState } from 'react';
import { FiEyeOff, FiEye } from 'react-icons/fi'

import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

// const useStyles = makeStyles(theme => ({}));

const PasswordInputField = (props) => {
    const {value, error=null, onChange, size, variant, ...other }  = props;

    const [ showPassword, setShowPassword ] = useState(false)

    const handleClickShowPassword = () => {
        if (!showPassword)
            setShowPassword(true)
        else 
            setShowPassword(false)
    };

    return (
        <>
            <p>Password</p>
            <TextField
                size={size || "small"}
                type={showPassword ? "text" : "password"}
                variant={variant || "outlined"}
                value={value}
                name="password"
                {...other}
                InputProps = {{
                    endAdornment :                                                    
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end">
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </IconButton>
                    </InputAdornment>
                }}
                onChange={onChange}
                {...(error && {error:true, helperText:error})}
            />
        </>
        
     );
};

export default PasswordInputField;
