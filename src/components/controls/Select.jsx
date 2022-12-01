import React from "react";
import { Select as MuiSelect, FormHelperText } from "@mui/material";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { LoadingText, SelectInputField, SuccessText, SelectInputLabel, SelectInputContainer, SelectOption } from "./elements";

import moment from 'moment';
import { Status } from "../../screens/user.elements";


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

        "& .MuiSelect-icon": {
            color: "grey",

        },

        "& .MuiSelect-select": {
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
        }
        
    },
}));


export function SelectField(props) {
    const classes = useStyles(); 
    const {
        name,
        label,
        value,
        error = null,
        loadingText,
        successText,
        onChange,
        options,
        size,
        endAdornment,
        style
    } = props;

    return (
        <>
            <p>{label}</p>
            <FormControl
                variant="outlined"
                style={style}
                {...(error && { error: true })}
            >
                <MuiSelect
                    size={size || "small"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    endAdornment={endAdornment}
                >
                    <MenuItem active value="">None</MenuItem>
                    {options?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {   item?.name
                                ? item.name
                                : item?.full_name
                                // ? item.full_name
                                ?`${item.full_name} - ${item?.is_active ? "active" : "deactivated"}`
                                : item?.property_model
                                ? item.property_model
                                : item?.unit_no 
                                ? `${item.unit_no} - ${item?.tenant?.full_name ? item?.tenant?.full_name : "vacant"}`
                                : item?.title
                            }
                        </MenuItem>
                    ))}
                </MuiSelect>
                {error && <FormHelperText>{error}</FormHelperText>}
                <LoadingText>{loadingText}</LoadingText>
                <SuccessText>{successText}</SuccessText>
            </FormControl>
        </>
    );
}



export function SelectDateField(props) {
    const {
        name,
        label,
        value,
        error = null,
        onChange,
        options,
        size,
        endAdornment,
        start_date
    } = props;

    return (
        <>
            <p>{label}</p>
            <FormControl
                variant="outlined"
                {...(error && { error: true })}
            >
                <MuiSelect
                    size={size || "large"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    endAdornment={endAdornment}
                >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value={start_date}>{moment(start_date).format('ll')}</MenuItem>
                    {options?.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                            {/* {item.value} */}
                            {moment(item.value).format('ll')}
                        </MenuItem>
                    ))}
                </MuiSelect>
                {error && <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        </>
    );
}



export function SelectInput({options, onChange, label, value, name}) {
    return (
        <SelectInputContainer>
            <SelectInputLabel>{label}</SelectInputLabel>
            <SelectInputField
                value={value}
                name={name}
                onChange={onChange}>
                <SelectOption value="">All</SelectOption>
                {options.map((item) => (
                    <SelectOption key={item.id} value={item.id}>
                        {   item?.name
                            ? item.name
                            : item?.full_name
                            ? item.full_name
                            : item?.property_model
                            ? item.property_model
                            : item?.unit_no 
                            ? item.unit_no
                            : item.title
                            }
                    </SelectOption>
                ))}
            </SelectInputField>
        </SelectInputContainer>
        
    )
};

export function AutoCompleteField(props) {
    const {name, label, value, error = null, onChange, options, size } = props;
    return (
    
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            name={name}
            label={label}
            options={options}
            size={size || "small"}
            // sx={{ width: 300 }}
            renderInput={(params) => (
                <TextField {...params} value={value} onChange={onChange} {...(error && { error: true })}/>
            )}
        />
        
    );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export function MultipleSelect(props) {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                        <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}


