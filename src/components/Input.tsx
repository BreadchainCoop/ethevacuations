interface Props {
  value: string;
  title: string;
  inputType: string;
  onChange(e: string): void;
}

function CircularInput({ title, onChange, inputType, value }: Props) {
  return (
    <input
      value={value}
      type={inputType}
      placeholder={title}
      min={inputType === 'number' ? '0' : null}
      onChange={(e) => onChange(e.target.value)}
      className="flex w-full border-black/10 bg-input font-light font-sans text-center text-4xl px-4 py-6 rounded-[10px] focus:outline-none"  
    />
  )
}

export default {
  Circular:  CircularInput
}
