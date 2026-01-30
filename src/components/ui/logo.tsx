import { cn } from "@/lib/utils";

export const Logo = ({ className, textClassName, showText = true }: { className?: string, textClassName?: string, showText?: boolean }) => {
  return (
    <div className={cn("flex items-center group cursor-pointer", className)}>
      {showText && (
        <div className={cn("flex flex-col items-start justify-center", textClassName)}>
          <h1 className="text-lg font-bold tracking-tight text-white leading-none font-sans group-hover:text-zinc-200 transition-colors">
            INDIGEN
          </h1>
          <span className="text-[10px] font-medium text-zinc-500 tracking-[0.3em] uppercase group-hover:text-emerald-500/80 transition-colors mt-1">
            SERVICES
          </span>
        </div>
      )}
    </div>
  );
};
