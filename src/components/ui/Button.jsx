import React from "react";

const Button = React.forwardRef(
    (
        {
            children,
            variant = "primary", // primary | secondary | outline | ghost | danger
            size = "md", // sm | md | lg
            isLoading = false,
            leftIcon,
            rightIcon,
            className = "",
            disabled,
            ...props
        },
        ref
    ) => {
        const baseStyles =
            "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";

        const variants = {
            primary:
                "bg-zinc-900 border border-transparent text-white hover:bg-zinc-800 focus:ring-zinc-950 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200",
            secondary:
                "bg-zinc-100 border border-transparent text-zinc-900 hover:bg-zinc-200 focus:ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
            outline:
                "bg-transparent border border-zinc-300 text-zinc-700 hover:bg-zinc-50 focus:ring-zinc-300 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800",
            ghost:
                "bg-transparent border border-transparent text-zinc-700 hover:bg-zinc-100 focus:ring-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
            danger:
                "bg-red-600 border border-transparent text-white hover:bg-red-700 focus:ring-red-500",
        };

        const sizes = {
            sm: "px-3 py-1.5 text-xs h-8",
            md: "px-4.5 py-2 text-sm h-10",
            lg: "px-6 py-3 text-base h-12",
        };

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                {...props}
            >
                {isLoading && (
                    <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {!isLoading && leftIcon && <span className="mr-1.5 flex shrink-0">{leftIcon}</span>}
                <span>{children}</span>
                {!isLoading && rightIcon && <span className="ml-1.5 flex shrink-0">{rightIcon}</span>}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;
