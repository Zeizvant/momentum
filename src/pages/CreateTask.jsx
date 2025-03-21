import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { API_ENDPOINTS, API_TOKEN } from 'src/config/api';
import TitleField from "src/components/taskForm/TitleField.jsx";
import DescriptionField from "src/components/taskForm/DescriptionField.jsx";
import FormContainer from "src/components/taskForm/FormContainer.jsx";
import PriorityField from "src/components/taskForm/PriorityField.jsx";
import StatusField from "src/components/taskForm/StatusField.jsx";
import DepartmentField from "src/components/taskForm/DepartmentField.jsx";
import EmployeeField from "src/components/taskForm/EmployeeField.jsx";
import DueDateField from "src/components/taskForm/DueDateField.jsx";
import FormActions from "src/components/taskForm/FormActions.jsx";
import EmployeeModal from "src/components/EmployeeModal.jsx";

const CreateTask = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('taskFormData');
        return savedData ? JSON.parse(savedData) : {
            title: '',
            description: '',
            priority: null,
            status: null,
            department: null,
            employee: null,
            dueDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]
        };
    });

    const [validation, setValidation] = useState(() => {
        const savedData = localStorage.getItem('taskFormValidation');
        return savedData ? JSON.parse(savedData) : {
            title: {
                touched: false,
                isValid: false,
                minLength: false,
                maxLength: true
            },
            description: {
                touched: false,
                isValid: true,
                minWords: true,
                maxLength: true
            },
            priority: {
                touched: false,
                isValid: false
            },
            status: {
                touched: false,
                isValid: false
            },
            department: {
                touched: false,
                isValid: false
            },
            employee: {
                touched: false,
                isValid: false
            },
            dueDate: {
                touched: false,
                isValid: true
            }
        };
    });

    const [priorities, setPriorities] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        return () => {
            if (location.pathname !== '/') {
                localStorage.removeItem('taskFormData');
                localStorage.removeItem('taskFormValidation');
            }
        };
    }, [location]);

    useEffect(() => {
        const handleLogoClick = () => {
            localStorage.removeItem('taskFormData');
            localStorage.removeItem('taskFormValidation');
        };

        const logoElement = document.querySelector('.logo-element');
        if (logoElement) {
            logoElement.addEventListener('click', handleLogoClick);
        }

        return () => {
            if (logoElement) {
                logoElement.removeEventListener('click', handleLogoClick);
            }
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('taskFormData', JSON.stringify(formData));
        localStorage.setItem('taskFormValidation', JSON.stringify(validation));
    }, [formData, validation]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const prioritiesResponse = await fetch(API_ENDPOINTS.პრიორიტეტი, {
                    headers: { Authorization: API_TOKEN }
                });
                const prioritiesData = await prioritiesResponse.json();
                setPriorities(prioritiesData);

                if (!formData.priority) {
                    const mediumPriority = prioritiesData.find(p => p.name === 'საშუალო');
                    if (mediumPriority) {
                        handlePriorityChange(mediumPriority);
                    }
                }

                const statusesResponse = await fetch(API_ENDPOINTS.statuses, {
                    headers: { Authorization: API_TOKEN }
                });
                const statusesData = await statusesResponse.json();
                setStatuses(statusesData);

                if (!formData.status) {
                    const defaultStatus = statusesData.find(s => s.name === 'დასაწყები');
                    if (defaultStatus) {
                        handleStatusChange(defaultStatus);
                    }
                }

                const departmentsResponse = await fetch(API_ENDPOINTS.დეპარტამენტი, {
                    headers: { Authorization: API_TOKEN }
                });
                const departmentsData = await departmentsResponse.json();
                setDepartments(departmentsData);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchOptions();
    }, []);

    useEffect(() => {
        const fetchEmployees = async () => {
            if (!formData.department) return;

            try {
                const response = await fetch(API_ENDPOINTS.თანამშრომელი, {
                    headers: { Authorization: API_TOKEN }
                });
                const data = await response.json();
                const departmentEmployees = data.filter(emp => emp.department.id === formData.department.id);
                setEmployees(departmentEmployees);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, [formData.department]);

    const validateTitle = (value) => {
        const isMinLength = value.length >= 3;
        const isMaxLength = value.length <= 255;
        return {
            touched: true,
            isValid: isMinLength && isMaxLength,
            minLength: isMinLength,
            maxLength: isMaxLength
        };
    };

    const validateDescription = (value) => {
        if (!value.trim()) {
            return {
                touched: true,
                isValid: true,
                minWords: true,
                maxLength: true
            };
        }

        const words = value.trim().split(/\s+/);
        const isMinWords = words.length >= 4 || value.trim() === '';
        const isMaxLength = value.length <= 255;

        return {
            touched: true,
            isValid: isMinWords && isMaxLength,
            minWords: isMinWords,
            maxLength: isMaxLength
        };
    };

    const validateDueDate = (value) => {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const isValid = selectedDate >= today;

        return {
            touched: true,
            isValid: isValid
        };
    };

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, title: value }));
        setValidation(prev => ({ ...prev, title: validateTitle(value) }));
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, description: value }));
        setValidation(prev => ({ ...prev, description: validateDescription(value) }));
    };

    const handlePriorityChange = (priority) => {
        setFormData(prev => ({ ...prev, priority }));
        setValidation(prev => ({
            ...prev,
            priority: { touched: true, isValid: !!priority }
        }));
    };

    const handleStatusChange = (status) => {
        setFormData(prev => ({ ...prev, status }));
        setValidation(prev => ({
            ...prev,
            status: { touched: true, isValid: !!status }
        }));
    };

    const handleDepartmentChange = (department) => {
        setFormData(prev => ({ ...prev, department, employee: null }));
        setValidation(prev => ({
            ...prev,
            department: { touched: true, isValid: !!department },
            employee: { touched: false, isValid: false }
        }));
    };

    const handleEmployeeChange = (employee) => {
        if (employee.id === 'add') {
            setIsModalOpen(true);
            return;
        }

        setFormData(prev => ({ ...prev, employee }));
        setValidation(prev => ({
            ...prev,
            employee: { touched: true, isValid: !!employee }
        }));
    };

    const handleDateChange = (e) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, dueDate: value }));
        setValidation(prev => ({
            ...prev,
            dueDate: validateDueDate(value)
        }));
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const isFormValid = () => {
        return (
            validation.title.isValid &&
            validation.description.isValid &&
            validation.priority.isValid &&
            validation.status.isValid &&
            validation.department.isValid &&
            validation.employee.isValid &&
            validation.dueDate.isValid
        );
    };

    const handleSubmit = async () => {
        if (!isFormValid()) return;

        setIsSubmitting(true);
        setSubmitError('');

        try {
            const response = await fetch(API_ENDPOINTS.tasks, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: API_TOKEN
                },
                body: JSON.stringify({
                    name: formData.title,
                    description: formData.description,
                    priority_id: formData.priority.id,
                    status_id: formData.status.id,
                    department_id: formData.department.id,
                    employee_id: formData.employee.id,
                    due_date: formData.dueDate
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create task');
            }

            localStorage.removeItem('taskFormData');
            localStorage.removeItem('taskFormValidation');

            navigate('/');
        } catch (error) {
            console.error('Error creating task:', error);
            setSubmitError('დავალების შექმნა ვერ მოხერხდა. გთხოვთ სცადოთ მოგვიანებით.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNavigateHome = () => {
        localStorage.removeItem('taskFormData');
        localStorage.removeItem('taskFormValidation');
        navigate('/');
    };

    const titleValidationRules = [
        { key: 'minLength', message: 'მინიმუმ 3 სიმბოლო' },
        { key: 'maxLength', message: 'მაქსიმუმ 255 სიმბოლო' }
    ];

    const descriptionValidationRules = [
        { key: 'minWords', message: 'მინიმუმ 4 სიტყვა' },
        { key: 'maxLength', message: 'მაქსიმუმ 255 სიმბოლო' }
    ];

    const today = new Date().toISOString().split('T')[0];

    const isDescriptionEmpty = !formData.description.trim();

    return (
        <FormContainer>
            <div className='flex gap-[161px] h-[500px]'>
                <div className='w-[550px]'>
                    <TitleField
                        value={formData.title}
                        onChange={handleTitleChange}
                        validation={validation.title}
                        validationRules={titleValidationRules}
                    />

                    <DescriptionField
                        value={formData.description}
                        onChange={handleDescriptionChange}
                        validation={validation.description}
                        validationRules={descriptionValidationRules}
                        isDescriptionEmpty={isDescriptionEmpty}
                    />

                    <div className='flex gap-[30px] mb-[40px]'>
                        <PriorityField
                            options={priorities}
                            onChange={handlePriorityChange}
                            selectedOption={formData.priority}
                        />

                        <StatusField
                            options={statuses}
                            onChange={handleStatusChange}
                            selectedOption={formData.status}
                        />
                    </div>
                </div>

                <div className='w-[550px] flex flex-col justify-between'>
                    <div className='mb-[40px]'>
                        <DepartmentField
                            options={departments}
                            onChange={handleDepartmentChange}
                            selectedOption={formData.department}
                        />

                        {formData.department && (
                            <EmployeeField
                                options={[
                                    { id: 'add', name: 'დაამატე თანამშრომელი' },
                                    ...employees
                                ]}
                                onChange={handleEmployeeChange}
                                selectedOption={formData.employee}
                            />
                        )}
                    </div>

                    <DueDateField
                        value={formData.dueDate}
                        onChange={handleDateChange}
                        validation={validation.dueDate}
                        today={today}
                    />
                </div>
            </div>

            <FormActions
                isFormValid={isFormValid()}
                isSubmitting={isSubmitting}
                submitError={submitError}
                onSubmit={handleSubmit}
            />

            <EmployeeModal isOpen={isModalOpen} onClose={handleModalClose} />
        </FormContainer>
    );
};

export default CreateTask;