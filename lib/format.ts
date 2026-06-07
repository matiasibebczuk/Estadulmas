import type { Match } from "@/lib/types";

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(`${value}T12:00:00`));
}

export function resultLabel(match: Match) {
  if (match.sulma_goals > match.rival_goals) return "Victoria";
  if (match.sulma_goals < match.rival_goals) return "Derrota";
  return "Empate";
}
