import Link from "next/link";
import { Plus } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { MatchCard } from "@/components/MatchCard";
import { requireAuth } from "@/lib/auth";
import { buildTeamSummary, getMatches } from "@/lib/data";

export default async function DashboardPage() {
  await requireAuth();
  const matches = await getMatches();
  const summary = buildTeamSummary(matches);
  const cards = [
    ["PJ", summary.pj],
    ["Victorias", summary.victorias],
    ["Empates", summary.empates],
    ["Derrotas", summary.derrotas],
    ["GF", summary.gf],
    ["GC", summary.gc]
  ];

  return (
    <>
      <AppHeader />
      <main className="mx-auto min-h-screen max-w-5xl px-4 pb-28 pt-5">
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {cards.map(([label, value]) => (
            <div className="panel p-4" key={label}>
              <p className="text-xs font-black uppercase tracking-wide text-sulma-oro">{label}</p>
              <p className="mt-2 text-3xl font-black">{value}</p>
            </div>
          ))}
        </section>

        <section className="mt-7">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-black">Últimos partidos</h2>
            <Link className="secondary-button" href="/stats">
              Estadísticas
            </Link>
          </div>
          <div className="space-y-3">
            {matches.length > 0 ? (
              matches.map((match) => <MatchCard key={match.id} match={match} />)
            ) : (
              <div className="panel p-6 text-center text-sm font-semibold text-white/60">
                Todavía no hay partidos cargados.
              </div>
            )}
          </div>
        </section>
      </main>
      <Link
        href="/matches/new"
        className="fixed bottom-5 right-5 grid h-16 w-16 place-items-center rounded-full bg-sulma-oro text-black shadow-2xl shadow-sulma-oro/25 transition hover:bg-[#d7aa3f] active:scale-95"
        aria-label="Agregar partido"
      >
        <Plus size={30} strokeWidth={3} />
      </Link>
    </>
  );
}
