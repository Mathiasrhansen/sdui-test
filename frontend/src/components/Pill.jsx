// src/components/Pill.jsx
import { cva } from "class-variance-authority";
import { CircleX, ThumbsUp, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils"; // ret stien, hvis din cn ligger et andet sted

const pillVariants = cva(
  "inline-flex font-heading items-center justify-center rounded-full px-4 py-1 text-base font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        regular: "text-white",
        subtle: "",
      },
      color: {
        green: "",
        red: "",
        yellow: "",
        blue: "",
        gray: "",
      },
    },
    compoundVariants: [
      { variant: "regular", color: "green", className: "bg-success-400" },
      { variant: "regular", color: "red", className: "bg-error-400" },
      { variant: "regular", color: "yellow", className: "bg-warning-400" },
      { variant: "regular", color: "blue", className: "bg-sea-400" },
      { variant: "regular", color: "gray", className: "bg-grey-600" },
      {
        variant: "subtle",
        color: "green",
        className: "bg-success-50 text-success-800",
      },
      {
        variant: "subtle",
        color: "red",
        className: "bg-error-50 text-error-800",
      },
      {
        variant: "subtle",
        color: "yellow",
        className: "bg-warning-50 text-warning-800",
      },
      {
        variant: "subtle",
        color: "blue",
        className: "bg-sea-100 text-blue-800",
      },
      {
        variant: "subtle",
        color: "gray",
        className: "bg-grey-400 text-grey-900",
      },
    ],
    defaultVariants: {
      variant: "regular",
      color: "green",
    },
  },
);

export function Pill({ variant, color, className, children, ...props }) {
  return (
    <span
      className={cn(pillVariants({ variant, color }), className)}
      {...props}
    >
      {children}
    </span>
  );
}

const barometerLevels = {
  green: { text: "Grøn", icon: ThumbsUp, className: "bg-success-400" },
  yellow: { text: "Gul", icon: TriangleAlert, className: "bg-warning-400" },
  red: { text: "Rød", icon: CircleX, className: "bg-error-400" },
};

export function BarometerPill({ level, className, ...props }) {
  const { text, icon: Icon, className: levelClass } = barometerLevels[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 rounded-full py-1 pr-4 pl-2 text-base font-medium whitespace-nowrap text-white",
        levelClass,
        className,
      )}
      {...props}
    >
      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span className="flex-1 text-center">{text}</span>
    </span>
  );
}
