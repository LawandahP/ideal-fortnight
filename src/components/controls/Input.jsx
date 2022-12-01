import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { InputFieldWrapper, TextInput } from "./elements";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiInputBase-root.Mui-disabled": {
            "& fieldset": {
                borderColor: "grey",
                color: "grey",
            },

            "& input": {
                color: "grey",
            },
        },
        "& label.Mui-focused": {
            color: "#0057D9",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "yellow",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "grey",
            },
            "&:hover fieldset": {
                borderColor: "#0057D9",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#0057D9",
            },
        },
    },
}));

export function InputField(props) {
    const classes = useStyles();
    const {
        label, variant, name, value, error = null, onChange, type,
        size, multiline, sx, maxRows, ...other
    } = props;

    return (
        <InputFieldWrapper>
            <p>{label}</p>
            <TextField
                className={classes.root}
                multiline={multiline}
                sx={{ input: { color: "#999999" } }}
                size={size || "small"}
                maxRows={maxRows}
                type={type}
                variant={variant || "outlined"}
                // label={label}
                value={value}
                name={name}
                {...other}
                onChange={onChange}

                {...(error && { error: true, helperText: error })}
            />
        </InputFieldWrapper>
    );
}

export function TextInputField({ type, onChange, label, value, name }) {
    return (
        <TextInput
            type={type}
            name={name}
            value={value}
            onChange={onChange}
        ></TextInput>
    );
}
