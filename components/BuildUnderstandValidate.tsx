import { links } from "@/data/links";
import { ExternalLink, Tag } from "./ui";

const stages = [
  {
    step: "BUILD",
    title: "LivePulse",
    description:
      "The real distributed system: event-driven ingestion, Kafka, Redis, PostgreSQL, and a WebSocket gateway pushing live updates to the browser.",
    tech: ["Next.js", "Fastify", "Kafka", "Redis", "PostgreSQL"],
    links: [
      { label: "Live app", url: links.livepulse.live },
      { label: "GitHub", url: links.livepulse.github },
    ],
  },
  {
    step: "UNDERSTAND",
    title: "Architecture Lab",
    description:
      "An interactive companion exploring the system component-by-component: real event flows, 8 accepted ADRs, and the actual production incident, not a marketing diagram.",
    tech: ["Next.js", "TypeScript"],
    links: [{ label: "GitHub", url: links.architectureLab.github }],
  },
  {
    step: "VALIDATE",
    title: "Scaling Demo",
    description:
      "A real load test against two unmodified LivePulse backend processes, measuring whether the WebSocket fan-out design actually holds up across instances.",
    tech: ["TypeScript", "Redis", "WebSockets"],
    links: [{ label: "GitHub", url: links.scalingDemo.github }],
  },
];

export default function BuildUnderstandValidate() {
  return (
    <div className="relative">
      <div className="grid gap-6 md:grid-cols-3">
        {stages.map((stage, i) => (
          <div key={stage.step} className="relative flex flex-col rounded-lg border border-border bg-surface p-6">
            <p className="mono text-xs font-semibold tracking-widest text-accent">{stage.step}</p>
            <h3 className="mt-2 text-lg font-semibold">{stage.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{stage.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {stage.tech.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
              {stage.links.map((l) => (
                <ExternalLink key={l.label} href={l.url}>
                  {l.label}
                </ExternalLink>
              ))}
            </div>
            {i < stages.length - 1 && (
              <div
                className="pointer-events-none absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 text-border md:block"
                aria-hidden="true"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-muted">
        One coherent engineering case study — build the system, explain the architecture, and measure the claims.
      </p>
    </div>
  );
}
