import { Q96, ZERO_ADDRESS } from "./constants";

export function formatAddress(address: string): `0x${string}` {
  const value = !address ? ZERO_ADDRESS : address;

  return `0x${value.substring(2, value.length)}`;
}

export function truncateAddress(address: string): string {
  return `${address.slice(0, 5)}...${address.slice(address.length - 5)} `;
}

export function formatNumber(n: number | string, d: number): string {
  if (typeof n === 'string') {
    return Number(n).toLocaleString('en', { minimumFractionDigits: d });
  } else {
    return n.toFixed(d).toString();
  }

}

export function formatV2Rate(rX: bigint, rY: bigint, dX: number, dY: number): number {
  if (dY === dX) {
    return (Number(BigInt(rY)) / Math.pow(10, dY)) / (Number(BigInt(rX)) / Math.pow(10, dX));
  } else {
    return Number(BigInt(rY) / BigInt(rX)) * Number(Math.pow(10, dY - dX));
  }
}

export function formatV3Rate(tick: bigint, dX: number, dY: number): number {
  let d = dY - dX === 0 ? Math.abs(dY - dX) : dY - dX;

  if ((dX === 8 || dY === 8)) d = 10;

  return (1.0001 ** Number(tick) / (10 ** d));
} 
