import type { Dispatch, SetStateAction } from "react";
import { useRef, useState, useEffect } from "react";

interface Props {
  value: string | null;
  prefix: string;
  title?: string;
  inputType: string;
  onChange: (value: string) => void;
}

function CircularInput({ title, onChange, prefix, inputType, value }: Props) {
  const isMobile = window.innerWidth < 540;
  const inputRef = useRef<HTMLInputElement>(null);
  const [prefixPosition, setPrefixPosition] = useState(0);
  const [inputPaddingLeft, setInputPaddingLeft] = useState("10px");

  useEffect(() => {
    if (inputRef.current) {
      const span = document.createElement('span');
      span.style.visibility = 'hidden';
      span.style.position = 'absolute';
      span.style.fontSize = window.getComputedStyle(inputRef.current).fontSize;
      span.style.fontFamily = window.getComputedStyle(inputRef.current).fontFamily;
      span.innerText = value || '';
      document.body.appendChild(span);

      const textWidth = span.offsetWidth;
      const prefixSpan = document.createElement('span');
      prefixSpan.style.visibility = 'hidden';
      prefixSpan.style.position = 'absolute';
      prefixSpan.style.fontSize = window.getComputedStyle(inputRef.current).fontSize;
      prefixSpan.style.fontFamily = window.getComputedStyle(inputRef.current).fontFamily;
      prefixSpan.innerText = prefix;
      document.body.appendChild(prefixSpan);

      const prefixWidth = prefixSpan.offsetWidth;
      document.body.removeChild(span);
      document.body.removeChild(prefixSpan);

      const inputWidth = inputRef.current.offsetWidth;
      const totalContentWidth = textWidth + prefixWidth; // 16px gap between text and prefix
      const textStartPosition = (inputWidth - totalContentWidth) / 3;

      // Adjust padding to maintain center alignment
      const newPaddingLeft = `${textStartPosition}px`;
      setInputPaddingLeft(newPaddingLeft);

      // Calculate prefix position relative to centered text
      const newPrefixPosition = textStartPosition + textWidth + 8; // 8px gap
      setPrefixPosition(newPrefixPosition);
    }
  }, [value, prefix]);

  return (
    <div
      style={{ overflowX: 'hidden' }}
      className="relative w-full text-ellipsis text-ellipsis border-solid border-[2px] border-black/10 bg-white rounded-[10px] pr-6">
      <input
        ref={inputRef}
        type={inputType}
        placeholder={title}
        value={value === null ? '' : value}
        min={inputType === 'number' ? '0' : ''}
        onChange={(e) => onChange(e.target.value)}
        style={{ paddingLeft: inputPaddingLeft }}
        className="flex w-full border-none bg-white font-light font-sans text-left text-4xl md:text-[28px] pb-16 pt-7 rounded-[10px] focus:outline-none"
      />
      <span
        className="absolute top-12 translate-y-[-18px] text-gray-500 font-light font-sans text-4xl md:text-[28px] pointer-events-none transition-all duration-200"
        style={{ left: `${prefixPosition}px` }}
      >
        {prefix}
      </span>
    </div >
  );
}

export default {
  Circular: CircularInput
}


