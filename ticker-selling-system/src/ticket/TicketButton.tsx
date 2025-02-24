
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline"
}

export function Button({ variant = "default", className = "", ...props }: ButtonProps) {
  const baseClasses =
    "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
  const variantClasses =
    variant === "default"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "border border-blue-600 text-blue-600 hover:bg-blue-50"

  return <button className={`${baseClasses} ${variantClasses} ${className}`} {...props} />
}
