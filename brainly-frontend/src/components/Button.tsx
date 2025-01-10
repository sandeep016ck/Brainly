import { ReactElement } from "react";

interface ButtonProps {
    variant: 'primary' | 'secondary',
    text:string,
    startIcon?:ReactElement,
    endIcon?:ReactElement,
    fullWidth?:boolean,
    loading?:boolean,
    onClick?: () => void
}

const variantStyles = {
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-200 text-purple-600"
}

const defaultStyles = "px-4 py-2 rounded-md flex items-center gap-1";

export function Button({variant,text,startIcon,endIcon,fullWidth,loading,onClick}:ButtonProps){
    return <button onClick={onClick}  className={`${variantStyles[variant]} ${defaultStyles} ${fullWidth ? 'w-full flex justify-center' : ""} ${loading ? "opacity-50" : ""} `} disabled={loading}>
        {startIcon && <div className="pr-2">
            {startIcon}
        </div>}
            {text}
        {endIcon && <div className="pr-2">
            {endIcon}
        </div>}
    </button>
}