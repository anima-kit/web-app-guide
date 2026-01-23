// Type for properties to pass to generic card
export interface CardProps {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// Type for properties to pass to generic add card
export interface AddCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
