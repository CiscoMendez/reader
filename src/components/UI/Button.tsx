import React from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  icon?: string;
  iconSize?: string | number;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  variant = 'primary',
  icon,
  iconSize,
  className = '',
  ...props
}) => {
  const variants = {
    primary:
      'bg-primary text-secondary hover:bg-[#e65165] shadow-primaryButton active:scale-95',
    secondary:
      'bg-secondary text-primary-t hover:bg-[#efebe9] shadow-secondaryButton active:scale-95',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
  };

  const baseStyles =
    'p-3 rounded-xl flex gap-1 justify-center items-center space-x-2 disabled:opacity-60 disabled:active:scale-100';
  const combinedClasses = clsx(baseStyles, variants[variant], className);

  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}
      className={combinedClasses}
      {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement> &
        React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {icon && <Icon icon={icon} fontSize={iconSize} />}
      {children}
    </Component>
  );
};

export default Button;
