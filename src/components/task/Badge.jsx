import React from 'react';

const Badge = ( {priority} ) => {
    const styles = {
        2: {
            colorHex: '#FFBE0B',
        },
        3: {
            colorHex: '#FA4D4D',
        },
        1: {
            colorHex: '#08A508',
        },
    };

    const { colorHex } = styles[priority.id];

    return (
        <div
            className='px-[6px] h-[26px] rounded-[4px] border-[0.5px] flex justify-center items-center gap-[4px]'
            style={{ colorHex, color: colorHex }}
        >
            <img src={priority.icon} alt={priority.name} />
            <span className='text-xs font-medium'>{priority.name}</span>
        </div>
    );
};

export default Badge;