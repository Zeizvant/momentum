const Button = ({
                    children,
                    onClick,
                    variant = 'primary',
                    disabled = false,
                    isLoading = false
                }) => {
    const getButtonStyles = () => {
        switch (variant) {
            case 'primary':
                return `px-5 py-2.5 text-white rounded-[5px] ${disabled || isLoading ? 'bg-[#B588F4] opacity-50 cursor-not-allowed' : 'bg-[#8338EC] hover:bg-[#B588F4] cursor-pointer'} transition-all ease-out duration-300 flex items-center justify-center`;
            case 'secondary':
                return 'px-[16px] py-[11px] text-[#212529] border border-[#8338EC] hover:border-[#B588F4] rounded-[5px] cursor-pointer transition-all ease-out duration-300';
            default:
                return '';
        }
    };

    return (
        <div
            onClick={disabled ? null : onClick}
            className={getButtonStyles()}
        >
            {isLoading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : null}
            {children}
        </div>
    );
};

export default Button;