// Type for properties to pass to generic form button
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

// Type for properties to pass to generic form text input
export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
