import { useState, useEffect } from 'react';
import Logo from '../assets/logo.svg?react';
import AddTaskButton from 'src/components/buttons/AddTaskButton.jsx';
import AddEmployeeButton from 'src/components/buttons/AddEmployeeButton.jsx';
import EmployeeModal from 'src/components/EmployeeModal.jsx';
import { useNavigate } from 'react-router-dom';
import { clearAllFilters } from 'src/store/filterSlice';
import {useDispatch} from "react-redux";

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const dispatch = useDispatch();

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavigation = (path) => {
        dispatch(clearAllFilters());
        navigate(path);
    };

    return (
        <>
            <div className={`h-[100px] ${isScrolled ? 'block' : 'hidden'}`}></div>

            <nav
                className={`w-full max-w-[1920px] h-[100px] flex justify-between items-center px-[120px] ${
                    isScrolled ? 'fixed top-0 left-0 right-0 bg-white shadow-sm z-50' : 'relative'
                }`}
            >
                <Logo className='cursor-pointer' onClick={() => handleNavigation('/')} />
                <div className='flex items-center gap-[40px]'>
                    <AddEmployeeButton onClick={handleOpenModal} />
                    <AddTaskButton onClick={() => handleNavigation('/create-task')} />
                </div>
            </nav>

            <EmployeeModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
};

export default Navbar;