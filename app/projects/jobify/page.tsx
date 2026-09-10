import type { Metadata } from "next";
import { Section, Tag } from "@/components/ui";

export const metadata: Metadata = {
  title: "TalentMatch — Job Matching Backend",
  description:
    "A production-oriented backend for publishing jobs and matching candidates: Fastify API, BullMQ worker, MongoDB, OpenSearch, and AWS ECS deployment.",
  alternates: { canonical: "/projects/jobify" },
};

const engineeringPoints = [
  "Modular monolith split into two deployable processes (synchronous Fastify API, asynchronous BullMQ worker) instead of a premature microservices split.",
  "MongoDB as the durable source of truth; OpenSearch as a rebuildable read model that is never treated as authoritative.",
  "Idempotent job applications enforced by an Idempotency-Key header and a database uniqueness constraint, not just an application-level check.",
  "Deterministic candidate scoring (skills, location, salary, experience) run asynchronously, pollable via a Location header.",
  "Redis-backed rate limiting that fails open on Redis errors, so an infrastructure incident degrades gracefully instead of causing a full outage.",
  "Dead-letter queues for search indexing and scoring, with a CLI to inspect and safely replay them after fixing the root cause.",
  "OIDC bearer-JWT authentication and authorization in production, with role-scoped access for employers and candidates.",
  "Full AWS ECS/Fargate deployment: separate immutable images for API and worker, private tasks behind an HTTPS ALB, Secrets Manager injection, autoscaling, and GitHub Actions OIDC deploys with immutable commit-SHA images.",
];

export default function JobifyPage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-8 pt-16 sm:pt-20">
        <p className="mono text-xs uppercase tracking-widest text-accent">Project</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">TalentMatch</h1>
        <p className="mt-2 text-lg text-muted">Production-oriented job matching backend</p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
          TalentMatch is a backend for publishing jobs and matching candidates, structured as a
          modular monolith with two deployable processes: a synchronous Fastify API and an
          asynchronous BullMQ worker. Job lifecycle management, search, caching, idempotent
          applications, deterministic scoring, production observability, CI/CD, Docker, and AWS
          ECS configuration are all implemented.
        </p>
      </section>

      <Section title="What it demonstrates">
        <ul className="grid gap-4 sm:grid-cols-2">
          {engineeringPoints.map((point) => (
            <li key={point} className="flex gap-3 rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed text-muted">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              {point}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Technology">
        <div className="flex flex-wrap gap-1.5">
          {[
            "Fastify", "TypeScript", "MongoDB", "Redis", "BullMQ", "OpenSearch",
            "Zod", "Vitest", "Docker", "AWS ECS/Fargate", "CloudFormation", "GitHub Actions", "OIDC",
          ].map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </Section>
    </>
  );
}
