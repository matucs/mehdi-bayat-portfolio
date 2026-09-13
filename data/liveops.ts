import { links } from "./links";

export const liveopsOverview = {
  name: "LiveOps",
  tagline: "Real-Time Event Processing & Workflow Platform",
  description:
    "A modular-monolith event-driven platform: idempotent ingest, a transactional outbox, a Postgres-backed event bus with independent consumer groups, a workflow engine running real multi-step sagas with orchestrated compensation, CQRS projections, and a live dashboard with a working chaos panel. Built deliberately without Kafka, Redis, or service extraction on day one — each is a named, evaluated trade-off (see the ADRs below), not an omission.",
  status:
    "All seven planned V1 phases complete and verified against a real running stack, not asserted: the live process was killed mid-batch, mid-workflow, and pre-dispatch to prove crash recovery; a real saga was forced through full backward compensation; a real load test found and fixed two production-shaped bottlenecks, including one candidate fix that was implemented, measured, and found to do nothing — kept in the record rather than edited out.",
};

export const engineeringHighlights = [
  "Transactional outbox, not a dual write: the business row and its outbox row commit in the same transaction, so a crash between 'write event' and 'publish' is impossible by construction, verified by killing the live process mid-batch.",
  "One lease-based recovery pattern (locked_until, not a held transaction or in-memory registry), used identically by the outbox publisher, the event bus, and the workflow engine — a restart needs no separate recovery scan, it just reclaims whatever a dead lease left behind.",
  "A real saga (order-fulfillment, 5 steps) with orchestrated compensation: forcing a step to exhaust its retries triggers backward compensation in exact reverse order, correctly skipping any step that never completed forward — verified against the persisted step_executions timeline, not just the final status.",
  "Idempotency enforced per layer, not by one generic mechanism: a unique (tenant_id, event_id) constraint at ingest, a partial unique index for workflow triggering, and a handler-specific constraint for each consumer's own side effect.",
  "CQRS with its one exception named explicitly: the workflow-summary projection reads workflow_executions directly because the engine doesn't yet emit a per-step domain event — documented as a real simplification, not hidden behind the pattern's name.",
  "A live SSE dashboard with a working chaos panel: force a payment or shipment step to fail once (retries, then succeeds) or always (forces full compensation) and watch it happen, live, without touching a terminal.",
  "A real cross-tenant isolation bug found and fixed before shipping: the dead-letters dashboard route's first draft had no tenant filter at all, on a table with no tenant_id column of its own — fixed with a join, documented as the exact failure mode the multi-tenancy ADR exists to name.",
];

export const incidents = [
  {
    id: "projection-worker-n-plus-one",
    title: "A load test found the pipeline never caught up — an N+1 hiding at demo scale",
    date: "2026-09 (Phase 06)",
    testFailed:
      "A custom load test pushed a 3,000-event burst through ingest, then measured how long the async pipeline took to drain. Ingest itself scaled cleanly to ~3,700 req/s. But one consumer group, projection-worker, was still over 5,600 events behind a full 60 seconds later — draining at roughly 9 events per second, nowhere close to keeping pace with a pipeline that had just accepted thousands of events per second.",
    initialAssumption:
      "The obvious suspect was the transport — maybe Postgres itself couldn't keep up as a message queue under this load, which would have been read as early evidence that the Kafka migration planned for V2 was needed sooner than expected.",
    investigation:
      "Checked each of the three consumer groups' lag independently instead of treating 'the pipeline' as one thing: audit-log and workflow-trigger were both already at zero lag. Only projection-worker was behind — ruling out the transport itself and pointing at that one consumer's own code.",
    rootCause:
      "refreshWorkflowProjection was issuing one INSERT ... ON CONFLICT statement per changed workflow row, in a plain sequential loop, on every single tick. Invisible at demo scale (tens of rows). At load-test scale, with 3,000+ workflow executions touched per tick, this was 3,000+ sequential round trips competing for the same connection pool every other consumer group and the API shared.",
    fix:
      "Replaced the per-row loop with one bulk INSERT ... SELECT ... JOIN (VALUES ...) ON CONFLICT statement — the VALUES list is bounded by the number of distinct workflow definitions (currently one), not the number of executions, so the whole refresh became one round trip regardless of backlog size.",
    verification:
      "Before: still 5,600+ events behind after 60 seconds. After: a fresh, more than doubled load test (12,594 events) fully drained in 23.5–28 seconds. A second, downstream bottleneck (sequential rather than concurrent processing inside the workflow engine's own tick) was found the same way immediately after — including one candidate fix, raising a hardcoded batch size, that was implemented and measured as making no difference at all, which is recorded in the project's phase notes exactly as it happened.",
    lesson:
      "A per-row loop that's fine at the row counts you test with locally can become the dominant cost at the row counts a load test actually produces — and the fix is to check each independent stage of a pipeline separately before assuming the bottleneck is the most architecturally interesting-looking component (the transport), rather than the least (a loop).",
    links: [
      { label: "Phase 06 load test notes", url: `${links.liveops.github}/blob/main/docs/phase-06-notes.md` },
      { label: "worker.ts (the fix)", url: `${links.liveops.github}/blob/main/apps/api/src/modules/projections/worker.ts` },
    ],
  },
];

