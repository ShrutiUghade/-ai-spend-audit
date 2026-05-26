import AuditForm from "@/components/audit-form";
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <div className="mb-6 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400">
          AI Spend Optimization Platform
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl">
          Your AI Stack Is Probably Overpriced
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-zinc-400">
          Analyze your AI tooling costs, identify waste, and discover smarter
          alternatives in under 60 seconds.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200">
            Start Free Audit
          </button>

          <button className="rounded-xl border border-zinc-700 px-6 py-3 font-medium text-white transition hover:bg-zinc-900">
            View Example Report
          </button>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-3xl font-bold">$2,400+</h3>
            <p className="mt-2 text-zinc-400">
              Average annual savings identified
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-3xl font-bold">8+ AI Tools</h3>
            <p className="mt-2 text-zinc-400">
              Supported platforms and APIs
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-3xl font-bold">60 Seconds</h3>
            <p className="mt-2 text-zinc-400">
              Instant optimization recommendations
            </p>
          </div>
        </div>
     <AuditForm />
      </section>
    </main>
  );
}