export function getBaseDomain(url: string): string {
  const hostname = new URL(url).hostname;
  const parts = hostname.split(".");

  return parts.length > 2 ? parts.slice(-2).join(".") : hostname;
}
