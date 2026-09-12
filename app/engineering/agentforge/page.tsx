import type { Metadata } from "next";
import { Section, ExternalLink, Tag, MeasuredBadge } from "@/components/ui";
import IncidentCard from "@/components/IncidentCard";
import { links } from "@/data/links";
import {
  agentforgeOverview,
  engineeringHighlights,
  bugs,
  decisions,
  failureDemoResults,
  measuredMetrics,
} from "@/data/agentforge";

export const metadata: Metadata = {
  title: "AgentForge: Governed Autonomous Software Engineering Platform",
  description:
    "How AgentForge works: a LangGraph multi-agent pipeline, a deterministic verification gate and risk-based policy engine, real failure-injection demos, and the bugs found building it.",
  alternates: { canonical: "/engineering/agentforge" },
};

export default function AgentForgePage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-16 sm:pt-20">
        <p className="mono text-xs uppercase tracking-widest text-accent">Engineering Case Study</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{agentforgeOverview.name}</h1>
        <p className="mt-2 text-lg text-muted">{agentforgeOverview.tagline}</p>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">{agentforgeOverview.description}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <ExternalLink href={links.agentforge.live}>Live app</ExternalLink>
          <ExternalLink href={links.agentforge.ops}>Ops dashboard</ExternalLink>
          <ExternalLink href={links.agentforge.github}>GitHub</ExternalLink>
          <ExternalLink href={links.agentforge.caseStudy}>Full build log</ExternalLink>
        </div>
      </section>

      <Section eyebrow="Core Principle" title="LLMs propose and reason. Deterministic systems verify.">
        <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted">
          <p>
            AgentForge is a multi-agent system where Planner, Architect, Researcher, Developer, and
            Reviewer are real LLM calls, but none of them, including the Reviewer, gets the final
            word on whether a change ships. QA and Security run deterministic checks with no LLM
            involved at all, and a separate Verification Gate plus a risk-based Policy Engine make
            the actual pass/fail and merge/hold-for-approval decisions, enforced server-side so a
            frontend can never quietly bypass either one.
          </p>
          <p>{agentforgeOverview.status}</p>
        </div>
      </Section>

      <Section eyebrow="Architecture" title="How a change moves through the pipeline">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-border bg-surface p-6">
            <ol className="space-y-3 text-sm">
              {[
                "Planner, Architect, Researcher: real LLM calls that turn a requirement into a plan, a design, and grounded research",
                "Developer: a real LLM call that writes real file changes and commits them to a real git branch",
                "Reviewer: a real LLM call producing structured findings, fed back to the Developer on a high-severity finding",
                "QA: no LLM. Runs the project's real test suite via subprocess; a failed test sends control back to the Developer regardless of the Reviewer's approval",
                "Security: no LLM. A real regex scan for secret-shaped strings and risky constructs",
                "Verification Gate, then Policy Engine: no LLM in either. Real type-check/lint/test/security results feed a fixed rule set, then a real risk classification decides auto-merge, block, or human approval",
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
              A single LLM judgment, however well-prompted, can miss a bug, hallucinate a false
              &quot;looks good,&quot; or be inconsistent between two runs of the same input. Putting
              the Verification Gate and Policy Engine in a separate module with zero LLM calls means
              the same inputs always produce the same decision, independent of any model, and makes
              that decision independently testable without ever needing a real API key.
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

      <Section eyebrow="Real Engineering Bug" title="The logging call that hid the real crash">
        <IncidentCard incident={bugs[0]} />
      </Section>

      <Section eyebrow="4 Architecture Decision Records" title="Architecture Decisions">
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
          href={`${links.agentforge.github}/tree/main/docs/adr`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block text-sm font-medium text-accent hover:underline underline-offset-4"
        >
          Read all 4 ADRs →
        </a>
      </Section>

      <Section eyebrow="Proof, Not Assertion" title="Failure-Injection Demos">
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-muted">{failureDemoResults.claim}</p>
        <div className="rounded-lg border border-border bg-surface p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold">make demo-failure: real outcomes</h3>
            <MeasuredBadge kind="measured" />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">{failureDemoResults.method}</p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted">
                  <th className="py-2 pr-4 font-medium">Scenario</th>
                  <th className="py-2 pr-4 font-medium">Real trigger</th>
                  <th className="py-2 pr-4 font-medium">Actual outcome</th>
                </tr>
              </thead>
              <tbody>
                {failureDemoResults.measured.map((row) => (
                  <tr key={row.scenario} className="border-b border-border/60">
                    <td className="py-2 pr-4">{row.scenario}</td>
                    <td className="py-2 pr-4 text-muted">{row.trigger}</td>
                    <td className="py-2 pr-4 mono">{row.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            <span className="font-medium text-foreground">Validates: </span>
            {failureDemoResults.validates}
          </p>
          <div className="mt-3">
            <p className="text-sm font-medium text-foreground">Does not validate:</p>
            <ul className="mt-2 space-y-1.5">
              {failureDemoResults.doesNotValidate.map((item) => (
                <li key={item} className="text-sm leading-relaxed text-muted">— {item}</li>
              ))}
            </ul>
          </div>
          <a
            href={`${links.agentforge.github}/blob/main/backend/app/demos/failure_scenarios.py`}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block text-sm font-medium text-accent hover:underline underline-offset-4"
          >
            Explore the failure-injection demos →
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
          {["FastAPI", "LangGraph", "PostgreSQL", "SQLAlchemy", "Alembic", "Redis", "Next.js", "TypeScript", "Docker Compose", "OpenTelemetry", "Prometheus", "Anthropic API", "OpenAI API", "GitHub REST API"].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </Section>
    </>
  );
}
