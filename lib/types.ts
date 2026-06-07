export type Match = {
  id: string;
  match_date: string;
  rival: string;
  sulma_goals: number;
  rival_goals: number;
  created_at: string;
};

export type MatchPlayer = {
  id: string;
  match_id: string;
  player_name: string;
  goals: number;
  assists: number;
  created_at: string;
};

export type PlayerInput = {
  player_name: string;
  goals: number;
  assists: number;
};

export type MatchWithPlayers = Match & {
  players: MatchPlayer[];
};

export type TeamSummary = {
  pj: number;
  victorias: number;
  empates: number;
  derrotas: number;
  gf: number;
  gc: number;
};

export type PlayerStats = {
  player_name: string;
  pj: number;
  goals: number;
  assists: number;
};
