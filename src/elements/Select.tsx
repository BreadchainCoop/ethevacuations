import React, { useState } from 'react'
import { useSelect } from 'downshift'
import clsx from "clsx";

interface Option {
  id: string;
  title: string;
  logo: string;
}

interface Props {
  label: string;
  error?: boolean;
  onSelect?(): void;
  options: Option[];
  defaultValue?: number;
}

export default function Select({
  label,
  error,
  onSelect,
  defaultValue,
  options
}: Props) {
  const [selectedItem, setSelectedItem] = React.useState(options[defaultValue || 0])
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    selectedItem,
    items: options,
    itemToString: (item: Option | null) => item ? item.title : '',
    onSelectedItemChange: ({ selectedItem: Option }) => setSelectedItem(selectedItem),
  })

  return (
    <div className="w-full relative">
      <div className="flex flex-col gap-3">
        <label className="text-neutral-400" {...getLabelProps()}>{label}</label>
        <div
          className={`px-2 py-3 bg-input flex border-black/10 border-[2px] border-solid rounded-[20px] justify-between cursor-pointer 
              ${isOpen ? 'border-b-none rounded-b-[0px] outline-none' : ''}
            `}
          {...getToggleButtonProps()}
        >
          <span>
            {selectedItem ? (
              <div className="flex gap-3">
                <img src={selectedItem.logo} className="my-auto w-[33px] h-[33px]" />
                <label className="my-auto leading–[35px]">{selectedItem.title}</label>
              </div>
            ) : defaultValue
            }</span>
          <span className="mr-[25px] rotate-90 text-[18px] font-thin scale-y-200">{isOpen ? <>&#62;</> : <>&#62;</>}</span>
        </div>
      </div>
      <ul
        className={`absolute w-[97.875%] max-h-56 bg-input border-black/10 border-[2px] border-t-none border-solid border-black rounded-b-[20px] shadow-md overflow-scroll m-0 p-0 z-10 ${!isOpen && 'hidden'
          }`}
        {...getMenuProps()}
      >
        {isOpen &&
          options.map((item, index) => {
            if (item === selectedItem) return null

            return (
              <li
                className={clsx(
                  highlightedIndex === index && 'bg-ternary/30',
                  selectedItem === item && 'font-bold',
                  'shadow-sm flex gap-4 border-b-[1px] border-b-black/10 border-b-solid py-3 px-2 last:rounded-b-none last:border-none first:border-t-solid first:border-t-[1px] first:border-t-black/10',
                )}
                key={item.id}
                {...getItemProps({ item, index })}
              >
                <img src={item.logo} className="my-auto w-[33px] h-[33px]" />
                <label className="my-auto leading–[35px]">{item.title}</label>
              </li>
            )
          }
          )}
      </ul>
    </div>
  )
}
