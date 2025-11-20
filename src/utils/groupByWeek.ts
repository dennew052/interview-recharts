import { calcConversionRate } from "./formatters";

interface Entry {
  date: string;
  visits: Record<string, number>;
  conversions: Record<string, number>;
}

export interface AggregatedWeekData {
  date: string;
  [variationId: string]: number | string;
}

export function groupByWeek(rawData: Entry[]): AggregatedWeekData[] {
  const weeks: Record<string, Entry[]> = {};

  rawData.forEach((entry) => {
    const date = new Date(entry.date);
    const week = `${date.getFullYear()}-W${getWeekNumber(date)}`;

    if (!weeks[week]) weeks[week] = [];
    weeks[week].push(entry);
  });

  return Object.keys(weeks).map((weekLabel) => {
    const days = weeks[weekLabel];
    const aggregated: AggregatedWeekData = { date: weekLabel };

    const variationIds = new Set<string>();
    days.forEach((d) => {
      Object.keys(d.visits).forEach((id) => variationIds.add(id));
    });

    variationIds.forEach((id) => {
      let totalVisits = 0;
      let totalConversions = 0;

      days.forEach((d) => {
        totalVisits += d.visits[id] ?? 0;
        totalConversions += d.conversions[id] ?? 0;
      });

      aggregated[id] = calcConversionRate(totalConversions, totalVisits);
    });

    return aggregated;
  });
}

function getWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}
