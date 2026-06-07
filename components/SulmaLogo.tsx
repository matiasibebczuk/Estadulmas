export function SulmaLogo({ size = "lg" }: { size?: "sm" | "lg" }) {
  const box = size === "lg" ? "h-28 w-28" : "h-12 w-12";
  const text = size === "lg" ? "text-3xl" : "text-sm";

  return (
    <div
      className={`${box} relative grid place-items-center rounded-full border-4 border-sulma-oro bg-gradient-to-br from-sulma-bordo via-black to-sulma-verde shadow-2xl shadow-sulma-bordo/30`}
      aria-label="Sulma FC"
    >
      <div className="absolute inset-2 rounded-full border border-sulma-oro/30" />
      <div className="text-center leading-none">
        <div className={`${text} font-black tracking-wide text-sulma-blanco`}>SFC</div>
        <div className="mt-1 text-[10px] font-black tracking-[0.28em] text-sulma-oro">1908</div>
      </div>
    </div>
  );
}
