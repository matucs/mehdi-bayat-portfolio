import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { links } from "@/data/links";

export const metadata: Metadata = {
  title: "About",
  description: "Mehdi Bayat — Senior Full-Stack Engineer based in Vienna, Austria.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-8 pt-16 sm:pt-20">
        <p className="mono text-xs uppercase tracking-widest text-accent">About</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Mehdi Bayat</h1>
      </section>

      <Section>
        <div className="max-w-3xl space-y-5 text-base leading-relaxed text-muted">
          <p>
            I&apos;m a senior full-stack engineer based in Vienna, currently building emBET, Sportradar&apos;s
            betting widget embedded inside live sports streams and sportsbook partner sites, handling
            millions of concurrent users during peak events. Before that: real-time trading and
            market-data platforms for Iran&apos;s national stock exchange, a bank&apos;s CRM and CMS platform,
            and a full rewrite of the logistics system running Iran&apos;s 13 main maritime ports.
          </p>
          <p>
            Most of my career has been in places where latency is measured in milliseconds and
            downtime costs real money — trading floors, live betting, port logistics. That shapes
            how I think about software: architecture proportional to what&apos;s actually required,
            trade-offs stated explicitly instead of hidden, and systems built to fail in
            understandable, isolated ways rather than all at once.
          </p>
          <p>
            LivePulse, the project featured on this site, reflects that directly. It&apos;s built to the
            same standard I hold production work to: real data instead of a simulator, ADRs that
            state the actual trade-off instead of the ideal one, and a documented real incident
            (a WebSocket subscribe race condition) rather than a portfolio that only shows what
            went right.
          </p>
          <p>
            On the AI side, I was part of the team that built the first production RAG pipeline on
            AWS Bedrock for one of Sportradar&apos;s projects, and I
            use AI tools daily for implementation, test generation, refactoring, and code review —
            but the engineering judgment behind what to build and how to verify it stays mine.
            AgentForge is that principle turned into a system: a multi-agent pipeline where an
            LLM&apos;s approval is never sufficient on its own, because a deterministic verification
            gate and a risk-based policy engine make the final call instead.
          </p>
        </div>
      </Section>

      <Section title="Where latency, availability, and reliability actually mattered">
        <ul className="grid gap-4 sm:grid-cols-2">
          {[
            "A stock exchange with a zero-downtime requirement, where race conditions in concurrent WebSocket streams only surfaced under real trading load.",
            "A live betting platform where a 180ms hot-path latency was a real production problem, not a benchmark exercise.",
            "A port logistics rewrite that had to stay live across 13 ports with no big-bang cutover.",
            "A banking CRM where a UI bug wasn't an inconvenience — it blocked someone's job.",
          ].map((item) => (
            <li key={item} className="flex gap-3 rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed text-muted">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Elsewhere">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a href={links.github} target="_blank" rel="noreferrer" className="font-medium text-accent hover:underline underline-offset-4">GitHub</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="font-medium text-accent hover:underline underline-offset-4">LinkedIn</a>
          <a href={links.cv} target="_blank" rel="noreferrer" className="font-medium text-accent hover:underline underline-offset-4">CV</a>
        </div>
      </Section>
    </>
  );
}
