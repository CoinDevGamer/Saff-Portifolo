/**
 * PRICING
 * -------
 * Every price on the site comes from this file. Change values here only.
 */

export const pricing = {
  shortLine: { usd: 4, robux: 800 },
  longLine: { usd: 6, robux: 1000 },
  minimum: { usd: 10, robux: 3000 },
} as const;

export type Currency = "USD" | "Robux";

export type Quote = {
  totalLines: number;
  subtotal: number;
  estimate: number;
  minimumApplied: boolean;
};

export function calculateQuote(
  shortLines: number,
  longLines: number,
  currency: Currency,
): Quote {
  const totalLines = shortLines + longLines;

  const usdSubtotal =
    shortLines * pricing.shortLine.usd + longLines * pricing.longLine.usd;
  const usdEstimate = totalLines === 0 ? 0 : Math.max(pricing.minimum.usd, usdSubtotal);

  const robuxSubtotal =
    shortLines * pricing.shortLine.robux + longLines * pricing.longLine.robux;
  const robuxEstimate =
    totalLines === 0 ? 0 : Math.max(pricing.minimum.robux, robuxSubtotal);

  const subtotal = currency === "USD" ? usdSubtotal : robuxSubtotal;
  const estimate = currency === "USD" ? usdEstimate : robuxEstimate;

  return {
    totalLines,
    subtotal,
    estimate,
    minimumApplied: totalLines > 0 && estimate > subtotal,
  };
}

export function formatAmount(value: number, currency: Currency): string {
  return currency === "USD"
    ? `$${value.toLocaleString("en-US")}`
    : `${value.toLocaleString("en-US")} Robux`;
}

export const included = ["Up to 3 takes per line", "Basic clean-up and editing"];

export const payment = {
  paypal: { label: "PayPal", display: "paypal.me/s4ffvcer", href: "https://paypal.me/s4ffvcer" },
  roblox: {
    label: "Roblox",
    display: "@objectorator",
    href: "https://www.roblox.com/users/2429226044/profile",
  },
} as const;
