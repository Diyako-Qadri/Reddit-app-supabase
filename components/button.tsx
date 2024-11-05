import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?:  'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
  children: React.ReactNode;
  type: "submit" | "reset" | "button" | undefined;
};

const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'tertiary', disabled = false, children , type}) => {

  const variantStyles: { [key: string]: string } = {
    primary: 'bg-primary px-4 py-2 text-white leading-3 rounded-[40px] font-medium ',
    secondary: 'bg-zinc-800 w-28 h text-white  rounded-[40px] font-medium',
    tertiary: 'bg-primary w-28 text-white leading-3 rounded-[40px] font-medium '
  };

  const sizeStyles: { [key: string]: string } = {
    primary: 'w-full h-[40px]',
    secondary: 'w-[300px] h-[48px]',
    tertiary: 'md:w-full h-[35px]',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <button
      className={clsx(
        variantStyles[variant],
        sizeStyles[size],
        { [disabledStyles]: disabled }
      )}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;