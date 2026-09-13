import type { Metadata } from "next";
import { Section, ExternalLink, Tag, MeasuredBadge } from "@/components/ui";
import IncidentCard from "@/components/IncidentCard";
import { links } from "@/data/links";
import {
  liveopsOverview,
  engineeringHighlights,
  incidents,
  decisions,
  scalingStages,
  scaleDemoResults,
  measuredMetrics,
} from "@/data/liveops";

export const metadata: Metadata = {
  title: "LiveOps — Real-Time Event Processing & Workflow Platform",
  description:
    "How LiveOps's event-driven architecture works: a transactional outbox, a Postgres-backed event bus, a workflow engine with saga compensation, CQRS, and a load test that found two real bottlenecks.",
  alternates: { canonical: "/engineering/liveops" },
};

export default function LiveOpsPage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-16 sm:pt-20">
        <p className="mono text-xs uppercase tracking-widest text-accent">Engineering Case Study</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{liveopsOverview.name}</h1>
        <p className="mt-2 text-lg text-muted">{liveopsOverview.tagline}</p>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">{liveopsOverview.description}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {links.liveops.live && <ExternalLink href={links.liveops.live}>Live app</ExternalLink>}
          <ExternalLink href={links.liveops.github}>GitHub</ExternalLink>
          <ExternalLink href={links.liveops.caseStudy}>Full build log</ExternalLink>
        </div>
      </section>

      <Section eyebrow="Overview" title="What LiveOps is">
        <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted">
          <p>
            Most portfolio projects that reach for &quot;event-driven architecture&quot; add Kafka on
            day one and call it done. LiveOps starts from the opposite instinct: build the smallest
            complete version of the real problem first — durable ingest, reliable async processing,
            a saga that can actually fail and recover — on Postgres alone, then let a load test decide
            whether a broker is actually the bottleneck before adding one.
          </p>
          <p>{liveopsOverview.status}</p>
        </div>
      </Section>

      <Section eyebrow="Architecture" title="How an event moves through the system">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-border bg-surface p-6">
            <ol className="space-y-3 text-sm">
              {[
                "POST /api/v1/events → tenant-authenticated, schema-validated, idempotent insert",
                "Event row + outbox row commit together — the transactional outbox",
                "OutboxPublisher → claims pending rows (FOR UPDATE SKIP LOCKED), marks dispatched",
                "3 independent consumer groups poll the log at their own pace, own checkpoint each",
                "WorkflowEngine → drives a real saga, persists every step transition, compensates on exhausted retries",
                "ProjectionWorker → feeds CQRS read tables the dashboard queries, live over SSE",
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
              One lease-based recovery pattern (a <code className="mono text-xs">locked_until</code> column,
              not a held transaction or in-memory registry) is used identically by the outbox publisher, the
              event bus, and the workflow engine. A restarted process needs no separate recovery scan — it
              runs the exact same claim query it always runs, and an expired lease looks identical to
              never-claimed work. Verified by actually killing the live process, four separate times, at four
              different points in the pipeline.
            </p>
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

      <Section eyebrow="Real Engineering Incident" title="The projection worker's N+1">
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
          href={`${links.liveops.github}/tree/main/docs/adr`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block text-sm font-medium text-accent hover:underline underline-offset-4"
        >
          Read all 8 ADRs on GitHub →
        </a>
      </Section>

      <Section eyebrow="Scaling" title="Measured today, planned tomorrow">
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted">
          LiveOps deliberately separates what has actually been run from what the architecture is
          designed to support later. The load test below exists specifically to turn assumptions about
          where this system would break into measurements.
        </p>
        <div className="grid gap-4 lg:grid-cols-2">
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
            <h3 className="font-semibold">Load test: real bottlenecks, found and fixed</h3>
            <MeasuredBadge kind="measured" />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{scaleDemoResults.claim}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{scaleDemoResults.method}</p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted">
                  <th className="py-2 pr-4 font-medium">Concurrency</th>
                  <th className="py-2 pr-4 font-medium">Requests</th>
                  <th className="py-2 pr-4 font-medium">p50</th>
                  <th className="py-2 pr-4 font-medium">p99</th>
                </tr>
              </thead>
              <tbody>
                {scaleDemoResults.measured.map((row) => (
                  <tr key={row.connections} className="border-b border-border/60">
                    <td className="py-2 pr-4">{row.connections}</td>
                    <td className="py-2 pr-4">{row.delivered}</td>
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
            href={`${links.liveops.github}/blob/main/docs/phase-06-notes.md`}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block text-sm font-medium text-accent hover:underline underline-offset-4"
          >
            Read the full load-test method and numbers →
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
          {["TypeScript", "Fastify", "Next.js", "React", "PostgreSQL", "Server-Sent Events", "Docker Compose", "Zod"].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </Section>
    </>
  );
}
