import PlusIcon from "src/assets/add.svg?react";

export default function AddTaskButton() {
    return (
        <div
            className='px-5 py-2.5 text-white rounded-[5px] bg-[#8338EC] flex gap-1 items-center hover:bg-[#B588F4] cursor-pointer transition-all ease-out duration-300'>
            <PlusIcon/>
            შექმენი ახალი დავალება
        </div>
    )
}