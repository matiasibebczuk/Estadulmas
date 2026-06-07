import Link from "next/link";
import { CalendarDays } from "lucide-react";
import type { Match } from "@/lib/types";
import { formatDate, resultLabel } from "@/lib/format";

export function MatchCard({ match }: { match: Match }) {
  return (
    <Link href={`/matches/${match.id}`} className="panel block p-4 transition hover:border-sulma-oro/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-sulma-oro">Rival</p>
          <h3 className="mt-1 text-lg font-black">{match.rival}</h3>
          <p className="mt-3 flex items-center gap-2 text-sm text-white/60">
            <CalendarDays size={16} />
            {formatDate(match.match_date)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-center">
          <p className="text-2xl font-black">
            {match.sulma_goals}-{match.rival_goals}
          </p>
          <p className="mt-1 text-xs font-bold uppercase text-white/50">{resultLabel(match)}</p>
        </div>
      </div>
    </Link>
  );
}
