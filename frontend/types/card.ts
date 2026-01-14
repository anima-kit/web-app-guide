// Type for properties to pass to generic card
export interface CardProps {
  title?: string | React.ReactNode;
  children: React.ReactNode;
  actions?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

// Type for properties to pass to generic add card
export interface AddCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
