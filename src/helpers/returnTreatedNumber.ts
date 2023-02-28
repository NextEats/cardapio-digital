export function returnTreatedNumber(value: string): string {
  return value.replace(/\D/g, "").replace(/\s/g, "");
}
