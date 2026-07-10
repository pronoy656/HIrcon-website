import React from "react";
import { cn } from "@/lib/utils";

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "filled" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

export function GoldButton({
  children,
  variant = "filled",
  size = "md",
  href,
  className,
  ...props
}: GoldButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-300 ease-out cursor-pointer whitespace-nowrap select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/60 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

  const sizeStyles = {
    sm: "h-8 px-4 text-xs rounded-md gap-1.5",
    md: "h-10 px-6 text-sm rounded-lg gap-2",
    lg: "h-12 px-8 text-base rounded-xl gap-2.5",
  };

  const variantStyles = {
    filled:
      "bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-600 text-black shadow-[0_0_20px_rgba(234,179,8,0.35)] hover:shadow-[0_0_30px_rgba(234,179,8,0.55)] hover:from-yellow-400 hover:via-amber-300 hover:to-yellow-500 hover:-translate-y-0.5",
    outline:
      "border border-yellow-500/70 text-yellow-400 bg-yellow-500/5 hover:bg-yellow-500/15 hover:border-yellow-400 hover:text-yellow-300 hover:-translate-y-0.5",
  };

  const combinedClassName = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
