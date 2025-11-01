import React from 'react'

const Input = ({ 
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  required = false,
  name,
  id,
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  containerClassName = '',
  labelClassName = '',
  halfWidth = false,
  ...props 
}) => {
  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-')
  
  const sizeStyles = {
    sm: 'py-2 text-base',
    md: 'py-2 text-lg',
    lg: 'py-4 text-xl',
  }
  const baseStyles = `bg-[#eeeeee] rounded px-4 border placeholder:text-base focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all ${sizeStyles[size] || sizeStyles.md}`
  const widthStyles = halfWidth ? 'w-1/2' : 'w-full'
  const marginStyles = 'mb-6'
  
  return (
    <div className={containerClassName}>
      {label && (
        <label 
          htmlFor={inputId}
          className={`text-lg font-semibold mb-2 block ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`
          ${baseStyles}
          ${widthStyles}
          ${marginStyles}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        {...props}
      />
    </div>
  )
}

export default Input
