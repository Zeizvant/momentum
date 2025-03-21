import { useState } from 'react';
import Logo from '../assets/logo.svg?react';
import AddTaskButton from "src/components/buttons/AddTaskButton.jsx";
import AddEmployeeButton from "src/components/buttons/AddEmployeeButton.jsx";
import EmployeeModal from "src/components/EmployeeModal.jsx";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const navigate = useNavigate();

    return (
        <>
            <nav className='w-full max-w-[1920px] h-[100px] flex justify-between items-center px-[120px]'>
                <Logo className='cursor-pointer' onClick={() => navigate("/")}/>
                <div className='flex items-center gap-[40px]'>
                    <AddEmployeeButton onClick={handleOpenModal} />
                    <AddTaskButton onClick={() => navigate("/create-task")} />
                </div>
            </nav>
            <EmployeeModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
}

export default Navbar;