
"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const saved = localStorage.getItem("audit-form");

    if (saved) {
      reset(JSON.parse(saved));
    }
  }, [reset]);

  const onSubmit = (data: FormData) => {
    localStorage.setItem(
      "audit-form",
      JSON.stringify(data)
    );

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
       <select
  {...register("tool")}
  className="rounded-xl border border-zinc-700 bg-black px-4 py-3"
>
  <option value="">Select Tool</option>
  <option value="chatgpt">ChatGPT</option>
  <option value="claude">Claude</option>
  <option value="cursor">Cursor</option>
  <option value="copilot">GitHub Copilot</option>
  <option value="gemini">Gemini</option>
</select>

        <select
  {...register("plan")}
  className="rounded-xl border border-zinc-700 bg-black px-4 py-3"
>
  <option value="">Select Plan</option>
  <option value="plus">Plus</option>
  <option value="team">Team</option>
  <option value="enterprise">Enterprise</option>
  <option value="pro">Pro</option>
  <option value="business">Business</option>
  <option value="max">Max</option>
</select>
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
  <div className="mt-8 space-y-6">
    <div className="rounded-3xl border border-green-800 bg-green-950 p-8 text-center">
      <p className="text-sm uppercase tracking-wide text-green-400">
        Estimated Monthly Savings
      </p>

      <h3 className="mt-2 text-5xl font-bold text-green-300">
        ${result.monthlySavings}
      </h3>

      <p className="mt-4 text-zinc-300">
        Potential annual savings of $
        {result.annualSavings}
      </p>
    </div>

    <div className="rounded-3xl border border-zinc-800 bg-black p-6">
      <h3 className="text-2xl font-bold text-white">
        Recommendation
      </h3>

      <p className="mt-4 text-lg font-medium text-white">
        {result.recommendation}
      </p>

      <p className="mt-3 text-zinc-400">
        {result.reason}
      </p>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <p className="text-sm text-zinc-400">
          Current Spend
        </p>

        <h4 className="mt-2 text-3xl font-bold">
          ${result.currentSpend}
        </h4>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <p className="text-sm text-zinc-400">
          Recommended Spend
        </p>

        <h4 className="mt-2 text-3xl font-bold">
          ${result.recommendedSpend}
        </h4>
      </div>
    </div>
  </div>
     )}
     </div>
  )};