import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

type S = { cat?: string; q?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): S => ({
    cat: typeof s.cat === "string" ? s.cat : undefined,
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop Components — Circuit Complete" },
      { name: "description", content: "Search and filter variable capacitors, diodes, transistors, regulators and switches." },
      { property: "og:title", content: "Shop Components — Circuit Complete" },
      { property: "og:description", content: "Search and filter our in-stock electronic components." },
    ],
  }),
  component: Shop,
});

const sorts = { featured: "Featured", "price-asc": "Price ↑", "price-desc": "Price ↓", name: "Name" } as const;

function Shop() {
  const { cat, q = "" } = Route.useSearch();
  const nav = useNavigate({ from: "/shop" });
  const [sort, setSort] = useState<keyof typeof sorts>("featured");
  const [inStock, setInStock] = useState(false);

  const list = useMemo(() => {
    const t = q.toLowerCase();
    let r = products.filter(
      (p) =>
        (!cat || p.category === cat) &&
        (!inStock || p.stock > 0) &&
        (!t || [p.name, p.mfr, p.summary, ...p.specs.map((s) => s.value)].join(" ").toLowerCase().includes(t)),
    );
    if (sort === "price-asc") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "name") r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [cat, q, sort, inStock]);

  const chip = (active: boolean) =>
    `border px-3 py-1.5 font-mono text-xs uppercase tracking-wider ${active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">// Inventory</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Components</h1>

      <div className="mt-8 flex flex-col gap-4 border border-border bg-card p-4">
        <label className="flex items-center gap-2 border border-border bg-background px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Search components</span>
          <input
            value={q}
            onChange={(e) => nav({ search: (s) => ({ ...s, q: e.target.value || undefined }), replace: true })}
            placeholder="Search part number, value, rating… e.g. 575pF, 200 V, LM317"
            className="h-11 w-full bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <button className={chip(!cat)} onClick={() => nav({ search: (s) => ({ ...s, cat: undefined }) })}>All</button>
          {categories.map((c) => (
            <button key={c} className={chip(cat === c)} onClick={() => nav({ search: (s) => ({ ...s, cat: c }) })}>{c}</button>
          ))}
          <div className="ml-auto flex items-center gap-4">
            <label className="flex items-center gap-2 font-mono text-xs uppercase">
              <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="accent-primary" />
              In stock
            </label>
            <label className="flex items-center gap-2 font-mono text-xs uppercase">
              Sort
              <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof sorts)} className="border border-border bg-background px-2 py-1.5">
                {Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </label>
          </div>
        </div>
      </div>

      <p className="mt-6 font-mono text-xs text-muted-foreground" aria-live="polite">{list.length} results</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((p) => <ProductCard key={p.slug} p={p} />)}
      </div>
      {list.length === 0 && <p className="py-20 text-center text-muted-foreground">No parts match. Try a different value or category.</p>}
    </div>
  );
}
