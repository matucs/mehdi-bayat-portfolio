import type { Metadata } from "next";
import { Section } from "@/components/ui";
import { links } from "@/data/links";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Mehdi Bayat.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-8 pt-16 sm:pt-20">
        <p className="mono text-xs uppercase tracking-widest text-accent">Contact</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Get in touch</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Vienna, Austria. Open to Senior Software Engineer, Senior Full-Stack Engineer, and
          Software/Solution Architect conversations.
        </p>
      </section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={links.email}
            className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent/50"
          >
            <p className="mono text-xs uppercase tracking-widest text-muted">Email</p>
            <p className="mt-2 font-medium">mehdi.byt@gmail.com</p>
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent/50"
          >
            <p className="mono text-xs uppercase tracking-widest text-muted">LinkedIn</p>
            <p className="mt-2 font-medium">linkedin.com/in/mehdibayat</p>
          </a>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent/50"
          >
            <p className="mono text-xs uppercase tracking-widest text-muted">GitHub</p>
            <p className="mt-2 font-medium">github.com/matucs</p>
          </a>
          <a
            href={links.cv}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent/50"
          >
            <p className="mono text-xs uppercase tracking-widest text-muted">CV</p>
            <p className="mt-2 font-medium">Download PDF</p>
          </a>
        </div>
      </Section>
    </>
  );
}
