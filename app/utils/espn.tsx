type MatchData = {
  id: string;
  name: string;
  logo: string;
  competitions: [];
};

export type PlayerData = {
  id: string;
  score: string;
  athlete: object;
  linescores: [];
};

export type EventData = {
  id: string;
  label: string;
  status: string;
};

export interface Event {
  id: string;
  status: "pre" | "in" | "post";
  label: string;
  locations: string[];
  winner: object;
  detail: string;
  isMajor: boolean;
}

interface Season {
  year: string;
  events: Event[];
}

interface TourScheduleResponse {
  seasons: Season[];
  currentSeason: string;
}

interface Player {
  id: string;
  displayName: string;
  countryFlag: string;
  rank: number;
}

// Define the return type for this function:
interface TourDashboard {
  postEvent: Event;
  currentEvent: Event;
  nextEvent: Event;
  players: Player[];
}

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
export async function getScoreboard(): Promise<MatchData> {
  const res = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard"
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch today's board: ${res.statusText}`);
  }

  const { events } = await res.json();

  return events[0];
}

export async function getEventPlayers(id: string): Promise<[]> {
  const res = await fetch(
    `https://site.web.api.espn.com/apis/site/v2/sports/golf/pga/leaderboard/players?region=us&lang=en&event=${id}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch today's board: ${res.statusText}`);
  }

  const { leaderboard } = await res.json();

  const players = leaderboard.map((player) => ({
    ...player,
    score: player.stats.find((stat) => stat.name === "scoreToPar")
      ?.displayValue,
  }));

  return players;
}

export async function getTourSchedule(): Promise<[]> {
  const res = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/golf/pga/tourschedule?region=us&lang=en&season=2025"
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch today's board: ${res.statusText}`);
  }

  const { seasons, currentSeason, name } = await res.json();

  const { events } = seasons.find((season) => season.year === currentSeason);

  return events;
}

export async function getTourDashboard(): Promise<TourDashboard> {
  const res = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/golf/pga/tourschedule?region=us&lang=en&season=2025"
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch today's board: ${res.statusText}`);
  }

  const { seasons, currentSeason } = (await res.json()) as TourScheduleResponse;

  const { events } = seasons.find((season) => season.year === currentSeason);

  if (!events) {
    throw new Error(`No Events found for: ${currentSeason}`);
  }

  const postEvent = events.findLast((event) => event.status === "post");
  const currentEvent = events.find((event) => event.status === "in");
  const nextEvent = events.find((event) => event.status === "pre");
  let players;

  if (currentEvent) {
    players = await getEventPlayers(currentEvent.id);
  } else {
    players = await getEventPlayers(postEvent.id);
  }

  return {
    postEvent,
    currentEvent,
    nextEvent,
    players,
  };
}
