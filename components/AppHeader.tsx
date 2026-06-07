import Link from "next/link";
import { LogOut, Trophy } from "lucide-react";
import { logoutAction } from "@/app/actions";
import { SulmaLogo } from "@/components/SulmaLogo";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-sulma-black/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/dashboard" className="flex items-center gap-3">
          <SulmaLogo size="sm" />
          <div>
            <p className="text-base font-black leading-none tracking-wide">ESTADULMAS</p>
            <p className="mt-1 text-xs font-semibold text-white/50">Sulma FC</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/stats" className="secondary-button h-10 w-10 px-0" aria-label="Estadisticas">
            <Trophy size={18} />
          </Link>
          <form action={logoutAction}>
            <button className="secondary-button h-10 w-10 px-0" aria-label="Salir" type="submit">
              <LogOut size={18} />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
