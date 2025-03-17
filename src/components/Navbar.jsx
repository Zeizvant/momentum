import Logo from '../assets/logo.svg?react';

import AddCustomerButton from "src/components/buttons/AddCustomerButton.jsx";
import AddTaskButton from "src/components/buttons/AddTaskButton.jsx";
const Navbar = () => {
    return (
        <nav className='w-full max-w-[1920px] h-[100px] flex justify-between items-center px-[120px]'>
            <Logo/>
            <div className='flex items-center gap-[40px]'>
                <AddCustomerButton />
                <AddTaskButton />
            </div>
        </nav>
    );
}

export default Navbar