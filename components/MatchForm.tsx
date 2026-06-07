"use client";

import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { createMatchAction } from "@/app/actions";
import type { PlayerInput } from "@/lib/types";

const emptyPlayer = (): PlayerInput => ({ player_name: "", goals: 0, assists: 0 });

export function MatchForm() {
  const [players, setPlayers] = useState<PlayerInput[]>([emptyPlayer()]);
  const payload = useMemo(() => JSON.stringify(players), [players]);

  function updatePlayer(index: number, field: keyof PlayerInput, value: string) {
    setPlayers((current) =>
      current.map((player, playerIndex) =>
        playerIndex === index
          ? {
              ...player,
              [field]: field === "player_name" ? value : Math.max(0, Number(value || 0))
            }
          : player
      )
    );
  }

  return (
    <form action={createMatchAction} className="space-y-5">
      <div className="panel p-4">
        <h2 className="text-lg font-black">Agregar Partido</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-bold text-white/70">Fecha</span>
            <input className="field" name="match_date" type="date" required />
          </label>
          <label>
            <span className="mb-2 block text-sm font-bold text-white/70">Rival</span>
            <input className="field" name="rival" type="text" placeholder="Nombre del rival" required />
          </label>
          <label>
            <span className="mb-2 block text-sm font-bold text-white/70">Goles Sulma</span>
            <input className="field" name="sulma_goals" type="number" min="0" defaultValue="0" required />
          </label>
          <label>
            <span className="mb-2 block text-sm font-bold text-white/70">Goles Rival</span>
            <input className="field" name="rival_goals" type="number" min="0" defaultValue="0" required />
          </label>
        </div>
      </div>

      <div className="panel p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-black">Jugadores</h2>
          <button
            className="secondary-button"
            type="button"
            onClick={() => setPlayers((current) => [...current, emptyPlayer()])}
          >
            <Plus size={17} />
            Agregar jugador
          </button>
        </div>
        <input name="players" type="hidden" value={payload} />
        <div className="mt-4 space-y-3">
          {players.map((player, index) => (
            <div className="grid grid-cols-[1fr_72px_72px_40px] gap-2" key={index}>
              <input
                className="field px-3"
                placeholder="Jugador"
                value={player.player_name}
                onChange={(event) => updatePlayer(index, "player_name", event.target.value)}
              />
              <input
                className="field px-2 text-center"
                aria-label="Goles"
                type="number"
                min="0"
                value={player.goals}
                onChange={(event) => updatePlayer(index, "goals", event.target.value)}
              />
              <input
                className="field px-2 text-center"
                aria-label="Asistencias"
                type="number"
                min="0"
                value={player.assists}
                onChange={(event) => updatePlayer(index, "assists", event.target.value)}
              />
              <button
                className="secondary-button h-12 px-0"
                type="button"
                aria-label="Eliminar jugador"
                onClick={() => setPlayers((current) => current.filter((_, playerIndex) => playerIndex !== index))}
                disabled={players.length === 1}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button className="primary-button w-full" type="submit">
        Guardar partido
      </button>
    </form>
  );
}
