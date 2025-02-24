type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input(props: InputProps) {
  return (
    <input
      className="rounded-md px-3 py-2 order-none focus:ring-0"
      {...props}
    />
  )
}
