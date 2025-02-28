interface Stat {
  name: string;
  displayName: string;
  abbreviation: string;
  value: number;
  displayValue: string;
}

interface Player {
  id: string;
  displayName: string;
  stats: Stat[];
}

interface HighestStat {
  id: string;
  displayName: string;
  stat: Stat;
}

export function assignRealRanks(players) {
  // Clone and sort players: lower score is better; if scores tie, use the order field as a tie-breaker.
  const sortedPlayers = [...players].sort((a, b) => {
    if (a.score === b.score) {
      return a.order - b.order;
    }
    return a.score - b.score;
  });

  // Initialize ranking with the first player.
  let currentRank = 1;
  let tieCount = 1;
  sortedPlayers[0].realRank = currentRank;
  sortedPlayers[0].isTied = false; // Initially, there's no tie.

  // Iterate over the sorted players, starting from the second one.
  for (let i = 1; i < sortedPlayers.length; i++) {
    const player = sortedPlayers[i];
    const prevPlayer = sortedPlayers[i - 1];

    if (player.score === prevPlayer.score) {
      // The current player is tied with the previous player.
      player.realRank = currentRank;
      player.isTied = true;

      // Ensure the previous player is flagged as tied as well.
      if (!prevPlayer.isTied) {
        prevPlayer.isTied = true;
      }
      tieCount++;
    } else {
      // For a new score, increase the rank by the number of players in the previous tie group.
      currentRank += tieCount;
      player.realRank = currentRank;
      player.isTied = false;
      tieCount = 1;
    }
  }

  return sortedPlayers;
}

export function getHighestStats(
  players: Player[]
): Record<string, HighestStat> {
  const highestStats: Record<string, HighestStat> = {};

  players.forEach((player) => {
    player.stats.forEach((stat) => {
      if (
        !highestStats[stat.name] ||
        stat.value > highestStats[stat.name].stat.value
      ) {
        highestStats[stat.name] = {
          id: player.id,
          displayName: player.displayName,
          stat: stat,
        };
      }
    });
  });

  return highestStats;
}
