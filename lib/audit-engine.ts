import { pricingData } from "./pricing";

export interface AuditInput {
  tool: string;
  plan: string;
  seats: number;
  monthlySpend: number;
}

export interface AuditResult {
  currentSpend: number;
  recommendedSpend: number;
  monthlySavings: number;
  annualSavings: number;
  recommendation: string;
  reason: string;
}

export function generateAudit(
  input: AuditInput
): AuditResult {
  let recommendedSpend = input.monthlySpend;
  let recommendation = "Current setup looks optimized";
  let reason =
    "Your current tooling appears reasonably aligned with your spend.";

  // ChatGPT Team Overspend
  if (
    input.tool.toLowerCase() === "chatgpt" &&
    input.plan.toLowerCase() === "team" &&
    input.seats <= 2
  ) {
    recommendedSpend = 20 * input.seats;

    recommendation = "Switch to ChatGPT Plus";

    reason =
      "ChatGPT Team pricing becomes inefficient for very small teams.";
  }

  // Claude Max Overspend
  if (
    input.tool.toLowerCase() === "claude" &&
    input.plan.toLowerCase() === "max"
  ) {
    recommendedSpend = 20 * input.seats;

    recommendation = "Downgrade to Claude Pro";

    reason =
      "Most users do not fully utilize Claude Max rate limits.";
  }

  // Cursor Business Overspend
  if (
    input.tool.toLowerCase() === "cursor" &&
    input.plan.toLowerCase() === "business" &&
    input.seats <= 3
  ) {
    recommendedSpend = 20 * input.seats;

    recommendation = "Switch to Cursor Pro";

    reason =
      "Cursor Business is generally optimized for larger engineering teams.";
  }

  // Copilot Enterprise Overspend
  if (
    input.tool.toLowerCase() === "copilot" &&
    input.plan.toLowerCase() === "enterprise" &&
    input.seats < 10
  ) {
    recommendedSpend = 19 * input.seats;

    recommendation = "Switch to Copilot Business";

    reason =
      "Enterprise governance features may not justify pricing at smaller scale.";
  }

  const monthlySavings =
    input.monthlySpend - recommendedSpend;

  return {
    currentSpend: input.monthlySpend,
    recommendedSpend,
    monthlySavings,
    annualSavings: monthlySavings * 12,
    recommendation,
    reason,
  };
}