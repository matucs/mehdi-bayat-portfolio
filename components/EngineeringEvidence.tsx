import { engineeringEvidence } from "@/data/projects";

export default function EngineeringEvidence() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-2 text-left">
            <th scope="col" className="px-4 py-3 font-medium text-muted">Capability</th>
            <th scope="col" className="px-4 py-3 font-medium text-muted">Evidence</th>
          </tr>
        </thead>
        <tbody>
          {engineeringEvidence.map((row, i) => (
            <tr key={row.capability} className={i % 2 === 0 ? "bg-surface" : "bg-background"}>
              <td className="px-4 py-3 align-top font-medium whitespace-nowrap">{row.capability}</td>
              <td className="px-4 py-3 align-top text-muted">{row.evidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
