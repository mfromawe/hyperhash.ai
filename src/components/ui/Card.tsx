import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ hoverable = true, className = "", ...props }: CardProps) {
  return (
    <div
      className={["card", hoverable ? "card-hover" : "", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={["px-6 pt-6", className].filter(Boolean).join(" ")} {...props} />;
}

export function CardContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={["px-6 pb-6", className].filter(Boolean).join(" ")} {...props} />;
}
