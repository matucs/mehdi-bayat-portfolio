import { type ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-5xl px-6 py-16 sm:py-20 ${className}`}>
      {(eyebrow || title) && (
        <div className="mb-10">
          {eyebrow && (
            <p className="mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
          )}
          {title && <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>}
        </div>
      )}
      {children}
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="mono inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted">
      {children}
    </span>
  );
}

export function MeasuredBadge({ kind }: { kind: "measured" | "projection" }) {
  const isMeasured = kind === "measured";
  return (
    <span
      className="mono inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{
        color: isMeasured ? "var(--measured)" : "var(--projection)",
        background: isMeasured ? "var(--measured-bg)" : "var(--projection-bg)",
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "currentColor" }} />
      {isMeasured ? "Measured" : "Architectural projection"}
    </span>
  );
}

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline underline-offset-4"
    >
      {children}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <path d="M7 17 17 7M8 7h9v9" />
      </svg>
    </a>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg border border-border bg-surface p-6 ${className}`}>{children}</div>
  );
}
