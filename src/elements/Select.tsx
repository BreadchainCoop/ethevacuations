import React, { useState, useEffect } from 'react'
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
  options: Option[];
  defaultValue?: number;
  onSelect(e: string | undefined): void;
}

export default function Select({
  label,
  error,
  onSelect,
  defaultValue,
  options
}: Props) {
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    selectItem,
    selectedItem,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: options,
    itemToString: (item: Option | null) => item ? item.title : '',
  })

  useEffect(() => {
    onSelect(selectedItem?.id)
  }, [selectedItem])

  useEffect(() => {
    selectItem(options[defaultValue])
  }, [, defaultValue])

  return (
    <div className="w-full relative">
      <div className="flex flex-col gap-3">
        <label className="text-neutral-400" {...getLabelProps()}>{label}</label>
        <div
          className={`px-2 py-3 bg-white flex border-black/10 border-[2px] border-solid rounded-[20px] justify-between cursor-pointer 
              ${isOpen ? 'border-b-none rounded-b-[0px] outline-none' : ''}
            `}
          {...getToggleButtonProps()}
        >
          <span>
            <div className="flex gap-3">
              <img
                className="my-auto w-[30px] h-[30px]"
                src={`${selectedItem ? selectedItem.logo : options[defaultValue || 0].logo}`}
              />
              <label className="my-auto leading–[30px] text-xl md:text-[16px]">
                {selectedItem ? selectedItem.title : options[defaultValue || 0].title}
              </label>
            </div>
          </span>
          <span className="mr-[25px] rotate-90 text-[18px] font-thin scale-y-200">{isOpen ? <>&#62;</> : <>&#62;</>}</span>
        </div>
      </div>
      <ul
        className={`absolute w-[97.875%] max-h-56 bg-white border-black/10 border-[2px] border-t-none border-solid border-black rounded-b-[20px] shadow-md overflow-scroll m-0 p-0 z-10 ${!isOpen && 'hidden'
          }`}
        {...getMenuProps()}
      >
        {isOpen &&
          options.map((item, index) => {
            if (item === selectedItem) return null

            return (
              <li
                className={clsx(
                  highlightedIndex === index && 'bg-secondary/30',
                  selectedItem === item && 'font-bold',
                  'text-xl md:text-[16px] shadow-sm flex gap-4 border-b-[1px] border-b-black/10 border-b-solid py-3 px-2 last:rounded-b-none last:border-none first:border-t-solid first:border-t-[1px] first:border-t-black/10',
                )}
                key={item.id}
                {...getItemProps({ item, index })}
              >
                <img src={item.logo} className="my-auto w-[30px] h-[30px]" />
                <label className="my-auto leading–[30px]">{item.title}</label>
              </li>
            )
          }
          )}
      </ul>
    </div>
  )
}
