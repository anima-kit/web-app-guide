import React from "react";
import { ButtonProps } from "@/types/form";

const variants = {
  // Primary class for save button
  primary:
    "px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors",
  // Secondary class for cancel button
  secondary:
    "px-4 py-2 bg-gray-500 rounded hover:bg-gray-300 transition-colors text-gray-800",
};

// Reusable button component for forms
const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  ...rest
}) => (
  <button {...rest} className={`${variants[variant]} ${className ?? ""}`} />
);

export default Button;
