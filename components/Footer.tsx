import { links } from "@/data/links";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Mehdi Bayat.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href={links.github} className="hover:text-foreground" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={links.linkedin} className="hover:text-foreground" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={links.email} className="hover:text-foreground">
            Email
          </a>
          <a href={links.cv} className="hover:text-foreground" target="_blank" rel="noreferrer">
            CV
          </a>
        </div>
      </div>
    </footer>
  );
}
