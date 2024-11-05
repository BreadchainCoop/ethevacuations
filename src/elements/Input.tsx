import type { Dispatch, SetStateAction } from "react";
import { useRef, useState, useEffect } from "react";

interface Props {
  value: string | null;
  prefix: string;
  title: string;
  inputType: string;
  onChange: Dispatch<SetStateAction<string>>;
}

function CircularInput({ title, onChange, prefix, inputType, value }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [prefixPosition, setPrefixPosition] = useState(0);
  const isMobile = window.innerWidth < 540;

  useEffect(() => {
    if (inputRef.current) {
      // Create a temporary span to measure the text width
      const span = document.createElement('span');
      span.style.visibility = 'hidden';
      span.style.position = 'absolute';
      span.style.fontSize = window.getComputedStyle(inputRef.current).fontSize;
      span.style.fontFamily = window.getComputedStyle(inputRef.current).fontFamily;
      span.innerText = value || '';
      document.body.appendChild(span);

      // Calculate the position
      const textWidth = span.offsetWidth;
      document.body.removeChild(span);

      // Get input's padding and width
      const inputStyles = window.getComputedStyle(inputRef.current);
      const inputPadding = parseFloat(inputStyles.paddingLeft);
      const inputWidth = inputRef.current.offsetWidth;

      // Center both the text and prefix
      const totalContentWidth = textWidth + span.offsetWidth + (!isMobile ? 14 : 45); // 8px gap
      const startPosition = (inputWidth - totalContentWidth) / 2 + (!isMobile ? 0 : 30);
      const position = startPosition + textWidth - (!isMobile ? 14 : 45); // 8px gap between value and prefix
      const referencePosition = inputRef.current.value.length < 7 && prefix?.length <= 4 && isMobile ? position - 40 : position;

      setPrefixPosition(referencePosition);
    }
  }, [value]);

  return (
    <div className="relative w-full text-ellipsis">
      <input
        ref={inputRef}
        type={inputType}
        placeholder={title}
        value={value === null ? '' : value}
        min={inputType === 'number' ? '0' : ''}
        onChange={(e) => onChange(e.target.value)}
        className="flex w-full text-ellipsis border-black/10 bg-white font-light font-sans text-left md:text-center text-4xl md:text-[28px] pl-6 pr-0 md:pl-0 md:pr-6 lg:pr-14 pb-16 pt-7 rounded-[10px] focus:outline-none"
      />
      <span
        className="absolute top-12 translate-y-[-18px] text-gray-500 font-light font-sans text-4xl md:text-[28px] pointer-events-none transition-all duration-200"
        style={{ left: `${prefixPosition}px` }}
      >
        {prefix}
      </span>
    </div>
  );
}


export default {
  Circular: CircularInput
}
