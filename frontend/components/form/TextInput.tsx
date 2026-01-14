import React from "react";
import { TextInputProps } from "@/types/form";

// Base class for text input
const defaultClass =
  "w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800";

// Reusable text input for forms
const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, ...rest }, ref) => (
    <input
      {...rest}
      ref={ref as React.Ref<HTMLInputElement>}
      className={`${defaultClass} ${className ?? ""}`}
    />
  ),
);
TextInput.displayName = "TextInput";

export default TextInput;
