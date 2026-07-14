import React from "react";

const Input = React.forwardRef(
    (
        {
            label,
            error,
            id,
            className = "",
            type = "text",
            ...props
        },
        ref
    ) => {
        return (
            <div className="flex flex-col space-y-1.5 w-full">
                {label && (
                    <label
                        htmlFor={id}
                        className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                    >
                        {label}
                    </label>
                )}
                <input
                    id={id}
                    ref={ref}
                    type={type}
                    className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 text-sm outline-none transition-all duration-200 
            ${error
                            ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                            : "border-zinc-200 dark:border-zinc-700 focus:border-sky-400 focus:ring-4 focus:ring-sky-50 dark:focus:ring-zinc-800"
                        } ${className}`}
                    {...props}
                />
                {error && (
                    <p className="text-xs text-red-500 font-medium mt-0.5">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
