export const calcConversionRate = (conversions: number, visits: number): number => {
  return visits ? (conversions / visits) * 100 : 0;
};
