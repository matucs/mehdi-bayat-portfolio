import { type Project } from "@/data/projects";
import { ExternalLink, Tag } from "./ui";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-surface p-6">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="text-sm text-accent">{project.subtitle}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.technologies.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
        {project.github && <ExternalLink href={project.github}>GitHub</ExternalLink>}
        {project.demo && <ExternalLink href={project.demo}>Live Demo</ExternalLink>}
      </div>
    </div>
  );
}
