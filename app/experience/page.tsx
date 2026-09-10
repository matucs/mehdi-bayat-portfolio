import type { Metadata } from "next";
import { Section, Tag } from "@/components/ui";
import { experience, education, languages } from "@/data/experience";
import { links } from "@/data/links";

export const metadata: Metadata = {
  title: "Experience",
  description: "Ten years of professional software engineering across stock exchanges, live sports betting, port logistics, and banking.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-8 pt-16 sm:pt-20">
        <p className="mono text-xs uppercase tracking-widest text-accent">Experience</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Professional Experience</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Ten years, mostly in environments where latency is measured in milliseconds and downtime
          costs real money: stock exchanges, live sports betting, port logistics, and banking.
        </p>
        <a href={links.cv} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-medium text-accent hover:underline underline-offset-4">
          Download full CV →
        </a>
      </section>

      <Section title="Roles">
        <div className="space-y-10">
          {experience.map((job) => (
            <div key={job.company} className="border-l-2 border-border pl-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold">
                  {job.role} <span className="text-muted">· {job.company}</span>
                </h3>
                <span className="mono text-xs text-muted whitespace-nowrap">{job.dates}</span>
              </div>
              <p className="mono text-xs text-muted">{job.location}</p>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{job.summary}</p>
              <ul className="mt-3 space-y-2">
                {job.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm leading-relaxed text-muted">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {job.technologies.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Education">
        <div className="grid gap-4 sm:grid-cols-2">
          {education.map((e) => (
            <div key={e.degree} className="rounded-lg border border-border bg-surface p-5">
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-medium">{e.degree}</p>
                <span className="mono text-xs text-muted whitespace-nowrap">{e.dates}</span>
              </div>
              <p className="text-sm text-accent">{e.school}</p>
              {e.detail && <p className="mt-2 text-sm leading-relaxed text-muted">{e.detail}</p>}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Languages">
        <ul className="flex flex-wrap gap-6 text-sm text-muted">
          {languages.map((l) => (
            <li key={l.language}>
              <span className="font-medium text-foreground">{l.language}:</span> {l.level}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
