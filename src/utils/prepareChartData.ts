import { calcConversionRate } from './formatters';

export const prepareChartData = (data: any[]) => {
  return data.map(day => {
    const entry: any = { date: day.date };

    Object.keys(day.visits).forEach(variationId => {
      const visits = day.visits[variationId] || 0;
      const conversions = day.conversions[variationId] || 0;

      entry[variationId] = calcConversionRate(conversions, visits);
    });

    return entry;
  });
};
