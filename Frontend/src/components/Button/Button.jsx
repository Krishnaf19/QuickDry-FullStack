import React from "react";

export default function Button({
    children,
    type = "button",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-6 py-3 rounded-xl font-semibold text-white bg-blue-700/80 shadow-lg shadow-blue-700/20 transition-all duration-300 hover:bg-blue-700/60 hover:scale-102
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}