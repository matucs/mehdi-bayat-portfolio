import { links } from "./links";

export const livepulseOverview = {
  name: "LivePulse",
  tagline: "Real-Time Sports Intelligence Platform",
  description:
    "A continuously running, event-driven sports data platform built on real football/soccer data — not a simulator. LivePulse ingests live match data from a real external provider (API-Football), detects meaningful changes, publishes internal domain events, and pushes real-time updates to the browser over WebSockets, backed by PostgreSQL for durable history, Redis for live state, and Kafka as the internal event backbone.",
  status:
    "Live and running against real data, not a local-only demo: ingestion, change detection, Kafka, WebSockets, observability, and automated testing are all built and verified against real API-Football and football-data.org data. An AI-features phase is deliberately deferred and kept separate from the core pipeline.",
};

export const engineeringHighlights = [
  "Event-driven processing: ingestion polls a real external API, a Change Detector emits domain events only when something actually changed, verified by a unit test asserting an unchanged poll produces zero events.",
  "Real-time delivery over WebSockets: a subscribe/snapshot/update protocol where the gateway bridges Redis pub/sub to connected clients, with resubscribe-on-reconnect so no missed-update bug class exists.",
  "Kafka as the internal event backbone: six matchId-keyed topics feeding three independent consumer groups (scores, stats, alerts), so a slow consumer in one group can never block another.",
  "Two real event bus implementations behind one interface: KafkaEventBus for local Docker Compose, RedisStreamsEventBus for the actual free-tier production deployment.",
  "PostgreSQL as the source of truth, written synchronously by ingestion so durable history never depends on Kafka or Redis being healthy.",
  "Redis used for speed, never for correctness: every cached value carries a lastUpdatedAt timestamp and falls back to Postgres on a miss.",
  "External sports API ingestion under a real 100-requests/day free-tier budget, with tiered polling intervals and a circuit breaker.",
  "Observability wired to real call sites, not stubbed: Kafka consumer lag from the real admin API, OpenTelemetry tracing, Prometheus metrics, and a live engineering ops dashboard.",
  "Automated testing across unit, integration (real Postgres/Redis containers), and Playwright E2E — CI runs lint, tests, and a fixture-seeded E2E job on every push.",
];

export const incidents = [
  {
    id: "websocket-subscribe-race",
    title: "The WebSocket subscribe race: OPEN doesn't mean subscribed",
    date: "2026-09-09",
    testFailed:
      "A Playwright E2E test published a Redis update once the client's WebSocket reached readyState OPEN, then asserted the new score appeared. It passed reliably on a local machine but failed consistently in CI — the page kept showing the original fixture score.",
    initialAssumption:
      "The failure looked like a timing/flakiness issue, so the first attempt bumped the assertion timeout to 10 seconds. It didn't help — nothing was slow, something was simply lost.",
    investigation:
      "The CI trace's actual page snapshot showed the pre-update score still on screen, ruling out 'just needs a longer timeout' before that fix was even tried.",
    rootCause:
      "A client socket reaching readyState OPEN only proves the WebSocket handshake finished — it says nothing about whether the server has issued its Redis SUBSCRIBE for that match's channel yet, which happens asynchronously after the server receives the client's subscribe message. The test published to Redis in exactly that window. Redis pub/sub has no delivery guarantee for a message published before a subscriber exists (a documented ADR-006 tradeoff) — CI's colder first database query widened the race window enough to lose it consistently, where it was apparently always won locally.",
    fix:
      "Changed the test to wait for the actual match:snapshot message — which the server sends only after it has subscribed to Redis — instead of waiting on the client socket's readyState. No application code changed; the gateway's subscribe-then-snapshot ordering was already correct, only the test's synchronization assumption was wrong.",
    verification:
      "6/6 runs passed locally across 3 repeated executions against a freshly seeded, isolated backend mirroring CI's own setup, each completing in under a second — where the old race-prone version needed the full retry-and-timeout path to occasionally pass at all.",
    lesson:
      "A connection being OPEN is not the same claim as 'the server-side subscription this connection depends on is ready.' Any test or client that synchronizes on transport-level readiness instead of an application-level confirmation is racing the exact gap between the two — wait for the signal that means what you actually need it to mean.",
    links: [
      { label: "Fix commit a72e618", url: `${links.livepulse.github}/commit/a72e618998b3d947609febb9436f7674d00b25a8` },
      { label: "ADR-006: WebSocket architecture", url: `${links.livepulse.github}/blob/main/docs/adr/ADR-006-websocket-architecture.md` },
    ],
  },
];

