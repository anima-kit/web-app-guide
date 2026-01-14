import { useState, FormEvent } from "react";

// Reusable hook for forms
export function useForm<T extends Record<string, unknown>>(
  // Generic initial values
  initialValues: T,
  // Runs when form submitted
  onSubmit: (values: T) => Promise<void>,
): {
  values: T;
  setField: <K extends keyof T>(key: K, value: T[K]) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
} {
  // Create state to store values
  const [values, setValues] = useState<T>(initialValues);
  // Update field value
  const setField = <K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };
  // Handle form submission by overriding default and submitting new values
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    await onSubmit(values);
  };

  return { values, setField, handleSubmit };
}
