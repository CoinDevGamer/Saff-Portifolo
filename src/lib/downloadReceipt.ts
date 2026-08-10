import { formatAmount, pricing, type Currency, type Quote } from "@/data/pricing";

type ReceiptDetails = {
  currency: Currency;
  shortLines: number;
  longLines: number;
  quote: Quote;
};

export async function downloadReceiptPng({
  currency,
  shortLines,
  longLines,
  quote,
}: ReceiptDetails) {
  const scale = 2;
  const width = 720;
  const height = quote.minimumApplied ? 860 : 810;
  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not supported in this browser.");

  context.scale(scale, scale);
  context.fillStyle = "#bde9d2";
  context.fillRect(0, 0, width, height);

  context.fillStyle = "#29232f";
  context.fillRect(42, 42, width - 72, height - 72);
  context.fillStyle = "#fffdf8";
  context.fillRect(30, 30, width - 72, height - 72);
  context.strokeStyle = "#29232f";
  context.lineWidth = 3;
  context.strokeRect(30, 30, width - 72, height - 72);

  const left = 68;
  const right = width - 80;
  const amount = (value: number) => formatAmount(value, currency);
  const row = (label: string, value: string, y: number) => {
    context.fillStyle = "#29232f";
    context.font = "500 22px Arial, sans-serif";
    context.textAlign = "left";
    context.fillText(label, left, y);
    context.textAlign = "right";
    context.fillText(value, right, y);
  };
  const rule = (y: number, dashed = false) => {
    context.beginPath();
    context.setLineDash(dashed ? [8, 7] : []);
    context.moveTo(left, y);
    context.lineTo(right, y);
    context.stroke();
    context.setLineDash([]);
  };

  context.fillStyle = "#f6a7c9";
  context.fillRect(left, 62, 235, 42);
  context.fillStyle = "#29232f";
  context.font = "800 18px Arial, sans-serif";
  context.textAlign = "left";
  context.fillText("MY CUSTOM RECEIPT", left + 14, 90);

  context.font = "800 38px Arial, sans-serif";
  context.fillText("SAFF VOICE STUDIO", left, 150);
  context.font = "700 16px Arial, sans-serif";
  context.fillStyle = "#6e6673";
  context.fillText("SESSION ESTIMATE", left, 185);
  context.textAlign = "right";
  context.fillText(currency, right, 185);

  context.strokeStyle = "#29232f";
  context.lineWidth = 2;
  rule(205, true);
  row("Short lines", String(shortLines), 250);
  row("Price per short line", amount(pricing.shortLine[currency === "USD" ? "usd" : "robux"]), 292);
  row("Long lines", String(longLines), 348);
  row("Price per long line", amount(pricing.longLine[currency === "USD" ? "usd" : "robux"]), 390);
  rule(420, true);
  row("Line subtotal", amount(quote.subtotal), 462);

  let totalTop = 505;
  if (quote.minimumApplied) {
    row("Minimum fee adjustment", `+${amount(quote.estimate - quote.subtotal)}`, 510);
    totalTop = 550;
  }

  rule(totalTop);
  context.fillStyle = "#6e6673";
  context.font = "700 16px Arial, sans-serif";
  context.textAlign = "left";
  context.fillText("ESTIMATED TOTAL", left, totalTop + 40);
  context.fillStyle = "#29232f";
  context.font = "800 48px Arial, sans-serif";
  context.fillText(amount(quote.estimate), left, totalTop + 96);

  context.fillStyle = "#ffe797";
  context.fillRect(left, totalTop + 128, right - left, 76);
  context.strokeRect(left, totalTop + 128, right - left, 76);
  context.fillStyle = "#29232f";
  context.font = "600 17px Arial, sans-serif";
  context.fillText("This is an estimate, not a final invoice.", left + 18, totalTop + 160);
  context.fillText(
    "Please confirm the project and final price with Saff.",
    left + 18,
    totalTop + 185,
  );

  context.font = "700 16px Arial, sans-serif";
  context.fillText("Discord: saffvcer", left, totalTop + 245);
  context.textAlign = "right";
  context.fillText("saff voice studio", right, totalTop + 245);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) resolve(result);
      else reject(new Error("The receipt image could not be created."));
    }, "image/png");
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "saff-my-custom-receipt.png";
  link.style.display = "none";
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
