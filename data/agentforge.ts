import { links } from "./links";
import type { Incident } from "@/components/IncidentCard";

export const agentforgeOverview = {
  name: "AgentForge",
  tagline: "Governed Autonomous Software Engineering Platform",
  description:
    "A LangGraph-orchestrated multi-agent system — Planner, Architect, Researcher, Developer, Reviewer, QA, Security — where no agent's output is trusted by default. Every change a real LLM agent proposes has to pass a deterministic Verification Gate (real type-checking, linting, test execution, static security scanning) and a risk-based Policy Engine before it can merge, and neither of those two gates contains a single LLM call.",
  status:
    "All 12 planned phases complete and verified against a real running stack: real LLM calls through a provider-agnostic Anthropic/OpenAI abstraction, real git operations, real GitHub PR creation, a real Next.js dashboard, and four failure-injection demos that prove the deterministic gate overrides an incorrect simulated approval — not asserted, run and observed.",
};

export const engineeringHighlights = [
  "Core principle enforced in code, not just claimed: the Reviewer's approval is one more artifact in shared state, never the final decision — a separate Verification Gate module contains zero LLM calls (ADR-003).",
  "A real LangGraph StateGraph with conditional retry edges: a failed real test or a high-severity Reviewer finding sends control back to the Developer, capped at MAX_AGENT_ITERATIONS so nothing loops forever.",
  "Postgres-backed checkpointing (AsyncPostgresSaver) keyed by run_id, real workflow timeouts via asyncio.wait_for, and real per-run cost-budget enforcement computed from actual provider token usage — not estimated.",
  "Risk-based policy engine (ADR-004) classifies real changed file paths and real diff content — a database migration is high risk, a docs-only change is low risk — enforced server-side so a frontend can never bypass it by simply not rendering an approval prompt.",
  "QA and Security agents are deterministic, not LLM calls: QA runs the real project's test suite via subprocess, Security runs a real regex scan for secret-shaped strings and risky constructs.",
  "Failure-injection demos construct real disposable git repos with a genuinely broken function, a genuinely hardcoded AWS-key-shaped secret, and a genuine Alembic migration file — then run the real deterministic pipeline against each and check the actual outcome.",
  "Real observability: structured JSON logs, OpenTelemetry spans per agent node, and Prometheus-format metrics computed live from the database at request time, never a stale counter.",
  "An evaluation harness and an n8n/Slack webhook integration both reuse the exact same orchestration entrypoint a live API-triggered run uses — no separate 'demo mode' code path anywhere in the system.",
];

export const bugs: Incident[] = [
  {
    id: "structlog-event-collision",
    title: "A logging call silently swallowed the real crash, hanging every run forever",
    date: "2026-09 (Phase 8)",
    testFailed:
      "Every orchestration node was wrapped with a new instrumentation decorator to record a real span, a structured log line, and a database ToolCall row per execution. Immediately after, timeout-sensitive orchestration tests started failing — runs that used to finish were now hanging at status=\"running\" until the test's own timeout gave up.",
    initialAssumption:
      "The first suspicion was a deadlock in the new database write inside the decorator (an extra session/commit added to every node), since that was the most recently added I/O.",
    investigation:
      "Instrumenting further and re-running showed the wrapped node's own real exception was never reaching the orchestrator at all — something inside the decorator itself was raising a second, different exception in its `finally` block, and that second exception was the one actually propagating (and being silently absorbed by the graph's own error handling), not the original one.",
    rootCause:
      "structlog's bound logger consumes its first positional argument as the log call's own `event` name. The decorator's log call passed the agent name positionally *and* an explicit `event=...` keyword for a different purpose, producing `TypeError: got multiple values for argument 'event'` — inside a `finally` block, which meant this new TypeError replaced whatever real exception the node itself had raised, and the caller only ever saw the logging bug, never the underlying failure.",
    fix:
      "Removed the conflicting `event=` keyword from every structlog call site that also relied on the positional event name; introduced `event_name=` as the keyword to use whenever a log line needs to name an application-level event distinct from the log call's own event string. The same class of bug recurred narrowly in a later phase's webhook notifier and was caught immediately by the test suite, before it ever reached a live run, using the exact same fix.",
    verification:
      "Re-ran the full orchestration test suite after the fix: every timeout-sensitive test that had started failing passed again, and a run's real terminal status (completed/blocked/awaiting_approval) was reachable again instead of hanging at \"running\" indefinitely.",
    lesson:
      "A `finally` block that itself can throw is a place where the *original* exception can silently disappear — the second exception wins, and nothing about that is visible from the call site. Caught here not by code review but because a downstream test suite's behavior changed the moment this was wired in; the fix generalizes to any logging/tracing wrapper added around existing error-handling paths.",
    links: [
      { label: "Phase 8 commit 687b3e8", url: `${links.agentforge.github}/commit/687b3e8` },
      { label: "instrumentation.py", url: `${links.agentforge.github}/blob/main/backend/app/observability/instrumentation.py` },
    ],
  },
];

