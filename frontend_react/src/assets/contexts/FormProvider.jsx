import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState(null);

    const setForm = (data) => {
        setFormData(data);
    };

    return (
        <FormContext.Provider value={{ formData, setForm }}>
            {children}
        </FormContext.Provider>
    );
};