export const decisions = [
  { number: "ADR-001", title: "Modular Monolith First", summary: "One process, module boundaries enforced by folder + interface, not by network call — service extraction deferred to a specific, evaluated trigger rather than assumed inevitable." },
  { number: "ADR-002", title: "Postgres as the Event Bus", summary: "FOR UPDATE SKIP LOCKED behind an EventBus interface, with named trigger conditions for migrating to Kafka — a load test found the actual bottlenecks were application code, not the transport." },
  { number: "ADR-003", title: "Transactional Outbox", summary: "The business row and its outbox row commit in the same transaction, closing the exact gap between 'DB commit succeeds' and 'bus publish fails' that a naive dual write leaves open." },
  { number: "ADR-004", title: "Saga Orchestration, Not Choreography", summary: "A single WorkflowEngine owns step order and compensation order from one table, chosen because 'what has this execution done so far, and in what order should it be undone' needs one authoritative answer." },
  { number: "ADR-005", title: "Idempotency Enforced Per Layer", summary: "No single generic dedup mechanism — each layer (ingest, workflow triggering, each consumer's own side effect) enforces idempotency in the way specific to what it's actually protecting." },
  { number: "ADR-006", title: "CQRS, Scoped", summary: "Read models fed by their own consumer group, with a 250ms measured staleness bound and one documented exception rather than a purist claim the code doesn't actually meet." },
  { number: "ADR-007", title: "SSE Over WebSockets", summary: "The dashboard's traffic is one-directional, so Server-Sent Events avoid a stateful gateway component solving a bidirectional problem this system doesn't have." },
  { number: "ADR-008", title: "Multi-Tenancy: Shared Schema, One Chokepoint", summary: "Tenant resolution happens in exactly one function so cross-tenant leakage is a one-file audit — and names the real leak Phase 04 found and fixed on an operational table that felt lower-stakes than it was." },
];

export const scalingStages = [
  {
    stage: "V1 — Current",
    kind: "measured" as const,
    description:
      "A modular monolith on a single Postgres instance carries ingest, the outbox, the event bus, the workflow engine, and CQRS projections all in one process — measured at 3,446 req/s (p95 43.8ms) locally, with two real bottlenecks found and fixed by load testing rather than assumed away.",
  },
  {
    stage: "V2 — Planned",
    kind: "projection" as const,
    description:
      "Not yet built. OpenTelemetry tracing across the full outbox → bus → workflow path, a public deployment with per-visitor sandboxed chaos, and the Postgres → Kafka migration ADR-002 already names the trigger conditions for — re-measured against the same load test, before and after.",
  },
];

export const scaleDemoResults = {
  claim:
    "The plan's own targets called for measured numbers, not claimed ones — so the load test's job was to find where this specific implementation actually breaks, not to assume Kafka was needed before checking.",
  method:
    "A custom Node script (not k6/autocannon, since idempotency dedup would otherwise silently skew results) drove four waves of increasing concurrency against POST /api/v1/events with unique event IDs, then measured how long the async pipeline took to fully drain by polling every consumer group's checkpoint against the event log's max position.",
  measured: [
    { connections: "10", delivered: "200 req, 0 errors", bothInstances: true, p50: "16.1ms", p99: "80.1ms" },
    { connections: "25", delivered: "1,000 req, 0 errors", bothInstances: true, p50: "24.0ms", p99: "60.2ms" },
    { connections: "50", delivered: "2,000 req, 0 errors", bothInstances: true, p50: "20.3ms", p99: "55.8ms" },
    { connections: "100", delivered: "3,000 req, 0 errors", bothInstances: true, p50: "28.2ms", p99: "54.3ms" },
  ],
  validates:
    "Ingest meets the plan's stated local target (1,000 events/sec, p95<200ms) comfortably — 3,446 req/s at p95 43.8ms with zero errors. Two real downstream bottlenecks (a projection-worker N+1, and sequential processing in the workflow engine) were found and fixed; the fixed pipeline drains a 12,594-event backlog in ~23.5 seconds with zero workflows left incomplete.",
  doesNotValidate: [
    "A single unpooled Node process against one Postgres container with no resource limits — a local result, not a claim about any specific production instance size.",
    "The plan's 10,000+ events/sec figure is stated as a V2 architectural target for the Kafka-based migration, not a number this V1 hardware was tested against.",
  ],
};

export const measuredMetrics = [
  { label: "Sustained ingest throughput (100 concurrent, 0 errors)", value: "3,446 req/s · p95 43.8ms · p99 54.3ms", kind: "measured" as const },
  { label: "Full pipeline drain after a 12,594-event burst", value: "~23.5s, before: never finished within 60s at a smaller volume", kind: "measured" as const },
  { label: "Crash-resume tests actually run (kill -9 on the live process)", value: "4 — mid-outbox-batch, pre-dispatch, mid-saga, and post-compensation", kind: "measured" as const },
  { label: "Real bugs found and fixed during build/test, not invented for the writeup", value: "4 — a broken idempotency constraint, a stale error field, a cross-tenant leak, an N+1 query", kind: "measured" as const },
  { label: "Architecture Decision Records", value: "8 ADRs, each defending a decision the build actually had two live options for", kind: "measured" as const },
  { label: "A fix that was tried and measured as not helping", value: "1 — raising a batch size alone; recorded, not edited out", kind: "measured" as const },
];
