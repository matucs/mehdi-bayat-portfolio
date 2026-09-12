export const talentmatchOverview = {
  name: "TalentMatch",
  tagline: "Production-oriented job matching backend",
  description:
    "A modular monolith split by execution model, not by business entity: a synchronous Fastify API owns request/response use cases, an asynchronous BullMQ worker owns retryable side effects, and both consume the same domain and infrastructure contracts from shared workspace packages. MongoDB is the durable source of truth; OpenSearch is a rebuildable read model that can always be recreated from it.",
  status:
    "Deployed and live, not a local-only demo: a self-hosted instance runs the real API against real MongoDB/Redis/OpenSearch, alongside a full AWS ECS/Fargate deployment configuration (immutable per-commit images, OIDC-authenticated GitHub Actions deploys, Secrets Manager injection) for the production target.",
};

export const engineeringHighlights = [
  "Two deployables from one codebase: publish/delete write a durable indexSync marker in the same MongoDB update as the state transition, so an index command surviving a crash is a property of the data model, not of Redis staying up.",
  "Idempotent applications enforced by a unique (candidateId, idempotencyKey) index plus a SHA-256 request fingerprint. A replayed request returns the original result; a reused key with different input returns a real 409, not a silent overwrite.",
  "Deterministic candidate scoring (skills, location, salary, experience) against an immutable job snapshot captured at application time, so a later job edit or deletion can never change or break an already-computed score.",
  "Search cache coherence via a generation counter, not a TTL alone: any mutation increments search:version, old query keys become unreachable without an unsafe Redis KEYS scan, and the index worker invalidates again after OpenSearch actually confirms the write.",
  "A dead-letter queue for indexing failures after 5 retries with exponential backoff. Replay is safe because OpenSearch upserts/deletes are idempotent and the worker always rereads MongoDB rather than trusting the queued payload.",
  "Guarded atomic transitions: every MongoDB update includes the expected current state in its filter, so two concurrent publish requests can't both win, and a missing resource (404) is distinguished from an invalid transition (409).",
  "OIDC bearer-JWT auth in production (signature/issuer/audience/lifetime verified via JWKS); Redis-backed rate limiting that fails open on a Redis error, because availability matters more once requests are already being authenticated cryptographically.",
  "Liveness and readiness are deliberately different questions: liveness excludes external dependencies so an outage never causes a restart loop; readiness checks Mongo/Redis/OpenSearch concurrently and pulls the task from traffic without killing the process.",
];

export const knownTradeOff = {
  title: "The reindex command is simple on purpose, and that has a real cost",
  detail:
    "OpenSearch is explicitly a read model: job detail reads always go to MongoDB, so a stale or missing search document can never redefine domain truth. But the current reindex command clears the live index and re-enqueues every published job ID, which creates a real window where search results are reduced while it catches up. This is documented in docs/architecture.md as an accepted MVP-scale trade-off, not discovered after the fact. Production-scale reindexing would build a versioned physical index, verify document counts, and atomically swap a read alias instead, a real, named next step, not a silent gap.",
};

export const decisions = [
  { number: "01", title: "Two deployables, one codebase", summary: "Separating the API and worker protects request latency and allows independent scaling, while a pnpm monorepo keeps changes atomic and avoids a service-per-domain operational burden neither the team size nor the traffic justifies." },
  { number: "02", title: "Infrastructure clients connect before listen", summary: "The API fails startup rather than briefly advertising readiness with a broken dependency graph. Appropriate because every planned use case genuinely requires Mongo/Redis/OpenSearch, not an optional dependency being treated as mandatory." },
  { number: "03", title: "OpenSearch as a read model, never a source of truth", summary: "Search documents may lag MongoDB and can always be recreated from it; job detail endpoints read MongoDB directly so a missing or stale index entry degrades search, never correctness." },
  { number: "04", title: "Zod at every trust boundary", summary: "TypeScript types alone provide no runtime safety. Environment variables and request payloads are parsed with Zod before use, and only the parsed output is allowed into application services." },
  { number: "05", title: "Guarded atomic transitions over optimistic assumptions", summary: "State-changing MongoDB updates include the expected current state in their own filter, so the database itself, not application logic, is the concurrency boundary between two racing requests." },
];

export const measuredMetrics = [
  { label: "Test suite (run in this environment)", value: "46 passed, 8 skipped (the skips are real Mongo/Redis/OpenSearch integration tests needing live infra)", kind: "measured" as const },
  { label: "TypeScript typecheck", value: "Clean across all 6 workspace packages/apps", kind: "measured" as const },
  { label: "Indexing retry policy", value: "5 attempts, exponential backoff, then a diagnostic dead-letter queue entry", kind: "measured" as const },
  { label: "Search cache TTL", value: "120 seconds, invalidated immediately on mutation via a generation counter", kind: "measured" as const },
  { label: "Rate limit default", value: "100 requests / 60s per actor or IP, fails open on a Redis error", kind: "measured" as const },
  { label: "Documented architecture decisions", value: "5, in docs/architecture.md", kind: "measured" as const },
];
