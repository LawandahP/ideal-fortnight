import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup as MuiRadioGroup,
} from "@mui/material";
import React from "react";
import {
    RadioButton,
    Item,
    RadioButtonLabel,
    CategoryInfo,
    Label,
} from "../../screens/maintenance/elements";

export const RadioGroup = (props) => {
    const { name, label, onChange, value, items, error } = props;
    return (
        <FormControl {...(error && { error: true })}>
            
            <FormLabel sx={{ fontSize: "12px", fontFamily: "Poppins" }}>
                {label}
            </FormLabel>

            <MuiRadioGroup row 
                sx={{ fontSize: "12px", fontFamily: "Poppins" }} 
                name={name} value={value} 
                onChange={onChange}>
                {items.map((item, index) => (
                    <FormControlLabel
                        key={item.id}
                        value={item.id}
                        control={
                            <Radio
                                sx={{
                                    "& .MuiSvgIcon-root": {
                                        fontSize: 15,
                                        color: "#0057D9",
                                    },
                                }}
                            />
                        }
                        label={item.title}
                    />
                ))}
            </MuiRadioGroup>
        </FormControl>
    );
};

export const CategoryGroup = (props) => {
    const { items, onChange, label, icon } = props;

    return (
        <>
            {items.map((item, index) => (
                <Item>
                    <RadioButton
                        type="radio"
                        name="category"
                        value={item.id}
                        // checked={select === "Electricity"}
                        onChange={onChange}
                    />
                    <RadioButtonLabel />
                    <CategoryInfo>
                        <Label>{item.title}</Label>
                        {item.icon}
                    </CategoryInfo>
                </Item>
            ))}
        </>
    );
};
