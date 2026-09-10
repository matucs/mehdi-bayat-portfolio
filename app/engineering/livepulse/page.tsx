import type { Metadata } from "next";
import { Section, ExternalLink, Tag, MeasuredBadge } from "@/components/ui";
import IncidentCard from "@/components/IncidentCard";
import { links } from "@/data/links";
import {
  livepulseOverview,
  engineeringHighlights,
  incidents,
  decisions,
  scalingStages,
  scaleDemoResults,
  measuredMetrics,
} from "@/data/livepulse";

export const metadata: Metadata = {
  title: "LivePulse — Real-Time Sports Intelligence Platform",
  description:
    "How LivePulse's event-driven architecture works: Kafka, Redis, PostgreSQL, WebSockets, a real production incident, and measured vs. projected scaling.",
  alternates: { canonical: "/engineering/livepulse" },
};

export default function LivePulsePage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-16 sm:pt-20">
        <p className="mono text-xs uppercase tracking-widest text-accent">Engineering Case Study</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{livepulseOverview.name}</h1>
        <p className="mt-2 text-lg text-muted">{livepulseOverview.tagline}</p>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">{livepulseOverview.description}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <ExternalLink href={links.livepulse.live}>Live app</ExternalLink>
          <ExternalLink href={links.livepulse.ops}>Ops dashboard</ExternalLink>
          <ExternalLink href={links.livepulse.github}>GitHub</ExternalLink>
          <ExternalLink href={links.livepulse.caseStudy}>Full build log</ExternalLink>
        </div>
      </section>

      <Section eyebrow="Overview" title="What LivePulse is">
        <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted">
          <p>
            Live sports data changes constantly and unpredictably, and a browser wants to reflect
            that without a manual refresh. LivePulse ingests real match data on a schedule,
            figures out what actually changed since the last poll, and pushes only that change to
            connected clients — through a pipeline designed to fail in isolated, understandable ways
            rather than all at once.
          </p>
          <p>{livepulseOverview.status}</p>
        </div>
      </Section>

      <Section eyebrow="Architecture" title="How data moves through the system">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-border bg-surface p-6">
            <ol className="space-y-3 text-sm">
              {[
                "API-Football (external) → polled on tiered intervals",
                "Ingestion service → normalizes provider data, writes to PostgreSQL",
                "Change Detector → compares against last-known state, emits domain events only on real changes",
                "Kafka (6 topics) → scores / stats / alerts consumer groups, independently scalable",
                "Redis → live state cache-aside + pub/sub bridge to WebSocket gateway",
                "WebSocket gateway → subscribe/snapshot/update protocol to the browser",
              ].map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="mono flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-border text-xs text-muted">
                    {i + 1}
                  </span>
                  <span className="text-muted">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <p className="mono text-xs uppercase tracking-widest text-muted">Why it&apos;s built this way</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              PostgreSQL stays the source of truth so durable history never depends on Kafka or Redis
              being healthy. Redis is used purely for speed — every cached value carries a freshness
              timestamp and falls back to Postgres on a miss. Kafka decouples scores, stats, and
              alerts into independent consumer groups so a slow one can never block another.
            </p>
            <a
              href={links.architectureLab.github}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-sm font-medium text-accent hover:underline underline-offset-4"
            >
              Explore the interactive Architecture Lab →
            </a>
          </div>
        </div>
      </Section>

      <Section eyebrow="Verified, Not Assumed" title="Engineering Highlights">
        <ul className="grid gap-4 sm:grid-cols-2">
          {engineeringHighlights.map((item) => (
            <li key={item} className="flex gap-3 rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed text-muted">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Real Engineering Incident" title="The WebSocket subscribe race">
        <IncidentCard incident={incidents[0]} />
      </Section>

      <Section eyebrow="8 Architecture Decision Records" title="Architecture Decisions">
        <div className="grid gap-4 sm:grid-cols-2">
          {decisions.map((d) => (
            <div key={d.number} className="rounded-lg border border-border bg-surface p-5">
              <p className="mono text-xs font-semibold text-accent">{d.number}</p>
              <p className="mt-1 font-medium">{d.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d.summary}</p>
            </div>
          ))}
        </div>
        <a
          href={links.architectureLab.github}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block text-sm font-medium text-accent hover:underline underline-offset-4"
        >
          Explore all 8 ADRs in the Architecture Lab →
        </a>
      </Section>

      <Section eyebrow="Scaling" title="Measured today, projected tomorrow">
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted">
          LivePulse deliberately separates what has actually been run from what the architecture is
          designed to support later. The Scaling Demo exists specifically to turn one of those
          projections into a measurement.
        </p>
        <div className="grid gap-4 lg:grid-cols-3">
          {scalingStages.map((s) => (
            <div key={s.stage} className="rounded-lg border border-border bg-surface p-5">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium">{s.stage}</p>
                <MeasuredBadge kind={s.kind} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-border bg-surface p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold">Scaling Demo: real fan-out measurement</h3>
            <MeasuredBadge kind="measured" />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{scaleDemoResults.claim}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{scaleDemoResults.method}</p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted">
                  <th className="py-2 pr-4 font-medium">Connections</th>
                  <th className="py-2 pr-4 font-medium">Delivered</th>
                  <th className="py-2 pr-4 font-medium">Both instances</th>
                  <th className="py-2 pr-4 font-medium">p50</th>
                  <th className="py-2 pr-4 font-medium">p99</th>
                </tr>
              </thead>
              <tbody>
                {scaleDemoResults.measured.map((row) => (
                  <tr key={row.connections} className="border-b border-border/60">
                    <td className="py-2 pr-4">{row.connections}</td>
                    <td className="py-2 pr-4">{row.delivered}</td>
                    <td className="py-2 pr-4">{row.bothInstances ? "✅" : "—"}</td>
                    <td className="py-2 pr-4 mono">{row.p50}</td>
                    <td className="py-2 pr-4 mono">{row.p99}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            <span className="font-medium text-foreground">Validates: </span>
            {scaleDemoResults.validates}
          </p>
          <div className="mt-3">
            <p className="text-sm font-medium text-foreground">Does not validate:</p>
            <ul className="mt-2 space-y-1.5">
              {scaleDemoResults.doesNotValidate.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-muted">— {item}</li>
              ))}
            </ul>
          </div>
          <a
            href={links.scalingDemo.github}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block text-sm font-medium text-accent hover:underline underline-offset-4"
          >
            Explore Scale Demo →
          </a>
        </div>
      </Section>

      <Section eyebrow="Numbers That Are Real" title="Measured Metrics">
        <div className="grid gap-4 sm:grid-cols-2">
          {measuredMetrics.map((m) => (
            <div key={m.label} className="rounded-lg border border-border bg-surface p-5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-muted">{m.label}</p>
                <MeasuredBadge kind={m.kind} />
              </div>
              <p className="mt-2 mono text-sm font-medium">{m.value}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Technology" title="Stack">
        <div className="flex flex-wrap gap-1.5">
          {["Next.js", "React", "TypeScript", "TanStack Query", "Fastify", "PostgreSQL", "Redis", "Kafka", "ioredis", "WebSockets (ws)", "OpenTelemetry", "Prometheus", "Playwright", "Docker Compose", "Vercel", "Oracle Cloud"].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </Section>
    </>
  );
}
