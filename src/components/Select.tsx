import { ReactNode } from 'react'

type SelectProps = JSX.IntrinsicElements['select'] & {
  children: ReactNode
  placeholder?: string
}

export const Select = ({
  children,
  placeholder = 'Select From',
  ...rest
}: SelectProps) => {
  return (
    <select
      {...rest}
      className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
      placeholder={placeholder}
    >
      {children}
    </select>
  )
}
