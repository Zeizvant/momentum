import { useState } from 'react';
import Logo from '../assets/logo.svg?react';
import AddTaskButton from "src/components/buttons/AddTaskButton.jsx";
import AddEmployeeButton from "src/components/buttons/AddEmployeeButton.jsx";
import EmployeeModal from "src/components/EmployeeModal.jsx";

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            <nav className='w-full max-w-[1920px] h-[100px] flex justify-between items-center px-[120px]'>
                <Logo/>
                <div className='flex items-center gap-[40px]'>
                    <AddEmployeeButton onClick={handleOpenModal} />
                    <AddTaskButton />
                </div>
            </nav>
            <EmployeeModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
}

export default Navbar;