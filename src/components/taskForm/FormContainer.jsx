import React from 'react';

const FormContainer = ({ children }) => {
    return (
        <div className="w-full max-w-[1920px] px-[120px] mt-[40px] font-[FiraGO]">
            <h1 className='mt-[40px] mb-[25px] text-[#212529] text-[34px] font-semibold'>შექმენი ახალი დავალება</h1>
            <div className='bg-[#FBF9FFA6] border border-[0.3px] border-[#DDD2FF] w-full pl-[55px] pt-[65px]'>
                {children}
            </div>
        </div>
    );
};

export default FormContainer;