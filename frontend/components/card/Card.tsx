import React from "react";
import { CardProps } from "@/types/card";

// Reusable Card component for displaying todos etc.
const Card: React.FC<CardProps> = ({ title, children, onClick, className }) => {
  // Click card if selected and enter key pressed
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  // Base CSS class
  const baseClasses =
    "bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-200 text-gray-800";
  // Final style is base class + cursor pointer + any additional classes
  const combinedClasses =
    `${baseClasses} ${onClick ? "cursor-pointer" : ""} ${className ?? ""}`.trim();

  return (
    <div
      // Add button role if clickable
      role={onClick ? "button" : undefined}
      // Accessibility measures
      aria-label={
        onClick && typeof title === "string" ? (title as string) : undefined
      }
      tabIndex={onClick ? 0 : undefined}
      className={combinedClasses}
      onClick={onClick} // Called when clicked
      onKeyDown={handleKeyDown} // Called when selected and enter pressed
    >
      {/* Show title and children */}
      {title && (
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Card;