export const decisions = [
  { number: "ADR-001", title: "LangGraph for Agent Orchestration", summary: "A real LangGraph StateGraph — not a hand-rolled loop — with Postgres checkpointing, conditional retry edges, an iteration cap, timeout, and cancellation, all real and tested from Phase 3 onward." },
  { number: "ADR-002", title: "Postgres for Shared Project State", summary: "Postgres, not in-memory state or Kafka, as the system of record for everything that must survive a restart and be queried relationally — every agent artifact (plans, diffs, findings, results, approvals) is a normalized row." },
  { number: "ADR-003", title: "Verification Gate Is Deterministic, Separate From LLM Review", summary: "The Reviewer's output is one more artifact in shared state, never a decision — a separate Verification Gate module contains zero LLM calls and makes the actual pass/fail call, the project's central design principle." },
  { number: "ADR-004", title: "Risk-Based Human-in-the-Loop, Enforced in the Backend", summary: "Every action is classified by real risk level and the policy is enforced as backend logic, not a UI convention — a frontend that doesn't render an approval prompt cannot bypass a high-risk classification." },
];

export const failureDemoResults = {
  claim:
    "The project's single most important claim — \"the LLM is not the final source of truth\" — needed to be proven, not just documented. Four failure-injection scenarios construct real disposable git repos and run the real deterministic pipeline against genuinely broken/risky content, with the Reviewer's approval explicitly simulated and labeled as such (never hidden).",
  method:
    "Each scenario commits real content to a real git repo (a subtraction bug where addition was required, a hardcoded AWS-key-shaped string, a real Alembic migration file) on a disposable branch, then runs the actual qa_node → security_node → verification_node → policy_node in sequence — the same deterministic tail LangGraph itself would run — and checks the real resulting decision.",
  measured: [
    { scenario: "QA overrides a simulated Reviewer approval", trigger: "A genuinely broken add()", outcome: "BLOCKED_BY_VERIFICATION", real: true },
    { scenario: "Security blocks a committed secret", trigger: "A real AWS-key-shaped string", outcome: "BLOCKED_BY_VERIFICATION", real: true },
    { scenario: "Migration requires human approval", trigger: "A real Alembic migration file", outcome: "PENDING_HUMAN_APPROVAL", real: true },
  ],
  validates:
    "A real test failure and a real detected secret genuinely override an approval — simulated or not — before the change can merge, and a real migration-path change is genuinely classified high-risk and routed to a human, server-side, every time this was run in this environment.",
  doesNotValidate: [
    "Scenario 1 (the Reviewer itself genuinely catching the bug via a real LLM call) is gated on real Anthropic/OpenAI credentials — it correctly reports \"Integration unavailable\" rather than fake a result when no key is configured.",
    "The Developer step in scenarios 2–4 is a scripted commit standing in for \"an agent just wrote this,\" not a real LLM-authored change — only the downstream deterministic checks are being demonstrated here.",
  ],
};

export const measuredMetrics = [
  { label: "Backend test suite", value: "143 passed, 1 skipped (credential-gated), 0 failed", kind: "measured" as const },
  { label: "Static analysis", value: "ruff + mypy clean across 67 source files", kind: "measured" as const },
  { label: "Planned phases delivered", value: "12/12", kind: "measured" as const },
  { label: "Architecture Decision Records", value: "4 ADRs, all accepted", kind: "measured" as const },
  { label: "Security scan run against this repo's own source", value: "1 match found — the deliberate demo secret, 0 real secrets", kind: "measured" as const },
  { label: "Failure-injection scenarios, fully real outcome", value: "3 of 4 (the 4th needs real LLM credentials to run)", kind: "measured" as const },
];
