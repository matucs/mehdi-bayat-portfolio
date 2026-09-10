import { links } from "./links";

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "livepulse",
    title: "LivePulse",
    subtitle: "Real-Time Sports Intelligence Platform",
    description:
      "An event-driven sports data platform ingesting real live football data, detecting changes, and pushing real-time updates to the browser over WebSockets — backed by Kafka, Redis, and PostgreSQL.",
    technologies: ["Next.js", "TypeScript", "Fastify", "Kafka", "Redis", "PostgreSQL", "WebSockets", "OpenTelemetry", "Playwright"],
    github: links.livepulse.github,
    demo: links.livepulse.live,
    featured: true,
  },
  {
    slug: "architecture-lab",
    title: "Architecture Lab",
    subtitle: "Interactive exploration of the LivePulse architecture",
    description:
      "A companion Next.js app that walks through LivePulse component-by-component: the real event flows, the 8 accepted ADRs, the real production incident, and measured-vs-projected scaling — built to make the reasoning behind LivePulse inspectable, not just the code.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: links.architectureLab.github,
    featured: false,
  },
  {
    slug: "scaling-demo",
    title: "Scaling Demo",
    subtitle: "A real load test for one specific architectural claim",
    description:
      "A standalone tool that runs two real, unmodified LivePulse backend processes against shared Redis and measures whether the WebSocket gateway's fan-out design actually delivers updates across both instances — closing a gap LivePulse's own engineering review named honestly.",
    technologies: ["TypeScript", "Redis", "WebSockets", "ioredis"],
    github: links.scalingDemo.github,
    featured: false,
  },
  {
    slug: "jobify",
    title: "TalentMatch",
    subtitle: "Production-oriented job matching backend",
    description:
      "A modular-monolith backend for publishing jobs and matching candidates: a synchronous Fastify API plus an asynchronous BullMQ worker, with MongoDB as the source of truth, OpenSearch as a rebuildable read model, deterministic candidate scoring, idempotent applications, and a full AWS ECS/Fargate deployment configuration.",
    technologies: ["Fastify", "TypeScript", "MongoDB", "Redis", "BullMQ", "OpenSearch", "AWS ECS/Fargate", "Docker", "OIDC"],
    github: links.jobify.github,
    demo: links.jobify.live,
    featured: true,
  },
];

export interface EvidenceRow {
  capability: string;
  evidence: string;
}

export const engineeringEvidence: EvidenceRow[] = [
  { capability: "Distributed systems", evidence: "LivePulse's event-driven ingestion → change detection → Kafka pipeline" },
  { capability: "Real-time systems", evidence: "WebSocket gateway architecture, validated by the Scaling Demo's real fan-out measurements" },
  { capability: "Messaging", evidence: "Kafka topics and consumer groups (LivePulse), RabbitMQ event bus (Sportradar)" },
  { capability: "Distributed state", evidence: "Redis cache-aside and pub/sub design with documented failure modes (ADR-004)" },
  { capability: "Reliability", evidence: "A real production incident investigated and fixed — the WebSocket subscribe race" },
  { capability: "Architecture", evidence: "8 accepted ADRs plus the interactive Architecture Lab exploring them" },
  { capability: "Testing", evidence: "Unit, integration, and Playwright E2E tests across LivePulse and TalentMatch, wired into CI" },
  { capability: "Scalability", evidence: "Scaling Demo — measured, not assumed, fan-out results across two real instances" },
  { capability: "Cloud", evidence: "AWS ECS/Fargate, DynamoDB, SQS/SNS, Cognito, CDK/Terraform used in production at Sportradar and in TalentMatch's deployment config" },
  { capability: "AI Engineering", evidence: "Production RAG pipeline on AWS Bedrock (Sportradar); AI-assisted implementation workflow across personal projects" },
];
