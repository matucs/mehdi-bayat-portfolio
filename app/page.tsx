import Link from "next/link";
import Hero from "@/components/Hero";
import { Section, ExternalLink, Tag } from "@/components/ui";
import BuildUnderstandValidate from "@/components/BuildUnderstandValidate";
import EngineeringEvidence from "@/components/EngineeringEvidence";
import TechStack from "@/components/TechStack";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { links } from "@/data/links";
import { livepulseOverview } from "@/data/livepulse";

const principles = [
  "Evidence over assumptions",
  "Architecture proportional to requirements",
  "Explicit trade-offs",
  "Automated verification",
  "Failure-mode thinking",
  "Observable systems",
  "Measured performance, not claimed performance",
  "Human-owned engineering decisions",
];

export default function Home() {
  const jobify = projects.find((p) => p.slug === "jobify")!;
  const agentforge = projects.find((p) => p.slug === "agentforge")!;
  const otherProjects = projects.filter((p) => !["livepulse", "jobify"].includes(p.slug));

  return (
    <>
      <Hero />

      <Section eyebrow="Featured Engineering" title="LivePulse">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <p className="text-accent">{livepulseOverview.tagline}</p>
            <p className="mt-3 text-base leading-relaxed text-muted">{livepulseOverview.description}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {["Kafka", "Redis", "PostgreSQL", "WebSockets", "Next.js", "Fastify", "Docker", "OpenTelemetry"].map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <ExternalLink href={links.livepulse.live}>Live app</ExternalLink>
              <ExternalLink href={links.livepulse.ops}>Ops dashboard</ExternalLink>
              <ExternalLink href={links.livepulse.github}>GitHub</ExternalLink>
              <Link href="/engineering/livepulse" className="text-sm font-medium text-foreground hover:underline underline-offset-4">
                Read the full case study →
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <p className="mono text-xs uppercase tracking-widest text-muted">Status</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{livepulseOverview.status}</p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Featured Engineering" title="AgentForge">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <p className="text-accent">{agentforge.subtitle}</p>
            <p className="mt-3 text-base leading-relaxed text-muted">{agentforge.description}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {agentforge.technologies.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {agentforge.github && <ExternalLink href={agentforge.github}>GitHub</ExternalLink>}
              <Link href="/projects" className="text-sm font-medium text-foreground hover:underline underline-offset-4">
                Read more →
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface p-6">
            <p className="mono text-xs uppercase tracking-widest text-muted">Core principle</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              LLMs propose and reason. Deterministic systems verify. No agent&apos;s approval —
              including the Reviewer&apos;s — is the final word: a real test failure or a real
              detected secret overrides a simulated approval every time, proven with
              failure-injection demos, not just asserted.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="One Engineering Story" title="Build → Understand → Validate">
        <BuildUnderstandValidate />
      </Section>

      <Section eyebrow="Recruiter View" title="Engineering Evidence">
        <p className="mb-6 max-w-2xl text-sm text-muted">
          Instead of a skills list, here is what each capability is actually backed by.
        </p>
        <EngineeringEvidence />
      </Section>

      <Section eyebrow="Also Built" title="Other Projects">
        <div className="grid gap-6 sm:grid-cols-2">
          <ProjectCard project={jobify} />
          {otherProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Technology" title="Working Stack">
        <TechStack />
      </Section>

      <Section eyebrow="How I Engineer" title="Engineering Philosophy">
        <ul className="grid gap-3 sm:grid-cols-2">
          {principles.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-muted">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              {p}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="AI-Augmented Engineering" title="Where AI fits in how I build">
        <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted">
          <p>
            AI tools are part of my day-to-day workflow — implementation acceleration, test
            generation, refactoring support, code review assistance, debugging, and documentation.
            LivePulse and its Architecture Lab were built with heavy AI-assisted implementation,
            which is exactly why both projects document their engineering process, ADRs, and real
            incidents so openly: the reasoning has to survive scrutiny independent of who typed the code.
          </p>
          <p className="font-medium text-foreground">
            AI accelerates implementation; engineering judgment — what to build, which trade-offs to
            accept, how to verify a claim — remains human-owned.
          </p>
        </div>
      </Section>

      <Section eyebrow="Get in Touch" title="Contact">
        <div className="flex flex-wrap gap-3">
          <a href={links.email} className="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90">
            Email me
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer" className="rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface-2">
            LinkedIn
          </a>
          <a href={links.github} target="_blank" rel="noreferrer" className="rounded-md border border-border px-4 py-2.5 text-sm font-medium hover:bg-surface-2">
            GitHub
          </a>
        </div>
      </Section>
    </>
  );
}
