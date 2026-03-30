export function formatYear(y: number): string {
  if (y < 0) return `${Math.abs(y)} BC`;
  return `${y} AD`;
}

export function yearToPercent(year: number, min: number, max: number): number {
  if (max === min) return 50;
  return ((year - min) / (max - min)) * 100;
}
