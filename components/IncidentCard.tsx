import { ExternalLink } from "./ui";

export interface Incident {
  id: string;
  title: string;
  date: string;
  testFailed: string;
  initialAssumption: string;
  investigation: string;
  rootCause: string;
  fix: string;
  verification: string;
  lesson: string;
  links: { label: string; url: string }[];
}

const steps: { key: keyof Incident; label: string }[] = [
  { key: "testFailed", label: "Test failed" },
  { key: "initialAssumption", label: "Initial assumption" },
  { key: "investigation", label: "Investigation" },
  { key: "rootCause", label: "Root cause" },
  { key: "fix", label: "Fix" },
  { key: "verification", label: "Verification" },
];

export default function IncidentCard({ incident }: { incident: Incident }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold">{incident.title}</h3>
        <span className="mono text-xs text-muted">{incident.date}</span>
      </div>
      <div className="mt-6 space-y-5">
        {steps.map(({ key, label }) => (
          <div key={String(key)}>
            <p className="mono text-xs font-semibold uppercase tracking-widest text-accent">{label}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{incident[key] as string}</p>
          </div>
        ))}
        <div className="rounded-md border border-border bg-surface-2 p-4">
          <p className="mono text-xs font-semibold uppercase tracking-widest text-foreground">Engineering lesson</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{incident.lesson}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
        {incident.links.map((l) => (
          <ExternalLink key={l.label} href={l.url}>
            {l.label}
          </ExternalLink>
        ))}
      </div>
    </div>
  );
}
