import { useEffect } from 'react';
import CancelButton from 'src/assets/cancel.svg?react'

const Modal = ({
                   isOpen,
                   onClose,
                   title,
                   children
               }) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="font-['FiraGO'] fixed inset-0 bg-opacity-50 backdrop-blur-xs z-50 flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out" onClick={onClose}>
            <div
                className="bg-white rounded-[10px] w-[913px] h-[766px] px-[50px] py-[40px] shadow-[0_0_10px_rgba(0,0,0,0.3)] transform transition-all duration-300 ease-in-out scale-100 opacity-100"
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex flex-col justify-between h-full'>
                    <div className='flex justify-end w-full'>
                        <CancelButton onClick={onClose} className='cursor-pointer' />
                    </div>
                    <div>
                        <p className='text-[32px] text-[#212529] font-medium text-center'>{title}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;