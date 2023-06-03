import { useState, useCallback } from "react";

function useFormValidation() {
    const [values, setValues] = useState({});
    const [isValid, setIsValid] = useState(true);
    const [errors, setErrors] = useState({});

    function handleChange(e) {
        const { name, value, validationMessage, form } = e.target;
        setValues((oldValues) => ({ ...oldValues, [name]: value }));
        setErrors((oldErrors) => ({ ...oldErrors, [name]: validationMessage }))
        setIsValid(form.checkValidity())
    }

    const setValue = useCallback((name, value) => {
        setValues((oldValues) => ({ ...oldValues, [name]: value }));
    }, []);

    const resetValidation = useCallback((values = {}, valid = false, error = {}) => {
        setValues(values);
        setIsValid(valid);
        setErrors(error);
    },
        [setValues, setIsValid, setErrors]
    );

    return { values, isValid, errors, handleChange, setValue, resetValidation, setIsValid }
}

export default useFormValidation;