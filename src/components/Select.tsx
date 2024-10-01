import React, { useState } from 'react'

interface Props {
  title: string;
  type: string;
  error: boolean;
  onClick(): void;
  onSelect(): void;
  options: string[];
  defaultValue: string;
}

export default function Select({ 
  title, 
  type, 
  error,
  onClick, 
  onSelect,
  defaultValue,
  options 
} : Props) {
  const [isCollapsed, setCollapse] = useState(false)
  const [selection, setSelection] = useState(defaultValue)

  const collapse = () => setCollapse(false)
  const expand = () => setCollapse(true)

  const select = (i: number) => {
    setSelection(options[i])
    setCollapse(false)
  }

  return (
    <div className="w-full flex w-min-[100px] grid grid-cols overflow-hidden">
      <label className="absolute block ml-[100px] mt-[5px] text-2xl rotate-90 after:content-['\203A']"></label>
      <input 
        onClick={expand} 
        value={selection}
        className={`bg-input rounded-[10px] w-full flex px-3 py-2 
          ${isCollapsed ? 'rounded-b-[0px]': ''} 
        `}
        placeholder={!!defaultValue ? title : defaultValue}
      />
      {isCollapsed && (
        <div className="bg-input w-full overflow-hidden flex">
          <div className="absolute bg-input w-[123px] h-[135px] rounded-b-[10px]" />
          <ul className="absolute w-min-[100px] w-max-[135px] h-[135px] grid grid-cols gap-2">
            {options.map((e: string, i: number) => {
              if (selection !== options[i]) {
                return (
                  <li 
                    onClick={() => select(i)}
                    className="w-full border-b-solid border-b-[1px] last:border-none text-neutral-400 whitespace-nowrap hover:text-black px-3 py-2"
                  >
                    {e}
                  </li>
                )
              }}
            )}
          </ul>
        </div>
      )} 
    </div>
  ) 
}
