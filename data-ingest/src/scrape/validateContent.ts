const MIN_MEANINGFUL_LENGTH = 200;

export function hasMeaningfulContent(content: string): boolean {
  return content.length >= MIN_MEANINGFUL_LENGTH;
}
