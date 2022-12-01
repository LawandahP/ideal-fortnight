import React from "react";
import { makeStyles } from "@mui/styles";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import { FiSearch } from "react-icons/fi";

const useStyles = makeStyles((theme) => ({
    root: {
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

const SearchInputField = (props) => {
    const classes = useStyles();
    const {
        className,
        label,
        name,
        value,
        onChange,
        type,
        size,
        variant,
        ...other
    } = props;

    return (
        <TextField
            className={classes.root}
            sx={{ input: { color: "#999999" } }}
            placeholder={label}
            size={size || "small"}
            variant={variant || "outlined"}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <FiSearch style={{ color: "#999999" }} />
                    </InputAdornment>
                ),
            }}
            onChange={onChange}
            {...other}
        />
    );
};

export default SearchInputField;
