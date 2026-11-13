import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { products, categories } from "@/lib/products";
import { CatalogGrid } from "@/components/CatalogGrid";
import { Button } from "@/components/ui/button";
import { specialtyServices } from "@/lib/services";

type S = { cat?: string | undefined; q?: string | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): S => ({
    cat: typeof s["cat"] === "string" ? s["cat"] : undefined,
    q: typeof s["q"] === "string" ? s["q"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop Components & Services — Circuit Complete" },
      {
        name: "description",
        content:
          "Shop electronic components and browse specialty industrial, CAN bus, entry and counter-surveillance services.",
      },
      { property: "og:title", content: "Shop Components & Services — Circuit Complete" },
      {
        property: "og:description",
        content: "Electronic components and specialty services available on request.",
      },
    ],
  }),
  component: Shop,
});

const sorts = {
  featured: "Featured",
  "price-asc": "Price ↑",
  "price-desc": "Price ↓",
  name: "Name",
} as const;

function Shop() {
  const { cat, q = "" } = Route.useSearch();
  const nav = useNavigate({ from: "/shop" });
  const [sort, setSort] = useState<keyof typeof sorts>("featured");
  const [inStock, setInStock] = useState(false);
  const [searchOpen, setSearchOpen] = useState(true);

  const list = useMemo(() => {
    const t = q.toLowerCase();
    let matchingProducts = products.filter(
      (p) =>
        (!cat || p.category === cat) &&
        (!inStock || p.stock > 0) &&
        (!t ||
          [p.name, p.mfr, p.summary, ...p.specs.map((s) => s.value)]
            .join(" ")
            .toLowerCase()
            .includes(t)),
    );
    if (sort === "price-asc")
      matchingProducts = [...matchingProducts].sort((a, b) => a.price - b.price);
    if (sort === "price-desc")
      matchingProducts = [...matchingProducts].sort((a, b) => b.price - a.price);
    if (sort === "name")
      matchingProducts = [...matchingProducts].sort((a, b) => a.name.localeCompare(b.name));

    const matchingServices = inStock
      ? []
      : specialtyServices.filter(
          (service) =>
            (!cat || service.category === cat) &&
            (!t ||
              `${service.title} ${service.category} ${service.description}`
                .toLowerCase()
                .includes(t)),
        );

    return { products: matchingProducts, services: matchingServices };
  }, [cat, q, sort, inStock]);

  const resultCount = list.products.length + list.services.length;

  const chip = (active: boolean) =>
    `border px-3 py-1.5 font-mono text-xs uppercase tracking-wider ${active ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">// Catalog</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Components & Services</h1>

      <div className="mt-4 border border-border bg-card">
        <div className="flex items-center justify-between px-3 py-2">
          <p className="font-mono text-xs text-muted-foreground" aria-live="polite">
            {resultCount} results
          </p>
          <Button
            variant="ghost"
            size="sm"
            aria-label={searchOpen ? "Close search and filters" : "Open search and filters"}
            onClick={() => setSearchOpen((open) => !open)}
          >
            {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            <span>{searchOpen ? "Close" : "Search & filters"}</span>
          </Button>
        </div>
        {searchOpen && (
          <div className="flex flex-col gap-4 border-t border-border p-4">
            <label className="flex items-center gap-2 border border-border bg-background px-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Search components and services</span>
              <input
                value={q}
                onChange={(e) =>
                  nav({ search: (s) => ({ ...s, q: e.target.value || undefined }), replace: true })
                }
                placeholder="Search part, rating, or service… e.g. 575pF, 200 V, CAN bus"
                className="h-11 w-full bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground"
              />
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className={`${chip(!cat)} h-auto min-h-9 w-full justify-start whitespace-normal text-left leading-tight`}
                onClick={() => nav({ search: (s) => ({ ...s, cat: undefined }) })}
              >
                All
              </Button>
              {[...categories, ...specialtyServices.map((service) => service.category)].map((c) => (
                <Button
                  variant="outline"
                  key={c}
                  className={`${chip(cat === c)} h-auto min-h-9 w-full justify-start whitespace-normal text-left leading-tight`}
                  onClick={() => nav({ search: (s) => ({ ...s, cat: c }) })}
                >
                  {c}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-3">
              <label className="flex items-center gap-2 font-mono text-xs uppercase">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="accent-primary"
                />
                Products in stock
              </label>
              <label className="flex items-center gap-2 font-mono text-xs uppercase">
                Sort products
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as keyof typeof sorts)}
                  className="border border-border bg-background px-2 py-1.5"
                >
                  {Object.entries(sorts).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        )}
      </div>
      <div className="mt-3">
        <CatalogGrid products={list.products} services={list.services} />
      </div>
      {resultCount === 0 && (
        <p className="py-20 text-center text-muted-foreground">
          No items match. Try a different search or category.
        </p>
      )}
    </div>
  );
}
