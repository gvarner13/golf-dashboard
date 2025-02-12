type matchData = {
  id: string;
  name: string;
  logo: string;
  competitions: [];
};

export type playerData = {
  id: string;
  score: string;
  athlete: object;
  linescores: [];
};

export async function getLeaderboard(): Promise<{}> {
  const res = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/golf/leaderboard"
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch today's board: ${res.statusText}`);
  }

  const { events } = await res.json();

  return events[0];
}

// gets pga golf on thur-sun
export async function getScoreboard(): Promise<matchData> {
  const res = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard"
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch today's board: ${res.statusText}`);
  }

  const { events } = await res.json();

  return events[0];
}

export async function getEventPlayers(): Promise<{}> {
  const res = await fetch(
    "https://site.web.api.espn.com/apis/site/v2/sports/golf/pga/leaderboard/players?region=us&lang=en&event=401703494"
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch today's board: ${res.statusText}`);
  }

  const { leaderboard } = await res.json();

  return leaderboard;
}

export async function getTourSchedule(): Promise<{}> {
  const res = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/golf/pga/tourschedule?region=us&lang=en&season=2025"
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch today's board: ${res.statusText}`);
  }

  const { seasons } = await res.json();

  return seasons[0];
}
