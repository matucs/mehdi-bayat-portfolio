import { technologies } from "@/data/technologies";
import { Tag } from "./ui";

export default function TechStack() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {technologies.map((cat) => (
        <div key={cat.category}>
          <h3 className="mono text-xs font-semibold uppercase tracking-widest text-muted">{cat.category}</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {cat.items.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
