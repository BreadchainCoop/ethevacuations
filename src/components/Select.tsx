import React, { useState } from 'react'

interface Props {
  title: string;
  type: string;
  error: boolean;
  onClick(): void;
  onSelect(): void;
  options: string[];
}

export default function Select({ 
  title, 
  type, 
  error,
  onClick, 
  onSelect,
  options 
} : Props) {
  const [isCollapsed, setCollapse] = useState(false)
  const [selection, setSelection] = useState(null)

  const collapse = () => setCollapse(false)
  const expand = () => setCollapse(true)

  const select = (i: number) => {
    setSelection(options[i])
    setCollapse(false)
  }

  return (
    <div className="w-full grid grid-cols">
      <input placeholder={selection ? selection : title} onClick={expand} />
      <label className="absolute">{selection}</label>
      {isCollapsed && (
        <div className="w-full flex bg-white h-[200px]">
          <ul className="flex absolute grid grid-cols gap-2">
            {options.map((e: string, i: number) => {
              return (
                <li 
                  onClick={() => select(i)}
                  className="border-[1px] border-solid hover:bg-black"
                >
                  {e}
                </li>
              )}
            )}
          </ul>
        </div>
      )} 
    </div>
  ) 
}
