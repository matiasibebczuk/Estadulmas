"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearSession, createSession, isValidPassword, requireAuth } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { PlayerInput } from "@/lib/types";

export async function loginAction(_previousState: string | null, formData: FormData) {
  const password = String(formData.get("password") || "");

  if (!isValidPassword(password)) {
    return "Contraseña incorrecta";
  }

  await createSession();
  redirect("/dashboard");
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}

export async function createMatchAction(formData: FormData) {
  await requireAuth();

  const matchDate = String(formData.get("match_date") || "");
  const rival = String(formData.get("rival") || "").trim();
  const sulmaGoals = Number(formData.get("sulma_goals"));
  const rivalGoals = Number(formData.get("rival_goals"));
  const rawPlayers = String(formData.get("players") || "[]");

  if (!matchDate || !rival || Number.isNaN(sulmaGoals) || Number.isNaN(rivalGoals)) {
    throw new Error("Faltan datos obligatorios del partido.");
  }

  const parsedPlayers = JSON.parse(rawPlayers) as PlayerInput[];
  const players = parsedPlayers
    .map((player) => ({
      player_name: String(player.player_name || "").trim(),
      goals: Number(player.goals || 0),
      assists: Number(player.assists || 0)
    }))
    .filter((player) => player.player_name.length > 0);

  const supabase = getSupabaseAdmin();
  const { data: match, error: matchError } = await supabase
    .from("matches")
    .insert({
      match_date: matchDate,
      rival,
      sulma_goals: sulmaGoals,
      rival_goals: rivalGoals
    })
    .select("id")
    .single();

  if (matchError) throw matchError;

  if (players.length > 0) {
    const { error: playersError } = await supabase.from("match_players").insert(
      players.map((player) => ({
        match_id: match.id,
        ...player
      }))
    );

    if (playersError) throw playersError;
  }

  revalidatePath("/dashboard");
  revalidatePath("/stats");
  redirect(`/matches/${match.id}`);
}
