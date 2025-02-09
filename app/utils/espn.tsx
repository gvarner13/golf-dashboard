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
