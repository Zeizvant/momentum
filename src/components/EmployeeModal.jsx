import { useEffect } from 'react';
import useEmployeeForm from "src/hooks/useEmployeeForm.js";
import Modal from "src/components/Modal.jsx";
import useDepartments from "src/hooks/useDepartments.js";
import TextField from "src/components/employeeForm/TextField.jsx";
import ImageUploader from "src/components/employeeForm/ImageUploader.jsx";
import CustomDropdown from "src/components/CustomDropdown.jsx";
import Button from "src/components/buttons/Button.jsx";


const EmployeeModal = ({ isOpen, onClose }) => {
    const { departments } = useDepartments();

    const {
        formData,
        validation,
        imagePreview,
        submitLoading,
        submitError,
        resetForm,
        handleInputChange,
        handleFileChange,
        handleDeleteImage,
        handleDepartmentChange,
        isFormValid,
        handleSubmit
    } = useEmployeeForm(onClose);

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen]);

    const firstNameValidationRules = [
        { key: 'minLength', message: 'მინიმუმ 2 სიმბოლო' },
        { key: 'maxLength', message: 'მაქსიმუმ 255 სიმბოლო' },
        { key: 'onlyValidChars', message: 'მარტო ლათინური და ქართული სიმბოლოები' }
    ];

    const lastNameValidationRules = [
        { key: 'minLength', message: 'მინიმუმ 2 სიმბოლო' },
        { key: 'maxLength', message: 'მაქსიმუმ 255 სიმბოლო' },
        { key: 'onlyValidChars', message: 'მარტო ლათინური და ქართული სიმბოლოები' }
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="თანამშრომლის დამატება"
        >
            <div className='flex flex-col justify-between h-[440px]'>
                <div className='flex justify-between'>
                    <TextField
                        label="სახელი"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        validation={validation.firstName}
                        validationRules={firstNameValidationRules}
                    />
                    <TextField
                        label="გვარი"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        validation={validation.lastName}
                        validationRules={lastNameValidationRules}
                    />
                </div>

                <ImageUploader
                    label="ავატარი"
                    imagePreview={imagePreview}
                    validation={validation.avatar}
                    onFileChange={handleFileChange}
                    onDeleteImage={handleDeleteImage}
                />

                <div className='flex flex-col gap-[3px]'>
                    <CustomDropdown
                        options={departments}
                        onChange={handleDepartmentChange}
                        validation={validation.department}
                    />
                    {validation.department.touched && !validation.department.isValid && (
                        <p className="text-[10px] text-[#FA4D4D] mt-1">დეპარტამენტის არჩევა აუცილებელია</p>
                    )}
                </div>
            </div>

            {submitError && (
                <div className="text-[#FA4D4D] text-sm mt-2 text-center">
                    {submitError}
                </div>
            )}

            <div className='flex justify-end'>
                <div className='flex gap-[22px]'>
                    <Button variant="secondary" onClick={onClose}>
                        გაუქმება
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!isFormValid()}
                        isLoading={submitLoading}
                    >
                        დაამატე თანამშრომელი
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default EmployeeModal;