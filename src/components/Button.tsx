function PrimaryButton(
  { children }: { children: React.ReactNode; }
) {
  return (
    <button className="w-full flex text-center shadow-lg shadow-ternary/20 justify-center items-center bg-[#ffd0d0] text-lg px-6 py-3 rounded-[30px]">
      {children}
    </button>
  )
}

export default {
  Primary: PrimaryButton
}



