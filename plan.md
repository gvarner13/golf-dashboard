# TypeScript Error Plan

- [x] app/components/donutChart.tsx:46:30 — Type `leaderboard` parameter (use minimal player type: `{ id: string; displayName: string; countryFlag?: string; stats: Stat[]; rank?: number }` from ESPN leaderboard/players response).
- [x] app/components/donutChart.tsx:46:43 — Type `statNames` parameter as `string[]`.
- [x] app/components/donutChart.tsx:48:38 — Type `acc` in reduce as `Record<string, number>`.
- [x] app/components/donutChart.tsx:48:43 — Type `player` in reduce as the same minimal player type used in this component.
- [x] app/components/donutChart.tsx:49:27 — Type `stat` as `Stat` with `{ name; displayName; abbreviation; displayValue; value? }` per ESPN leaderboard/players stats.
- [x] app/components/donutChart.tsx:67:29 — Type `playerData` prop (array of minimal ESPN player objects).
- [x] app/components/donutChart.tsx:67:41 — Type `currentEvent` prop as `Event | undefined`.
- [x] app/components/donutChart.tsx:67:55 — Type `postEvent` prop as `Event | undefined`.
- [x] app/components/donutChart.tsx:70:49 — Make `statData` strongly typed so `curr.total` is `number` (avoid `Object.entries` returning `unknown`).

- [x] app/components/ui/tournementSummaryCard.tsx:53:39 — Update `Event.winner` type to match tourschedule API when present: `{ winner?: { competitors?: { displayName?: string } } }`.
- [x] app/components/ui/tournementSummaryCard.tsx:63:31 — Add `Event.defendingChampion?: { displayName?: string }` from tourschedule API.
- [x] app/components/ui/tournementSummaryCard.tsx:70:25 — Add `Event.purse?: { displayValue?: string }` from tourschedule API.

- [ ] app/routes/golf.tsx:26:46 — Type leaderboard competition status as `{ period: number; type: { detail: string; shortDetail?: string; description?: string; state?: string; name?: string; id?: string } }` from ESPN /golf/leaderboard API.

- [ ] app/routes/index.tsx:52:41 — Resolve `Player[]` mismatch by exporting a single shared `Player` type for `getEventPlayers` and `assignRealRanks` based on ESPN leaderboard/players response (`id`, `displayName`, `countryFlag`, `stats`, `rank`).
- [ ] app/routes/index.tsx:97:35 — Extend shared `Player` type with computed `isTied?: boolean`.
- [ ] app/routes/index.tsx:98:44 — Extend shared `Player` type with computed `realRank?: number`.
- [ ] app/routes/index.tsx:99:38 — Same `realRank` type addition.
- [ ] app/routes/index.tsx:105:45 — Ensure shared `Player` type includes `countryFlag?: string` (present in ESPN leaderboard/players response).

- [ ] app/utils/espn.tsx:221:36 — Type `player` in `leaderboard.map` from ESPN leaderboard/players response (minimal fields only).
- [ ] app/utils/espn.tsx:223:31 — Type `stat` in `player.stats.find` as `Stat`.
- [ ] app/utils/espn.tsx:285:5 — Allow `postEvent` to be `Event | undefined` (or provide fallback) in `TourDashboard`.
- [ ] app/utils/espn.tsx:286:5 — Allow `currentEvent` to be `Event | undefined` (or provide fallback) in `TourDashboard`.
- [ ] app/utils/espn.tsx:287:5 — Allow `nextEvent` to be `Event | undefined` (or provide fallback) in `TourDashboard`.
- [ ] app/utils/espn.tsx:288:5 — Allow `players` to default to `[]` when no event is available.

- [ ] app/utils/golf.tsx:27:11 — Add `score` to shared `Player` type (determine numeric vs string; ESPN stats provide `scoreToPar` as `displayValue` and optional `value`).
- [ ] app/utils/golf.tsx:27:23 — Same `score` type fix for comparison.
- [ ] app/utils/golf.tsx:28:16 — Add `order` (or map to ESPN `rank`) to shared `Player` type for tie-break sorting.
- [ ] app/utils/golf.tsx:28:26 — Same `order` type fix for comparison.
- [ ] app/utils/golf.tsx:30:14 — Same `score` type fix for comparison.
- [ ] app/utils/golf.tsx:30:24 — Same `score` type fix for comparison.
- [ ] app/utils/golf.tsx:36:20 — Add computed `realRank?: number` to shared `Player` type.
- [ ] app/utils/golf.tsx:37:20 — Add computed `isTied?: boolean` to shared `Player` type.
- [ ] app/utils/golf.tsx:44:16 — Same `score` type fix for min/max usage.
- [ ] app/utils/golf.tsx:44:37 — Same `score` type fix for min/max usage.
- [ ] app/utils/golf.tsx:46:14 — Same `realRank` type fix.
- [ ] app/utils/golf.tsx:47:14 — Same `isTied` type fix.
- [ ] app/utils/golf.tsx:50:23 — Same `isTied` type fix.
- [ ] app/utils/golf.tsx:51:20 — Same `isTied` type fix.
- [ ] app/utils/golf.tsx:57:14 — Same `realRank` type fix.
- [ ] app/utils/golf.tsx:58:14 — Same `isTied` type fix.
