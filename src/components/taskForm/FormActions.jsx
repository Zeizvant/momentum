import React from 'react';

const FormActions = ({ isFormValid, isSubmitting, submitError, onSubmit }) => {
    return (
        <div className='mt-[20px] flex justify-end w-full pr-[368px] mt-[150px] mb-[60px]'>
            <button
                className={`px-[20px] py-[10px] rounded-[5px] ${
                    isFormValid
                        ? 'bg-[#8338EC] hover:bg-[#B588F4] cursor-pointer'
                        : 'bg-[#B588F4] cursor-not-allowed'
                } text-white text-sm font-normal transition-all ease-out duration-300`}
                onClick={onSubmit}
                disabled={!isFormValid || isSubmitting}
            >
                {isSubmitting ? 'დაველოდოთ...' : 'დავალების შექმნა'}
            </button>

            {submitError && (
                <p className="text-[#FA4D4D] text-sm mt-3">{submitError}</p>
            )}
        </div>
    );
};

export default FormActions;