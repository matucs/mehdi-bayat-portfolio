import Link from "next/link";
import { links } from "@/data/links";

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-20 sm:pt-28">
      <p className="mono text-xs uppercase tracking-widest text-accent">Vienna, Austria</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Mehdi Bayat</h1>
      <p className="mt-3 text-lg text-muted sm:text-xl">
        Senior Full-Stack Engineer <span className="text-border">·</span> Distributed Systems{" "}
        <span className="text-border">·</span> Cloud &amp; AI
      </p>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/90 sm:text-lg">
        I build real-time, scalable software and use AI to accelerate engineering
        without outsourcing engineering judgment.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/engineering/livepulse"
          className="rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          View LivePulse
        </Link>
        <a
          href={links.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-2"
        >
          GitHub
        </a>
        <a
          href={links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-2"
        >
          LinkedIn
        </a>
        <a
          href={links.cv}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-2"
        >
          Download CV
        </a>
      </div>
    </section>
  );
}
