import React from 'react'

interface TextField {
    value: string,
    placeholder?: string,
    onChange: any,
    password?: boolean
}

const TextField = ({ value, placeholder, onChange, password }: TextField) => {
    return (
        <input
            value={value ? value : ''}
            placeholder={placeholder}
            onChange={onChange}
            type={password ? 'password' : 'text'}
            className="w-full p-3 bg-gray-100 rounded-md text-sm focus:outline-none mb-2"
        />
        
    )
}

export { TextField }
