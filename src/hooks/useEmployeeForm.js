import { useState } from 'react';
import { API_ENDPOINTS, API_TOKEN } from 'src/config/api.js';

const useEmployeeForm = (onSubmitSuccess) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        avatar: null,
        department: null
    });

    const [validation, setValidation] = useState({
        firstName: {
            isValid: false,
            minLength: false,
            maxLength: true,
            onlyValidChars: true,
            touched: false
        },
        lastName: {
            isValid: false,
            minLength: false,
            maxLength: true,
            onlyValidChars: true,
            touched: false
        },
        avatar: {
            isValid: false,
            fileSelected: false,
            validType: true,
            validSize: true,
            touched: false
        },
        department: {
            isValid: false,
            touched: false
        }
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            avatar: null,
            department: null
        });
        setValidation({
            firstName: {
                isValid: false,
                minLength: false,
                maxLength: true,
                onlyValidChars: true,
                touched: false
            },
            lastName: {
                isValid: false,
                minLength: false,
                maxLength: true,
                onlyValidChars: true,
                touched: false
            },
            avatar: {
                isValid: false,
                fileSelected: false,
                validType: true,
                validSize: true,
                touched: false
            },
            department: {
                isValid: false,
                touched: false
            }
        });
        setImagePreview(null);
        setSubmitError(null);
    };

    const validateName = (name, field) => {
        const minLength = name.length >= 2;
        const maxLength = name.length <= 255;
        const georLatRegex = /^[a-zA-ZÀ-ÿა-ჰ\s]*$/;
        const onlyValidChars = georLatRegex.test(name);
        const isValid = minLength && maxLength && onlyValidChars;

        setValidation(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                isValid,
                minLength,
                maxLength,
                onlyValidChars,
                touched: true
            }
        }));

        return isValid;
    };

    const validateAvatar = (file) => {
        const fileSelected = !!file;
        const validType = file ? file.type.startsWith('image/') : true;
        const validSize = file ? file.size <= 600 * 1024 : true; // 600KB
        const isValid = fileSelected && validType && validSize;

        setValidation(prev => ({
            ...prev,
            avatar: {
                isValid,
                fileSelected,
                validType,
                validSize,
                touched: true
            }
        }));

        return isValid;
    };

    const validateDepartment = (department) => {
        const isValid = !!department;

        setValidation(prev => ({
            ...prev,
            department: {
                isValid,
                touched: true
            }
        }));

        return isValid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        validateName(value, name);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setFormData(prev => ({
            ...prev,
            avatar: file
        }));

        validateAvatar(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleDeleteImage = () => {
        setImagePreview(null);
        setFormData(prev => ({
            ...prev,
            avatar: null
        }));
        validateAvatar(null);
    };

    const handleDepartmentChange = (department) => {
        setFormData(prev => ({
            ...prev,
            department
        }));

        validateDepartment(department);
    };

    const isFormValid = () => {
        return validation.firstName.isValid &&
            validation.lastName.isValid &&
            validation.avatar.isValid &&
            validation.department.isValid;
    };

    const handleSubmit = async () => {
        setValidation(prev => ({
            firstName: { ...prev.firstName, touched: true },
            lastName: { ...prev.lastName, touched: true },
            avatar: { ...prev.avatar, touched: true },
            department: { ...prev.department, touched: true }
        }));

        const firstNameValid = validateName(formData.firstName, 'firstName');
        const lastNameValid = validateName(formData.lastName, 'lastName');
        const avatarValid = validateAvatar(formData.avatar);
        const departmentValid = validateDepartment(formData.department);

        if (firstNameValid && lastNameValid && avatarValid && departmentValid) {
            try {
                setSubmitLoading(true);
                setSubmitError(null);

                const formDataToSend = new FormData();
                formDataToSend.append('name', formData.firstName);
                formDataToSend.append('surname', formData.lastName);
                formDataToSend.append('avatar', formData.avatar);
                formDataToSend.append('department_id', formData.department.id);

                const response = await fetch(API_ENDPOINTS.თანამშრომელი, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        Authorization: API_TOKEN
                    },
                    body: formDataToSend
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to add employee');
                }

                const responseData = await response.json();
                console.log('Employee added successfully:', responseData);

                onSubmitSuccess();
            } catch (error) {
                console.error('Error adding employee:', error);
                setSubmitError(error.message || 'Failed to add employee. Please try again.');
            } finally {
                setSubmitLoading(false);
            }
        }
    };

    return {
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
    };
};

export default useEmployeeForm;