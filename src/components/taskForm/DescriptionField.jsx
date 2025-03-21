import React from 'react';
import ValidationIcon from "src/assets/check.svg?react";
import SuccessValidationIcon from "src/assets/successCheck.svg?react";
import FailedValidationIcon from "src/assets/failedCheck.svg?react";

const DescriptionField = ({ value, onChange, validation, validationRules, isDescriptionEmpty }) => {
    return (
        <div className='mb-[40px]'>
            <div className='text-[#343A40] text-sm font-medium mb-[3px]'>აღწერა</div>
            <textarea
                value={value}
                onChange={onChange}
                className={`w-full h-[150px] p-[10px] rounded-[6px] border bg-white ${
                    !validation.touched
                        ? 'border-[#CED4DA] focus:border-[#8338EC]'
                        : validation.isValid && !isDescriptionEmpty
                            ? 'border-[#08A508]'
                            : !validation.isValid
                                ? 'border-[#FA4D4D]'
                                : 'border-[#CED4DA]'
                } resize-none focus:outline-none`}
            />
            {validationRules.map((rule, index) => (
                <div key={index} className='flex gap-[2px] items-center mt-[5px]'>
                    {!validation.touched || isDescriptionEmpty ? (
                        <ValidationIcon />
                    ) : validation[rule.key] ? (
                        <SuccessValidationIcon />
                    ) : (
                        <FailedValidationIcon />
                    )}
                    <p className={`text-[10px] ${
                        !validation.touched || isDescriptionEmpty
                            ? 'text-[#6C757D]'
                            : validation[rule.key]
                                ? 'text-[#08A508]'
                                : 'text-[#FA4D4D]'
                    } font-[230]`}>
                        {rule.message}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default DescriptionField;