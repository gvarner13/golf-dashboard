type MatchData = {
  id: string;
  name: string;
  logo: string;
  competitions: [];
};

// export type PlayerData = {
//   id: string;
//   score: string;
//   athlete: object;
//   linescores: [];
// };

export type EventData = {
  id: string;
  label: string;
  status: string;
};

export interface leaderboardEvent {
  id: string;
  name: string;
  competitions: Competitions[];
}

export interface Competitions {
  id: string;
  status: CompetitionStatus;
  competitors: PlayerData[];
}

export interface CompetitionStatus {
  period: number;
  type: CompetitionStatusType;
}

export interface CompetitionStatusType {
  id?: string;
  name?: string;
  state?: string;
  description?: string;
  detail: string;
  shortDetail?: string;
}

export interface Event {
  id: string;
  status: "pre" | "in" | "post";
  fullStatus: {
    type: {
      name: string;
    };
  };
  label: string;
  locations: string[];
  winner?: {
    competitors?: {
      displayName?: string;
    };
  };
  detail: string;
  isMajor: boolean;
  defendingChampion?: {
    displayName?: string;
  };
  purse?: {
    displayValue?: string;
  };
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

export interface PlayerData {
  id: string;
  uid: string;
  movement: number;
  earnings: number;
  sortOrder: number;
  amateur: boolean;
  featured: boolean;
  status: Status;
  score: Score;
  linescores: Linescore[];
  statistics: Statistic[];
  athlete: Athlete;
}

export interface Status {
  displayValue: string;
  period: number;
  teeTime: string;
  hole: number;
  startHole: number;
  thru: number;
  playoff: boolean;
  behindCurrentRound: boolean;
  detail: string;
  type: Type;
  position: Position;
}

export interface Type {
  id: string;
  name: string;
  state: string;
  completed: boolean;
  description: string;
  detail: string;
  shortDetail: string;
}

export interface Position {
  id: string;
  displayName: string;
  isTie: boolean;
}

export interface Score {
  value: number;
  displayValue: string;
}

export interface Linescore {
  value?: number;
  displayValue?: string;
  period: number;
  inScore?: number;
  outScore?: number;
  currentPosition?: number;
  teeTime: string;
  hasStream: boolean;
  isPlayoff: boolean;
  startPosition?: number;
}

export interface Statistic {
  name: string;
  value?: number;
  displayValue: string;
}

export interface Athlete {
  id: string;
  uid: string;
  guid: string;
  displayName: string;
  shortName: string;
  lastName: string;
  amateur: boolean;
  headshot: Headshot;
  flag: Flag;
  birthPlace: BirthPlace;
  links: Link[];
}

export interface Headshot {
  href: string;
}

export interface Flag {
  href: string;
  alt: string;
}

export interface BirthPlace {
  countryAbbreviation: string;
  stateAbbreviation: string;
}

export interface Link {
  language: string;
  rel: string[];
  href: string;
  text: string;
  shortText: string;
  isExternal: boolean;
  isPremium: boolean;
  isHidden: boolean;
}

export async function getLeaderboard(): Promise<leaderboardEvent> {
  const res = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/golf/leaderboard",
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
    "https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard",
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch today's board: ${res.statusText}`);
  }

  const { events } = await res.json();

  return events[0];
}

export async function getEventPlayers(id: string): Promise<[]> {
  const res = await fetch(
    `https://site.web.api.espn.com/apis/site/v2/sports/golf/pga/leaderboard/players?region=us&lang=en&event=${id}`,
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

export async function getTourSchedule(): Promise<Event[]> {
  const res = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/golf/pga/tourschedule?region=us&lang=en",
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch today's board: ${res.statusText}`);
  }

  const { seasons, currentSeason } = (await res.json()) as TourScheduleResponse;

  const foundSeason = seasons.find((season) => season.year === currentSeason);

  if (!foundSeason) {
    throw new Error(`Season with year ${currentSeason} not found.`);
  }
  const { events } = foundSeason;

  return events.filter(
    (event) => event?.fullStatus?.type?.name !== "STATUS_CANCELED",
  );
}

export async function getTourDashboard(): Promise<TourDashboard> {
  const res = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/golf/pga/tourschedule?region=us&lang=en",
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch today's board: ${res.statusText}`);
  }

  const { seasons, currentSeason } = (await res.json()) as TourScheduleResponse;

  const foundSeason = seasons.find((season) => season.year === currentSeason);

  if (!foundSeason) {
    throw new Error(`Season with year ${currentSeason} not found.`);
  }
  const { events } = foundSeason;

  const postEvent = events.findLast((event) => event.status === "post");
  const currentEvent = events.find((event) => event.status === "in");
  const nextEvent = events.find((event) => event.status === "pre");
  let players;

  if (currentEvent) {
    players = await getEventPlayers(currentEvent.id);
  }

  if (!currentEvent && postEvent) {
    players = await getEventPlayers(postEvent.id);
  }

  return {
    postEvent,
    currentEvent,
    nextEvent,
    players,
  };
}
