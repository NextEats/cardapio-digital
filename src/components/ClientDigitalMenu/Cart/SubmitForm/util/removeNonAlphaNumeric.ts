export function removeNonAlphaNumeric(str: string) {
  return str.replace(/[^a-zA-Z0-9]/g, '');
}
