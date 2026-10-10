import { Link } from "@tanstack/react-router";
import { ShoppingCart, CircuitBoard } from "lucide-react";
import { useCart } from "@/lib/cart";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/labs", label: "Labs & Upcoming" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <CircuitBoard className="h-5 w-5 text-primary" />
          <span>Circuit<span className="text-primary">/</span>Complete</span>
        </Link>
        <nav className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="px-3 py-2 text-muted-foreground hover:text-foreground" activeProps={{ className: "text-primary" }}>
              {n.label}
            </Link>
          ))}
          <Link to="/cart" aria-label={`Cart, ${count} items`} className="relative ml-2 border border-border p-2 hover:border-primary">
            <ShoppingCart className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center bg-primary px-1 text-[10px] text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 font-mono text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} Circuit Complete — closing the loop on hard-to-find parts.</span>
        <span>RF · POWER · ELECTROMECHANICAL</span>
      </div>
    </footer>
  );
}
