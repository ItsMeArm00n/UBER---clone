import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button', 
  fullWidth = false,
  size = 'large',
  disabled = false,
  onClick,
  className = '',
  ...props 
}) => {
  const baseStyles = 'font-semibold rounded px-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variantStyles = {
    primary: 'bg-[#111] text-white hover:bg-[#333] focus:ring-gray-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    success: 'bg-[#10b461] text-white hover:bg-[#0d9651] focus:ring-green-500',
    warning: 'bg-[#f3c164] text-white hover:bg-[#f0b84f] focus:ring-yellow-500',
  }
  
  const sizeStyles = {
    small: 'py-1.5 text-sm',
    medium: 'py-2 text-base',
    large: 'py-2 text-lg',
  }
  
  const widthStyles = fullWidth ? 'w-full' : ''
  
  const disabledStyles = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer'

  const marginStyles = 'mb-4'
  
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${widthStyles}
        ${disabledStyles}
        ${marginStyles}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
