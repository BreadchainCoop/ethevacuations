export function truncateAddress(address: string): string {
  return `${address.slice(0, 5)}...${address.slice(address.length - 5)}`;
}

export function formatNumber(n: number | string, d: number) {
  return n.toLocaleString('en', { minimumFractionDigits: d });
}
