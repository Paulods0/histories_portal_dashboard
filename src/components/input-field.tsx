import { Label } from "@radix-ui/react-dropdown-menu"
import React, { Dispatch, SetStateAction } from "react"
import { Input } from "./ui/input"

interface InputFieldProps {
  label: string
  type: string
  value: string | undefined
  onChange: React.Dispatch<React.SetStateAction<any>>
  acceptProp?: string
}

const InputField = ({
  acceptProp,
  label,
  onChange,
  type,
  value,
}: InputFieldProps) => {
  return (
    <div className="w-full flex flex-col">
      <Label className="text-[12px]">{label}</Label>
      <Input
        type={type}
        className="w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        accept={acceptProp}
      />
    </div>
  )
}

export default InputField
