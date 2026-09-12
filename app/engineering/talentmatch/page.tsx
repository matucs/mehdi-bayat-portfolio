import type { Metadata } from "next";
import { Section, ExternalLink, Tag, MeasuredBadge } from "@/components/ui";
import { links } from "@/data/links";
import {
  talentmatchOverview,
  engineeringHighlights,
  knownTradeOff,
  decisions,
  measuredMetrics,
} from "@/data/talentmatch";

export const metadata: Metadata = {
  title: "TalentMatch — Production-Oriented Job Matching Backend",
  description:
    "How TalentMatch works: the two-deployable architecture, idempotent applications, deterministic scoring, a documented trade-off, and the real decisions behind it.",
  alternates: { canonical: "/engineering/talentmatch" },
};

export default function TalentMatchPage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-16 sm:pt-20">
        <p className="mono text-xs uppercase tracking-widest text-accent">Engineering Case Study</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{talentmatchOverview.name}</h1>
        <p className="mt-2 text-lg text-muted">{talentmatchOverview.tagline}</p>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">{talentmatchOverview.description}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <ExternalLink href={links.jobify.live}>Live API</ExternalLink>
          <ExternalLink href={links.jobify.docs}>API docs</ExternalLink>
          <ExternalLink href={links.jobify.demo}>Browser demo</ExternalLink>
          <ExternalLink href={links.jobify.github}>GitHub</ExternalLink>
        </div>
      </section>

      <Section eyebrow="Overview" title="What TalentMatch is">
        <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted">
          <p>
            Publishing a job and applying to one look synchronous from the outside, but the work
            behind them — search indexing, candidate scoring — is retryable and shouldn't block a
            response. TalentMatch splits on exactly that line: the API handles the request/response
            use cases, a BullMQ worker handles the asynchronous effects, and MongoDB stays the one
            place domain truth actually lives.
          </p>
          <p>{talentmatchOverview.status}</p>
        </div>
      </Section>

      <Section eyebrow="Architecture" title="How a publish becomes a searchable job">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-border bg-surface p-6">
            <ol className="space-y-3 text-sm">
              {[
                "Employer publishes a job → API atomically marks it published and stores a pending indexSync marker in the same MongoDB update",
                "API tries an immediate BullMQ enqueue for low latency — using the event ID as the job ID, so a crash between enqueue and acknowledgement can't create a duplicate",
                "If enqueueing fails, the worker's relay discovers the pending marker on its own and retries — durability lives in the data, not in Redis staying up",
                "Index worker reloads the canonical job from MongoDB and upserts or deletes the OpenSearch document — old commands arriving late still converge correctly",
                "Failed indexing attempts retry with exponential backoff; after 5 attempts, a diagnostic copy lands on a dead-letter queue for safe, idempotent replay",
                "Candidate applies with an Idempotency-Key → a unique index plus a SHA-256 fingerprint tell a safe replay apart from an accidental key reuse with different input",
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
              MongoDB and Redis can&apos;t be written atomically, so the embedded marker pattern makes
              durability a property of one document update instead of two systems staying in sync.
              Delete is a tombstone rather than a hard delete, specifically so the only durable record
              of an undelivered OpenSearch delete command can never be erased before it&apos;s acted on.
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

      <Section eyebrow="Named, Not Hidden" title="A documented trade-off">
        <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
          <h3 className="text-lg font-semibold">{knownTradeOff.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{knownTradeOff.detail}</p>
        </div>
      </Section>

      <Section eyebrow="5 Documented Decisions" title="Key Decisions">
        <div className="grid gap-4 sm:grid-cols-2">
          {decisions.map((d) => (
            <div key={d.number} className="rounded-lg border border-border bg-surface p-5">
              <p className="mono text-xs font-semibold text-accent">Decision {d.number}</p>
              <p className="mt-1 font-medium">{d.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{d.summary}</p>
            </div>
          ))}
        </div>
        <a
          href={`${links.jobify.github}/blob/main/docs/architecture.md`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block text-sm font-medium text-accent hover:underline underline-offset-4"
        >
          Read the full architecture doc →
        </a>
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
          {["Fastify", "TypeScript", "MongoDB", "Redis", "BullMQ", "OpenSearch", "Zod", "Vitest", "Docker", "AWS ECS/Fargate", "CloudFormation", "GitHub Actions", "OIDC"].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </Section>
    </>
  );
}
