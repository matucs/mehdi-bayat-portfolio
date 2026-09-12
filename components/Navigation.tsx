import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import MobileNav from "./MobileNav";
import EngineeringMenu from "./EngineeringMenu";

export const engineeringItems = [
  { href: "/engineering/livepulse", label: "LivePulse" },
  { href: "/engineering/agentforge", label: "AgentForge" },
];

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6" aria-label="Primary">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Mehdi Bayat
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6 text-sm text-muted">
            <li>
              <EngineeringMenu items={engineeringItems} />
            </li>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileNav items={navItems} engineeringItems={engineeringItems} />
        </div>
      </nav>
    </header>
  );
}
