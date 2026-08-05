import { useEffect, useState } from "react";
import {
  calculateQuote,
  formatAmount,
  included,
  payment,
  pricing,
  type Currency,
} from "@/data/pricing";
import { LineCounter } from "./LineCounter";
import { Section } from "./Section";

export function Calculator() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [shortLines, setShortLines] = useState(0);
  const [longLines, setLongLines] = useState(0);
  const [pulse, setPulse] = useState(0);

  const quote = calculateQuote(shortLines, longLines, currency);

  useEffect(() => {
    setPulse((n) => n + 1);
  }, [quote.estimate, currency]);

  const isUSD = currency === "USD";

  return (
    <Section id="pricing" background="var(--mint)">
      <div id="quote" className="scroll-mt-24">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label-strip">Mixing desk</p>
            <h2 className="font-display mt-2 text-4xl leading-[0.95] font-extrabold sm:text-5xl">
              Build your quote
            </h2>
            <p className="mt-3 max-w-[46ch] text-lg">
              Add the lines you need for a quick project estimate.
            </p>
          </div>

          <div className="lg:col-span-5 lg:justify-self-end">
            <span className="label-strip mb-2 block">Payment currency</span>
            <div
              className="outline-ink relative grid w-[15rem] grid-cols-2 bg-white p-1"
              role="group"
              aria-label="Payment currency"
            >
              <span
                className="outline-ink absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)]"
                aria-hidden="true"
                style={{
                  background: isUSD ? "var(--butter)" : "var(--bubblegum)",
                  transform: isUSD ? "translateX(0)" : "translateX(100%)",
                  transition: "transform 240ms var(--ease-studio), background-color 240ms var(--ease-studio)",
                }}
              />
              {(["USD", "Robux"] as Currency[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  aria-pressed={currency === c}
                  className="label-strip relative z-10 min-h-11"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Controls */}
          <div className="grid content-start gap-4 lg:col-span-7">
            <LineCounter
              id="short-lines"
              label="Short lines"
              hint="Around 10 words or fewer"
              priceLabel={
                isUSD
                  ? `$${pricing.shortLine.usd} per line`
                  : `${pricing.shortLine.robux.toLocaleString("en-US")} Robux per line`
              }
              value={shortLines}
              onChange={setShortLines}
              accent="var(--sky)"
            />
            <LineCounter
              id="long-lines"
              label="Long lines"
              hint="More than 10 words"
              priceLabel={
                isUSD
                  ? `$${pricing.longLine.usd} per line`
                  : `${pricing.longLine.robux.toLocaleString("en-US")} Robux per line`
              }
              value={longLines}
              onChange={setLongLines}
              accent="var(--bubblegum)"
            />

            <div className="outline-ink bg-butter p-4" style={{ background: "var(--butter)" }}>
              <h3 className="label-strip">What&rsquo;s included</h3>
              <ul className="mt-2 grid gap-1">
                {included.map((item) => (
                  <li key={item} className="font-display text-lg font-bold">
                    <span aria-hidden="true" className="mr-2">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Receipt */}
          <div className="lg:col-span-5">
            <div
              className="outline-ink bg-white p-5 sm:p-6"
              style={{ boxShadow: "8px 8px 0 var(--ink)" }}
            >
              <div className="flex items-baseline justify-between border-b-2 border-dashed border-ink pb-3">
                <h3 className="label-strip">Session estimate</h3>
                <span className="label-strip text-ink/60">{currency}</span>
              </div>

              <dl className="mt-4 grid gap-2 text-base">
                <div className="flex justify-between gap-4">
                  <dt>Short lines</dt>
                  <dd className="tabular-nums">{shortLines}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Long lines</dt>
                  <dd className="tabular-nums">{longLines}</dd>
                </div>
                <div className="flex justify-between gap-4 border-t-2 border-dashed border-ink pt-2">
                  <dt>Line subtotal</dt>
                  <dd className="tabular-nums">{formatAmount(quote.subtotal, currency)}</dd>
                </div>
                {quote.minimumApplied ? (
                  <div className="flex justify-between gap-4">
                    <dt>Minimum fee adjustment</dt>
                    <dd className="tabular-nums">
                      +{formatAmount(quote.estimate - quote.subtotal, currency)}
                    </dd>
                  </div>
                ) : null}
              </dl>

              <div className="mt-4 border-t-2 border-ink pt-4">
                <p className="label-strip text-ink/60">Estimated total</p>
                <p
                  key={pulse}
                  aria-live="polite"
                  className="font-display text-4xl leading-none font-extrabold tabular-nums sm:text-5xl"
                  style={{ animation: "total-in 220ms cubic-bezier(0.22,1,0.36,1)" }}
                >
                  {formatAmount(quote.estimate, currency)}
                </p>
                {quote.minimumApplied ? (
                  <p className="label-strip mt-2 inline-block border-2 border-ink px-2 py-1" style={{ background: "var(--periwinkle)" }}>
                    The minimum project fee has been applied.
                  </p>
                ) : null}
                <p className="mt-3 text-sm text-ink/75">
                  This is an estimate, not a final invoice. Pricing is negotiable depending on the
                  project.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShortLines(0);
                    setLongLines(0);
                  }}
                  className="studio-control label-strip mt-4 min-h-11 bg-paper px-4"
                >
                  Reset
                </button>
              </div>

              {/* Payment details */}
              <div className="mt-6 border-t-2 border-ink pt-4">
                <h3 className="label-strip">Payment details</h3>
                <ul className="mt-3 grid gap-2">
                  <li
                    className="outline-ink grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3"
                    style={{ background: "var(--sky)" }}
                  >
                    <div className="min-w-0">
                      <p className="label-strip">{payment.paypal.label}</p>
                      <p className="font-display truncate text-lg font-bold">
                        {payment.paypal.display}
                      </p>
                    </div>
                    <a
                      href={payment.paypal.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="studio-control label-strip inline-flex min-h-11 items-center bg-white px-3"
                    >
                      Open
                    </a>
                  </li>
                  <li
                    className="outline-ink grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-3"
                    style={{ background: "var(--bubblegum)" }}
                  >
                    <div className="min-w-0">
                      <p className="label-strip">{payment.roblox.label}</p>
                      <p className="font-display truncate text-lg font-bold">
                        {payment.roblox.display}
                      </p>
                    </div>
                    <a
                      href={payment.roblox.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="studio-control label-strip inline-flex min-h-11 items-center bg-white px-3"
                    >
                      Open
                    </a>
                  </li>
                </ul>
                <p className="mt-3 text-sm text-ink/75">
                  Gift cards may be accepted according to their USD value, rounded up to an
                  available gift-card amount.
                </p>
                <p className="mt-2 text-sm font-semibold">
                  Please confirm the project and final price with Saff before sending payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