export const decisions = [
  { number: "ADR-001", title: "Sports API Selection", summary: "API-Football chosen on its free tier behind a provider abstraction — the only evaluated provider offering genuine live in-play data at zero cost." },
  { number: "ADR-002", title: "REST Polling Strategy", summary: "Batched, tiered polling designed around a real 100-requests/day budget rather than assuming a faster refresh rate was affordable." },
  { number: "ADR-003", title: "Kafka Architecture", summary: "Six matchId-keyed topics and three consumer groups behind an EventBus interface — an intentional architectural choice, honestly documented as more than the current ~100-event/day workload needs." },
  { number: "ADR-004", title: "Redis Strategy", summary: "A documented key schema and cache-aside strategy where Redis speeds things up but Postgres remains the correctness fallback." },
  { number: "ADR-005", title: "PostgreSQL Schema", summary: "A normalized, provider-independent schema with deterministic UUIDs so swapping data providers never requires a schema change." },
  { number: "ADR-006", title: "WebSocket Architecture", summary: "A subscribe/snapshot/update protocol over Redis pub/sub, designed to let gateway instances scale horizontally without knowing about each other." },
  { number: "ADR-007", title: "Provider Abstraction", summary: "A SportsDataProvider interface that keeps a provider's response shape from becoming the domain model, validated when a second provider was added for standings." },
  { number: "ADR-008", title: "Free Deployment Strategy", summary: "Portfolio Mode topology (single process, Neon Postgres, Upstash Redis, Redis Streams) chosen after discovering several \"cardless\" free tiers actually required a card in practice." },
];

export const scalingStages = [
  {
    stage: "Stage 1 — Current",
    kind: "measured" as const,
    description:
      "Portfolio Mode, as actually deployed at €0/month: ingestion, API, and WebSocket gateway run as one Node process on a single Oracle Cloud Always Free VM, with Neon Postgres, Upstash Redis, and Redis Streams as the event transport.",
  },
  {
    stage: "Stage 2 — Higher Traffic",
    kind: "projection" as const,
    description:
      "Not built, not measured. The first moves as real traffic grows: split ingestion / API / WebSocket-gateway into separate deployables, run multiple backend instances behind a load balancer, and switch the event bus to managed Kafka via an existing config flag — no code change required.",
  },
  {
    stage: "Stage 3 — Large Scale",
    kind: "projection" as const,
    description:
      "A documented, not-built production topology: a load balancer in front of N API instances, a right-sized Kafka cluster, independently scaled consumer groups, a Redis cluster, PostgreSQL read replicas, and dedicated WebSocket gateway instances behind sticky-session routing. No performance numbers are claimed at this stage.",
  },
];

export const scaleDemoResults = {
  claim:
    "LivePulse's own engineering review named a real gap: the WebSocket gateway's horizontal-scaling story was a design, never measured — the project has only ever run exactly one instance in production.",
  method:
    "The Scale Demo runs two real, unmodified LivePulse backend processes against one shared Redis, opens real WebSocket connections split across both instances, subscribes them to the same real match, publishes one update to the exact Redis channel a Kafka/Redis-Streams consumer would use, and measures whether clients on both instances receive it.",
  measured: [
    { connections: "80 (40 + 40)", delivered: "80/80", bothInstances: true, p50: "6.0 ms", p99: "6.9 ms" },
    { connections: "300 (150 + 150)", delivered: "300/300", bothInstances: true, p50: "11.5 ms", p99: "13.7 ms" },
  ],
  validates:
    "ADR-006's fan-out design — consumers PUBLISH to a per-match Redis channel, each gateway instance independently subscribes only while it has a local client interested — works correctly across real, separate processes, with 100% delivery both times.",
  doesNotValidate: [
    "Single machine: both gateway instances and the load generator ran on one host, not separate machines or a real network.",
    "Nowhere near the documented 500-connections-per-instance ceiling — this tested 40–150 per instance, not a saturation test.",
    "LivePulse's own public deployment still runs exactly one backend process — this result validates the design out-of-band; it is not a claim about what's running in production.",
  ],
};

export const measuredMetrics = [
  { label: "Messages produced by one real live-poll tick", value: "48 match.updated · 34 score-changed · 28 status-changed · 2 event-created", kind: "measured" as const },
  { label: "Unit tests", value: "52 tests (backend/test/unit)", kind: "measured" as const },
  { label: "Standings rows reconciled across two providers", value: "96 rows across 5 leagues", kind: "measured" as const },
  { label: "WebSocket connection ceiling (Portfolio Mode)", value: "500 concurrent connections — a configured limit, not a benchmark result", kind: "measured" as const },
  { label: "API-Football daily request budget", value: "100 requests/day, 10/minute (free tier)", kind: "measured" as const },
  { label: "Architecture Decision Records", value: "8 ADRs, all accepted", kind: "measured" as const },
];

export const principles = [
  "Separate external polling from internal event-driven processing.",
  "Detect changes before publishing events — an unchanged poll produces zero events, covered by a dedicated test.",
  "Keep durable state in PostgreSQL, independent of the event pipeline's health.",
  "Use Redis for low-latency shared state, but never let correctness depend on it.",
  "Decouple producers and consumers so one slow reaction never blocks another.",
  "Design WebSocket clients for reconnects, not just the happy path.",
  "Treat eventual consistency explicitly — every cached value carries a real freshness timestamp.",
  "Test failure modes, not just happy paths.",
  "Prefer evidence over assumption — verify against real data before documenting.",
  "Keep architecture proportional to requirements, and say so plainly when it isn't.",
];
