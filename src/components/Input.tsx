import { useState } from 'react'

interface Props {
  title: string;
  inputType: string;
  onChange(e: string): void;
}

function CircularInput({ title, onChange, inputType }: Props) {
  const [input, setInput] = useState(null)

  return (
    <input 
      value={input}
      type={inputType}
      placeholder={title}
      className="flex w-full border-black/10 bg-input font-light font-sans text-center text-4xl px-4 py-6 rounded-[10px]"  
    />
  )
}

export default {
  Circular:  CircularInput
}
