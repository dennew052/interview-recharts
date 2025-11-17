export const calcConversionRate = (conversions: number, visits: number) =>
    visits ? (conversions / visits) * 100 : 0;
