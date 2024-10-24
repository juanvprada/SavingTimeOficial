import React from 'react';

const ButtonIcon = ({ icon, onClick, title }) => {
    return (
        <button
            onClick={onClick}
            title={title}
            className="text-gray-600 hover:text-gray-900 transition-colors"
        >
            <i className={icon}></i>
        </button>
    );
};

export default ButtonIcon;
