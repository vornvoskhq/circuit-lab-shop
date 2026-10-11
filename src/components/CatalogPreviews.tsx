import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { previews } from "@/lib/previews";

export function CatalogPreviews({ category, query = "" }: { category?: string | undefined; query?: string }) {
  const items = previews.filter((item) => (!category || item.category === category) && `${item.title} ${item.description} ${item.category}`.toLowerCase().includes(query.toLowerCase()));
  if (!items.length) return null;
  return <section className="mt-12 border-t border-border pt-8" aria-labelledby="catalog-previews">
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <h2 id="catalog-previews" className="text-2xl font-semibold">Upcoming inventory & partner labs</h2>
      <span className="font-mono text-xs uppercase text-muted-foreground">Preview · Not yet for sale</span>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ title, description, icon: Icon, hash, action }) => <article key={title} className="flex min-w-0 flex-col border border-border bg-card p-6">
        <div className="flex items-center justify-between"><Icon className="h-6 w-6 text-primary" /><span className="font-mono text-[10px] uppercase text-muted-foreground">Coming soon</span></div>
        <h3 className="mt-5 text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <Button asChild variant="outline" className="mt-6 self-start font-mono text-xs uppercase"><Link to="/labs" hash={hash}>{action}<ArrowUpRight /></Link></Button>
      </article>)}
    </div>
  </section>;
}