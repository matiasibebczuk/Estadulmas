import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { requireAuth } from "@/lib/auth";
import { getPlayerStats } from "@/lib/data";

export default async function StatsPage() {
  await requireAuth();
  const stats = await getPlayerStats();
  const scorers = [...stats].sort((a, b) => b.goals - a.goals || a.player_name.localeCompare(b.player_name)).slice(0, 5);
  const assisters = [...stats].sort((a, b) => b.assists - a.assists || a.player_name.localeCompare(b.player_name)).slice(0, 5);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 pb-12 pt-5">
        <Link href="/dashboard" className="secondary-button mb-5">
          <ArrowLeft size={17} />
          Volver
        </Link>

        <h1 className="text-3xl font-black">Estadísticas Generales</h1>

        <section className="mt-5 grid gap-4 md:grid-cols-2">
          <Ranking title="Ranking Goleadores" rows={scorers} field="goals" />
          <Ranking title="Ranking Asistidores" rows={assisters} field="assists" />
        </section>

        <section className="panel mt-5 overflow-hidden">
          <div className="grid grid-cols-[1fr_58px_74px_100px] border-b border-white/10 px-4 py-3 text-xs font-black uppercase tracking-wide text-sulma-oro">
            <span>Jugador</span>
            <span className="text-center">PJ</span>
            <span className="text-center">Goles</span>
            <span className="text-center">Asistencias</span>
          </div>
          {stats.length > 0 ? (
            stats.map((player) => (
              <div className="grid grid-cols-[1fr_58px_74px_100px] border-b border-white/10 px-4 py-3 last:border-b-0" key={player.player_name}>
                <span className="font-bold">{player.player_name}</span>
                <span className="text-center font-black">{player.pj}</span>
                <span className="text-center font-black">{player.goals}</span>
                <span className="text-center font-black">{player.assists}</span>
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-sm font-semibold text-white/60">
              No hay estadísticas disponibles.
            </div>
          )}
        </section>
      </main>
    </>
  );
}

function Ranking({
  title,
  rows,
  field
}: {
  title: string;
  rows: { player_name: string; goals: number; assists: number }[];
  field: "goals" | "assists";
}) {
  return (
    <div className="panel p-4">
      <h2 className="text-lg font-black">{title}</h2>
      <div className="mt-4 space-y-3">
        {rows.length > 0 ? (
          rows.map((player, index) => (
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/25 px-3 py-3" key={player.player_name}>
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sulma-bordo text-sm font-black">
                  {index + 1}
                </span>
                <span className="truncate font-bold">{player.player_name}</span>
              </div>
              <span className="text-xl font-black text-sulma-oro">{player[field]}</span>
            </div>
          ))
        ) : (
          <p className="text-sm font-semibold text-white/60">Sin datos.</p>
        )}
      </div>
    </div>
  );
}
