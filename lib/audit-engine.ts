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
}

export function generateAudit(input: AuditInput): AuditResult {
  const toolPricing =
    pricingData[input.tool as keyof typeof pricingData];

  if (!toolPricing) {
    return {
      currentSpend: input.monthlySpend,
      recommendedSpend: input.monthlySpend,
      monthlySavings: 0,
      annualSavings: 0,
      recommendation: "No optimization found",
    };
  }

  const cheapestPlan = Math.min(
    ...Object.values(toolPricing)
  );

  const recommendedSpend = cheapestPlan * input.seats;

  const monthlySavings =
    input.monthlySpend - recommendedSpend;

  return {
    currentSpend: input.monthlySpend,
    recommendedSpend,
    monthlySavings,
    annualSavings: monthlySavings * 12,
    recommendation:
      monthlySavings > 0
        ? "Switch to a lower-cost plan"
        : "Current setup looks optimized",
  };
}