import ValidationIcon from 'src/assets/check.svg?react'
import SuccessValidationIcon from 'src/assets/successCheck.svg?react'
import FailedValidationIcon from 'src/assets/failedCheck.svg?react'

const TextField = ({
                       label,
                       name,
                       value,
                       onChange,
                       validation,
                       validationRules = []
                   }) => {
    const getBorderColor = () => {
        if (!validation.touched) return 'border-[#CED4DA]';
        return validation.isValid ? 'border-[#08A508]' : 'border-[#FA4D4D]';
    };

    const getTextColor = (condition) => {
        if (!validation.touched) return 'text-[#6C757D]';
        if (condition) return 'text-[#08A508]';
        return 'text-[#FA4D4D]';
    };

    const getValidationIcon = (condition) => {
        if (!validation.touched) {
            return <ValidationIcon />;
        } else if (condition) {
            return <SuccessValidationIcon />;
        } else {
            return <FailedValidationIcon />;
        }
    };

    return (
        <div className='flex flex-col w-full gap-[3px]'>
            <div className='text-[#343A40] text-sm font-medium'>{label}*</div>
            <input
                name={name}
                value={value}
                onChange={onChange}
                className={`bg-white h-[42px] border ${getBorderColor()} rounded-[6px] p-[10px] focus:outline-none mb-[5px] ${!validation.touched && 'focus:border-[#8338EC]'}`}
                type='text'
            />
            {validationRules.map((rule, index) => (
                <div key={index} className='flex gap-[2px] items-center'>
                    {getValidationIcon(validation[rule.key])}
                    <p className={`text-[10px] ${getTextColor(validation[rule.key])} font-[230]`}>
                        {rule.message}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default TextField;