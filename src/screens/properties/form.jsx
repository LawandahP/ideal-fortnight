import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Controls from '../../components/controls/Controls'
import ToastAlert from '../../components/display/ToastAlert'
import Loading from '../../components/display/Loader'

import { MainForm, useForm } from '../../components/useForm'
import { toTitleCase } from '../../utils/globalFunc'
import { FormButton } from '../../components/useForm/formElements';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { readPropertyTypesAction } from './actions';
import { readLandlordsAction } from '../landlords/actions';


import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { PropertyPropertiesContext } from '../../context';
import { Grid } from '@mui/material'

import AddLocation from '../../components/maps/add_location';
import DropFileInput from '../../components/drag_and_drop/DropFileInput'
import { ControlLabel } from '../maintenance/elements'


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


function getStyles(name, val, theme) {
    return {
        fontWeight:
            val.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}




const PropertyForm = (props) => {
    const { newEntry } = props;

    const [ files, setFiles] = useState([])

    const { types, setTypes, landlords, setLandlords, amenitiez,
        setAmenities, loading, setLoading, error, setError } = useContext(PropertyPropertiesContext)

    const createProperty = useSelector(state => state.createProperty)
    const { loading: loadingCreate, error: errorCreate, success, message } = createProperty

    const readPropertyTypes = useSelector(state => state.readPropertyTypes)
    const { loading: loadingtypes, success: successTypes, property_types } = readPropertyTypes

    

    const options = types?.map((option) => {
        const firstLetter = option.property_model[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        }
    });

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "Name is Required"
        setErrors({ ...temp })

        // tests whether post array elements passes text implemented by validate() function
        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const initialValues = {
        name: '',
        address: '',
        property_type: '',
        amenities: [

        ],
        description: '',
        owner: '',
        property_images: ''
    }

    const {
        values,
        errors,
        setValues,
        setErrors,
        handleResetForm,
        handleInputChange
    } = useForm(initialValues, true, validate);

    const submitHandler = (e) => {
        e.preventDefault()
        if (validate()) {
            const formData = new FormData()
            formData.append('name', values.name)
            formData.append('address', values.address)
            formData.append('property_type', values.property_type)

            for (let i = 0; i < files.length; i++) {
                formData.append('property_images', files[i])
            }
            formData.append('description', values.description)
            formData.append('owner', values.owner)
            newEntry(formData);
        }
        // if (validate()) {
        //     newEntry(values, handleResetForm);
        // }
    }


    const theme = useTheme();
    const [val, setVal] = React.useState(initialValues.amenities);
    console.log(val)
    // const handleAmenitiesOnChange = e => {
    //     let amenities = values.amenities;
    //     var key = e.target.name;
    //     var value = e.target.value;
    //     amenities[key] = value;
    //     setValues({
    //         ...values,
    //         amenities,
    //         [key]:value
    //     });
    // }

    const handleChange = (event) => {
        const { target: { name, value } } = event;
        setVal(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    return (
        <>
            <MainForm onSubmit={submitHandler}>
                {/* <AddLocation /> */}
                <Grid container spacing={2}>
                    <Grid item md={6} sm={6} xs={12}>
                        <Controls.InputField
                            value={values.name}
                            name='name'
                            onChange={handleInputChange}
                            label='Name'
                            error={errors.name}
                            onInput={(e) => e.target.value = toTitleCase(e.target.value)}>
                        </Controls.InputField>
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        <Controls.SelectField
                            label="Property Type"
                            value={values.property_type}
                            name="property_type"
                            onChange={handleInputChange}
                            list_value="property_model"
                            options={types}
                        />
                    </Grid>

                </Grid>
                
                <Controls.InputField
                    value={values.address}
                    name='address'
                    multiline
                    rows={2}
                    onChange={handleInputChange}
                    label='Address(Optional)'
                    error={errors.address}>
                </Controls.InputField>
                

                <Controls.SelectField
                    label="Owner"
                    value={values.owner}
                    name="owner"
                    onChange={handleInputChange}
                    list_value="full_name"
                    options={landlords}
                />


                <FormControl sx={{ mt: 3, width: "100%" }}>
                    <p>Amenities</p>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={val}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Amenities" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {amenitiez?.map((amenity) => (
                            <MenuItem
                                key={amenity.name}
                                value={amenity.id}
                                style={getStyles(amenity, val, theme)}
                            >
                                {amenity.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Controls.InputField
                    value={values.description}
                    multiline
                    rows={3}
                    name='description'
                    onChange={handleInputChange}
                    label='Description(Optional)'
                    error={errors.description}>
                </Controls.InputField>
                
                <ControlLabel>Upload Images(Optional)</ControlLabel>
                <DropFileInput files={files} setFiles={setFiles}/>
                
                {   loadingCreate ? <Loading btn /> : 
                    <FormButton type='submit'>
                        Submit 
                    </FormButton>
                }
                
            </MainForm>

            {/* </Container> */}
        </>
    )
}

export default PropertyForm