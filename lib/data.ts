import { unstable_noStore as noStore } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { Match, MatchPlayer, MatchWithPlayers, PlayerStats, TeamSummary } from "@/lib/types";

export async function getMatches(): Promise<Match[]> {
  noStore();
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("matches")
    .select("*")
    .order("match_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getMatch(id: string): Promise<MatchWithPlayers | null> {
  noStore();
  const supabase = getSupabaseAdmin();
  const { data: match, error: matchError } = await supabase
    .from("matches")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (matchError) throw matchError;
  if (!match) return null;

  const { data: players, error: playersError } = await supabase
    .from("match_players")
    .select("*")
    .eq("match_id", id)
    .order("goals", { ascending: false })
    .order("assists", { ascending: false })
    .order("player_name", { ascending: true });

  if (playersError) throw playersError;
  return { ...match, players: players ?? [] };
}

export function buildTeamSummary(matches: Match[]): TeamSummary {
  return matches.reduce<TeamSummary>(
    (summary, match) => {
      summary.pj += 1;
      summary.gf += match.sulma_goals;
      summary.gc += match.rival_goals;

      if (match.sulma_goals > match.rival_goals) summary.victorias += 1;
      if (match.sulma_goals === match.rival_goals) summary.empates += 1;
      if (match.sulma_goals < match.rival_goals) summary.derrotas += 1;

      return summary;
    },
    { pj: 0, victorias: 0, empates: 0, derrotas: 0, gf: 0, gc: 0 }
  );
}

export async function getPlayerStats(): Promise<PlayerStats[]> {
  noStore();
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("match_players")
    .select("player_name, goals, assists");

  if (error) throw error;

  const stats = new Map<string, PlayerStats>();

  for (const row of (data ?? []) as Pick<MatchPlayer, "player_name" | "goals" | "assists">[]) {
    const key = row.player_name.trim();
    const current = stats.get(key) ?? { player_name: key, pj: 0, goals: 0, assists: 0 };
    current.pj += 1;
    current.goals += row.goals;
    current.assists += row.assists;
    stats.set(key, current);
  }

  return Array.from(stats.values()).sort((a, b) => {
    if (b.goals !== a.goals) return b.goals - a.goals;
    if (b.assists !== a.assists) return b.assists - a.assists;
    return a.player_name.localeCompare(b.player_name);
  });
}
