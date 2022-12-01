import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Controls from "../../components/controls/Controls";
import ToastAlert from "../../components/display/ToastAlert";
import Loading from "../../components/display/Loader";

import { MainForm, useForm } from "../../components/useForm";
import { categoryList, toTitleCase } from "../../utils/globalFunc";
import { FormButton } from "../../components/useForm/formElements";
import { toast } from "react-toastify";

const MaintenanceEditForm = (props) => {
    const { editEntry, recordForEdit, maintenanceId } = props;

    const statusItems = [
        { id: "UnResolved", name: "UnResolved" },
        { id: "Resolved", name: "Resolved" },
        { id: "Pending", name: "Pending" },
        { id: "Cancelled", name: "Cancelled" },
    ];

    const updateMaintenance = useSelector((state) => state.updateMaintenance);
    const { loading, error, success, message } = updateMaintenance;

    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("status" in fieldValues)
            temp.status = fieldValues.status ? "" : "Status is Required";
        if ("category" in fieldValues)
            temp.category = fieldValues.category ? "" : "Category is Required";
        if ("description" in fieldValues)
            temp.description = fieldValues.description
                ? ""
                : "Description is Required";
        setErrors({ ...temp });
        if (fieldValues === values)
            return Object.values(temp).every((x) => x === "");
    };

    const initialValues = {
        status: "",
        category: "",
        description: "",
    };

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleResetForm,
        handleInputChange,
    } = useForm(initialValues, true, validate);

    const submitHandler = (e) => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData();
            formData.append("status", values.status);
            editEntry(values, handleResetForm);
        }
    };

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit,
            });
    }, [recordForEdit, success, loading, error, setValues, maintenanceId]);

    return (
        <>
            <MainForm onSubmit={submitHandler}>
                <Controls.SelectField
                    label="Status"
                    value={values.status}
                    name="status"
                    onChange={handleInputChange}
                    options={statusItems}
                    error={errors.status}
                />

                <Controls.SelectField
                    label="Category"
                    value={values.category}
                    name="category"
                    onChange={handleInputChange}
                    options={categoryList}
                    error={errors.category}
                />

                <Controls.InputField
                    multiline
                    label="Description"
                    rows={4}
                    sx={{ width: "100%", fontFamily: "Poppins" }}
                    error={errors.description}
                    value={values.description}
                    name="description"
                    onChange={handleInputChange}
                    placeholder="Brief description of the maintenance issue"
                ></Controls.InputField>

                {loading ? (
                    <Loading btn />
                ) : (
                    <FormButton type="submit">Submit</FormButton>
                )}
            </MainForm>
        </>
    );
};

export default MaintenanceEditForm;
