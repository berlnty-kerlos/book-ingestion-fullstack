const BOILERPLATE_PATTERNS = [
  /copyright\s*©?\s*\d{4}[-–]?\d{0,4}.*$/im,
  /all rights reserved/i,
  /wildfire fellowship,?\s*inc\.?/i
];

export function normalizeChapterContent(raw: string): string {
  let normalized = raw;

  for (const pattern of BOILERPLATE_PATTERNS) {
    normalized = normalized.replace(pattern, "");
  }

  return normalized.trim();
}
