import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { requireAuth } from "@/lib/auth";
import { getMatch } from "@/lib/data";
import { formatDate, resultLabel } from "@/lib/format";

export default async function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAuth();
  const { id } = await params;
  const match = await getMatch(id);

  if (!match) notFound();

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl px-4 pb-12 pt-5">
        <Link href="/dashboard" className="secondary-button mb-5">
          <ArrowLeft size={17} />
          Volver
        </Link>

        <section className="panel p-5">
          <p className="text-xs font-black uppercase tracking-wide text-sulma-oro">Vista Partido</p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-black">{match.rival}</h1>
              <p className="mt-2 text-sm font-semibold text-white/60">{formatDate(match.match_date)}</p>
            </div>
            <div className="w-fit rounded-2xl border border-white/10 bg-black/30 px-5 py-3">
              <p className="text-3xl font-black">
                {match.sulma_goals}-{match.rival_goals}
              </p>
              <p className="text-xs font-bold uppercase text-white/50">{resultLabel(match)}</p>
            </div>
          </div>
        </section>

        <section className="panel mt-5 overflow-hidden">
          <div className="grid grid-cols-[1fr_80px_100px] border-b border-white/10 px-4 py-3 text-xs font-black uppercase tracking-wide text-sulma-oro">
            <span>Jugador</span>
            <span className="text-center">Goles</span>
            <span className="text-center">Asistencias</span>
          </div>
          {match.players.length > 0 ? (
            match.players.map((player) => (
              <div className="grid grid-cols-[1fr_80px_100px] border-b border-white/10 px-4 py-3 last:border-b-0" key={player.id}>
                <span className="font-bold">{player.player_name}</span>
                <span className="text-center font-black">{player.goals}</span>
                <span className="text-center font-black">{player.assists}</span>
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-sm font-semibold text-white/60">
              No se cargaron jugadores para este partido.
            </div>
          )}
        </section>
      </main>
    </>
  );
}
