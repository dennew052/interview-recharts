import { calcConversionRate } from './formatters';

export interface DayEntry {
  date: string;
  visits: Record<string, number>;
  conversions: Record<string, number>;
}

export interface ChartDataEntry {
  date: string;
  [variationId: string]: number | string;
}

export const prepareChartData = (data: DayEntry[]): ChartDataEntry[] => {
  return data.map(day => {
    const entry: ChartDataEntry = { date: day.date };

    Object.keys(day.visits).forEach(variationId => {
      const visits = day.visits[variationId] ?? 0;
      const conversions = day.conversions[variationId] ?? 0;

      entry[variationId] = calcConversionRate(conversions, visits);
    });

    return entry;
  });
};
