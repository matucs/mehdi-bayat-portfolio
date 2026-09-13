import type { Metadata } from "next";
import Link from "next/link";
import { Section, ExternalLink, Tag } from "@/components/ui";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { links } from "@/data/links";

export const metadata: Metadata = {
  title: "Projects",
  description: "LivePulse and its Architecture Lab and Scaling Demo, AgentForge (a governed multi-agent engineering platform), plus TalentMatch, a production-oriented job matching backend.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const livepulse = projects.find((p) => p.slug === "livepulse")!;
  const agentforge = projects.find((p) => p.slug === "agentforge")!;
  const liveops = projects.find((p) => p.slug === "liveops")!;
  const jobify = projects.find((p) => p.slug === "jobify")!;
  const others = projects.filter(
    (p) => !["livepulse", "agentforge", "liveops", "jobify"].includes(p.slug)
  );

  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-8 pt-16 sm:pt-20">
        <p className="mono text-xs uppercase tracking-widest text-accent">Projects</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">What I&apos;ve built</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          A small number of projects with real depth, rather than a long list of small ones.
        </p>
      </section>

      <Section title="LivePulse">
        <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
          <p className="text-accent">{livepulse.subtitle}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{livepulse.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {livepulse.technologies.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {livepulse.github && <ExternalLink href={livepulse.github}>GitHub</ExternalLink>}
            {livepulse.demo && <ExternalLink href={livepulse.demo}>Live Demo</ExternalLink>}
            <Link href="/engineering/livepulse" className="text-sm font-medium text-foreground hover:underline underline-offset-4">
              Full case study →
            </Link>
          </div>
        </div>
      </Section>

      <Section title="AgentForge">
        <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
          <p className="text-accent">{agentforge.subtitle}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{agentforge.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {agentforge.technologies.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {agentforge.demo && <ExternalLink href={agentforge.demo}>Live app</ExternalLink>}
            <ExternalLink href={links.agentforge.ops}>Ops dashboard</ExternalLink>
            {agentforge.github && <ExternalLink href={agentforge.github}>GitHub</ExternalLink>}
            <Link href="/engineering/agentforge" className="text-sm font-medium text-foreground hover:underline underline-offset-4">
              Full case study →
            </Link>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Deployed with no LLM key configured: the dashboard and deterministic verification/policy
            logic are real and live, but starting a full agent run honestly reports &quot;Integration
            unavailable&quot; rather than fake one.
          </p>
        </div>
      </Section>

      <Section title="LiveOps">
        <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
          <p className="text-accent">{liveops.subtitle}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{liveops.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {liveops.technologies.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {liveops.github && <ExternalLink href={liveops.github}>GitHub</ExternalLink>}
            {liveops.demo && <ExternalLink href={liveops.demo}>Live Demo</ExternalLink>}
            <Link href="/engineering/liveops" className="text-sm font-medium text-foreground hover:underline underline-offset-4">
              Full case study →
            </Link>
          </div>
        </div>
      </Section>

      <Section title="TalentMatch (Jobify)">
        <ProjectCard project={jobify} />
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/projects/jobify" className="text-sm font-medium text-accent hover:underline underline-offset-4">
            Read more →
          </Link>
          <Link href="/engineering/talentmatch" className="text-sm font-medium text-foreground hover:underline underline-offset-4">
            Full case study →
          </Link>
        </div>
      </Section>

      <Section title="Extensions of the LivePulse story">
        <div className="grid gap-6 sm:grid-cols-2">
          {others.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <Section title="Elsewhere">
        <p className="text-sm text-muted">
          More of my work, including production systems built at Sportradar, TSETMC, and earlier
          roles, is on{" "}
          <ExternalLink href={links.github}>GitHub</ExternalLink> and in the{" "}
          <Link href="/experience" className="text-accent hover:underline underline-offset-4">
            Experience
          </Link>{" "}
          section.
        </p>
      </Section>
    </>
  );
}
