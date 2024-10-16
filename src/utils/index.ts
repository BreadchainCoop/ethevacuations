import { Q96 } from "./constants";

export function truncateAddress(address: string): string {
  return `${address.slice(0, 5)}...${address.slice(address.length - 5)}`;
}

export function formatNumber(n: number | string, d: number) {
  return n.toLocaleString('en', { minimumFractionDigits: d });
}

export function formatV2Rate(rX: BigInt, rY: BigInt, dX: number, dY: number): number {
  return Number(rY / rX) * Number(Math.pow(10, dY === dX ? dX : dY - dX));
}

export function formatV3Rate(sqrtPrice: BigInt): number {
  return Math.pow(Number((BigInt(sqrtPrice) / BigInt(Q96)) ** BigInt(2)), -1);
}
