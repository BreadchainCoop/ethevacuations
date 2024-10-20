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
      className="flex w-full text-ellipsis border-black/10 bg-white font-light font-sans text-center text-4xl md:text-[28px] px-4 pb-16 pt-7 rounded-[10px] focus:outline-none"

    />
  )
}

export default {
  Circular: CircularInput
}
