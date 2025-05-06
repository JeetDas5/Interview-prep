import { cn } from "@/lib/utils";

export const Loader = ({ className, message }: LoadingSpinnerProps) => {
  return (
    <div className="align-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("animate-spin", className)}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
      <span className="text-sm text-gray-500">{message}</span>
    </div>
  );
};
