import React from 'react';
import TextField from "src/components/employeeForm/TextField.jsx";

const TitleField = ({ value, onChange, validation, validationRules }) => {
    return (
        <div className='mb-[40px]'>
            <TextField
                label="სათაური"
                name="title"
                value={value}
                onChange={onChange}
                validation={validation}
                validationRules={validationRules}
                className="bg-white"
            />
        </div>
    );
};

export default TitleField;
