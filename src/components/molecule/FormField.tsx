import React from 'react';
import { Input } from '../atom/Input';
import { Label } from '../atom/Label';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required,
  ...inputProps
}) => {
  return (
    <div className="mb-4">
      <Label required={required} htmlFor={inputProps.id}>
        {label}
      </Label>
      <Input error={error} {...inputProps} />
    </div>
  );
};

