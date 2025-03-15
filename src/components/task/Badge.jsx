import React from 'react';
import MediumIcon from 'src/assets/medium.svg?react'
import HighIcon from 'src/assets/high.svg?react'
import LowIcon from 'src/assets/low.svg?react'

const Badge = ({ type }) => {
    const styles = {
        medium: {
            borderColor: '#FFBE0B',
            textColor: '#FFBE0B',
            icon: <MediumIcon />,
            label: 'საშუალო',
        },
        high: {
            borderColor: '#FA4D4D',
            textColor: '#FA4D4D',
            icon: <HighIcon />,
            label: 'მაღალი',
        },
        low: {
            borderColor: '#08A508',
            textColor: '#08A508',
            icon: <LowIcon />,
            label: 'დაბალი',
        },
    };

    const { borderColor, textColor, icon, label } = styles[type] || styles.medium;

    return (
        <div
            className='px-[6px] h-[26px] rounded-[4px] border-[0.5px] flex justify-center items-center gap-[4px]'
            style={{ borderColor, color: textColor }}
        >
            {icon}
            <span className='text-xs font-medium'>{label}</span>
        </div>
    );
};

export default Badge;