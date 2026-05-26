"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { generateAudit } from "@/lib/audit-engine";

type FormData = {
  tool: string;
  plan: string;
  seats: number;
  monthlySpend: number;
};

export default function AuditForm() {
  const [result, setResult] = useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const audit = generateAudit({
      tool: data.tool,
      plan: data.plan,
      seats: Number(data.seats),
      monthlySpend: Number(data.monthlySpend),
    });

    setResult(audit);
  };

  return (
    <div className="mt-16 w-full max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <h2 className="mb-6 text-2xl font-bold">
        Run Your AI Spend Audit
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4"
      >
        <input
          {...register("tool")}
          placeholder="Tool (chatgpt, claude, cursor)"
          className="rounded-xl border border-zinc-700 bg-black px-4 py-3"
        />

        <input
          {...register("plan")}
          placeholder="Current Plan"
          className="rounded-xl border border-zinc-700 bg-black px-4 py-3"
        />

        <input
          type="number"
          {...register("seats")}
          placeholder="Number of Seats"
          className="rounded-xl border border-zinc-700 bg-black px-4 py-3"
        />

        <input
          type="number"
          {...register("monthlySpend")}
          placeholder="Monthly Spend ($)"
          className="rounded-xl border border-zinc-700 bg-black px-4 py-3"
        />

        <button
          type="submit"
          className="rounded-xl bg-white px-6 py-3 font-medium text-black"
        >
          Generate Audit
        </button>
      </form>

      {result && (
        <div className="mt-8 rounded-2xl border border-zinc-700 bg-black p-6">
          <h3 className="text-2xl font-bold">
            Audit Results
          </h3>

          <div className="mt-4 space-y-2 text-zinc-300">
            <p>
              Current Spend: ${result.currentSpend}
            </p>

            <p>
              Recommended Spend: $
              {result.recommendedSpend}
            </p>

            <p>
              Monthly Savings: $
              {result.monthlySavings}
            </p>

            <p>
              Annual Savings: $
              {result.annualSavings}
            </p>

            <p className="pt-4 font-medium text-white">
              {result.recommendation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}