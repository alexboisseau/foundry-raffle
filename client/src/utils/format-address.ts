import { Address } from "viem";

export function formatAddress(address: Address) {
  const charsShown = 6;
  return address.slice(0, charsShown) + "..." + address.slice(-charsShown);
}
