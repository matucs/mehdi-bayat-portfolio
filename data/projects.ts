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
    slug: "agentforge",
    title: "AgentForge",
    subtitle: "Governed Autonomous Software Engineering Platform",
    description:
      "A LangGraph-orchestrated multi-agent system (Planner, Architect, Researcher, Developer, Reviewer, QA, Security) where no agent's approval is the final word. A deterministic verification gate (real type-checking, linting, test execution, static security scanning) and a risk-based human-approval policy engine decide what actually merges, proven with failure-injection demos where a real failing test overrides a simulated Reviewer approval.",
    technologies: ["FastAPI", "LangGraph", "PostgreSQL", "SQLAlchemy", "Next.js", "TypeScript", "Docker", "OpenTelemetry", "Anthropic/OpenAI APIs"],
    github: links.agentforge.github,
    demo: links.agentforge.live,
    featured: true,
  },
  {
    slug: "liveops",
    title: "LiveOps",
    subtitle: "Real-Time Event Processing & Workflow Platform",
    description:
      "A modular-monolith event-driven platform: idempotent ingest, a transactional outbox, a Postgres-backed event bus, a workflow engine running real sagas with orchestrated compensation, CQRS projections, and a live dashboard with a working chaos panel — with a load test that found and fixed two real bottlenecks, including one fix that was tried and measured as not helping.",
    technologies: ["TypeScript", "Fastify", "Next.js", "PostgreSQL", "Docker", "Server-Sent Events"],
    github: links.liveops.github,
    // demo: filled in once the Oracle VM deployment is confirmed live.
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
  { capability: "Distributed systems", evidence: "LivePulse's event-driven ingestion → change detection → Kafka pipeline; LiveOps's transactional outbox and Postgres-backed event bus" },
  { capability: "Workflow orchestration & sagas", evidence: "LiveOps's WorkflowEngine — a real multi-step saga with orchestrated compensation, verified to roll back in exact reverse order via a forced permanent step failure" },
  { capability: "Real-time systems", evidence: "WebSocket gateway architecture, validated by the Scaling Demo's real fan-out measurements; LiveOps's live SSE dashboard" },
  { capability: "Messaging", evidence: "Kafka topics and consumer groups (LivePulse), RabbitMQ event bus (Sportradar), a Postgres-backed event bus with independent consumer groups (LiveOps)" },
  { capability: "Distributed state", evidence: "Redis cache-aside and pub/sub design with documented failure modes (ADR-004)" },
  { capability: "Reliability", evidence: "A real production incident investigated and fixed — the WebSocket subscribe race; LiveOps's crash-resume tests (killed the live process mid-batch, mid-workflow, and pre-dispatch)" },
  { capability: "Performance engineering", evidence: "LiveOps's load test found and fixed two real bottlenecks — including one candidate fix measured and found not to help, kept in the record" },
  { capability: "Architecture", evidence: "8 accepted ADRs plus the interactive Architecture Lab exploring them; 8 more ADRs on LiveOps" },
  { capability: "Testing", evidence: "Unit, integration, and Playwright E2E tests across LivePulse and TalentMatch, wired into CI" },
  { capability: "Scalability", evidence: "Scaling Demo — measured, not assumed, fan-out results across two real instances" },
  { capability: "Cloud", evidence: "AWS ECS/Fargate, DynamoDB, SQS/SNS, Cognito, CDK/Terraform used in production at Sportradar and in TalentMatch's deployment config" },
  { capability: "AI Engineering", evidence: "Team-built production RAG pipeline on AWS Bedrock for a Sportradar project (emBET); AI-assisted implementation workflow across personal projects" },
  { capability: "Agentic AI systems", evidence: "AgentForge: a LangGraph multi-agent pipeline gated by a deterministic verification/policy engine, not by LLM judgment alone" },
];
