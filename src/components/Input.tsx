import type { Dispatch, SetStateAction } from "react";

interface Props {
  value: string | null;
  title: string;
  inputType: string;
  onChange: Dispatch<SetStateAction<string>>;
}

function CircularInput({ title, onChange, inputType, value }: Props) {
  return (
    <input
      type={inputType}
      placeholder={title}
      value={value === null ? '' : value}
      min={inputType === 'number' ? '0' : ''}
      onChange={(e) => onChange(e.target.value)}
      className="flex w-full border-black/10 bg-input font-light font-sans text-center text-4xl px-4 py-6 rounded-[10px] focus:outline-none"
    />
  )
}

export default {
  Circular: CircularInput
}
