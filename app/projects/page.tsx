import type { Metadata } from "next";
import Link from "next/link";
import { Section, ExternalLink, Tag } from "@/components/ui";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import { links } from "@/data/links";

export const metadata: Metadata = {
  title: "Projects",
  description: "LivePulse and its Architecture Lab and Scaling Demo, plus TalentMatch — a production-oriented job matching backend.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const livepulse = projects.find((p) => p.slug === "livepulse")!;
  const jobify = projects.find((p) => p.slug === "jobify")!;
  const others = projects.filter((p) => p.slug !== "livepulse" && p.slug !== "jobify");

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

      <Section title="TalentMatch (Jobify)">
        <ProjectCard project={jobify} />
        <Link href="/projects/jobify" className="mt-4 inline-block text-sm font-medium text-accent hover:underline underline-offset-4">
          Read more →
        </Link>
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
