import React from "react";
import Card from "@/components/card/Card";
import { AddCardProps } from "@/types/card";

// Reusable AddCard component for adding todos, etc.
const AddCard: React.FC<AddCardProps> = ({ children, onClick, className }) => {
  return (
    <Card
      // Make it clickable
      onClick={onClick}
      className={className}
    >
      {children}
    </Card>
  );
};

export default AddCard;
