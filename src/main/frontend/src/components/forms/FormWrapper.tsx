import React, { ReactNode } from 'react';

interface FormWrapperProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
  isLoading?: boolean;
}

/**
 * Form wrapper component that provides consistent form styling and behavior
 * Handles form submission and loading states
 */
const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  onSubmit,
  className = '',
  isLoading = false,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      onSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-6 ${className}`}
      noValidate
    >
      <fieldset disabled={isLoading} className="space-y-6">
        {children}
      </fieldset>
    </form>
  );
};

export default FormWrapper;