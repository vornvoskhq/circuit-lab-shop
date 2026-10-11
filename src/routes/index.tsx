import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { products, categories } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { CatalogPreviews } from "@/components/CatalogPreviews";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Circuit Complete — RF & Electronic Components" },
      { name: "description", content: "Variable capacitors, semiconductors and electromechanical parts with full spec sheets. Ships fast." },
      { property: "og:title", content: "Circuit Complete — RF & Electronic Components" },
      { property: "og:description", content: "Variable capacitors, semiconductors and electromechanical parts with full spec sheets." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <img src={hero} alt="Brass air variable capacitor on an engineering bench" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="grid-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 py-28 md:py-40">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">// Components for the signal path</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            Close the circuit.<br />
            <span className="text-muted-foreground">Find the part.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Hard-to-find RF tuning capacitors, power semiconductors and switches — every listing with its real spec sheet.
          </p>
          <div className="mt-8 flex gap-3">
            <Link to="/shop" className="bg-primary px-6 py-3 font-mono text-sm uppercase tracking-wider text-primary-foreground hover:bg-primary/85">Browse inventory</Link>
            <Link to="/labs" className="border border-border bg-background/50 px-6 py-3 font-mono text-sm uppercase tracking-wider hover:border-primary">Labs preview</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {categories.map((c, i) => (
            <Link key={c} to="/shop" search={{ cat: c }} className="group bg-background p-6 hover:bg-card">
              <p className="font-mono text-xs text-primary">0{i + 1}</p>
              <h2 className="mt-2 text-xl font-semibold">{c}</h2>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {products.filter((p) => p.category === c).length} SKUs →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-3xl font-semibold tracking-tight">In stock now</h2>
          <Link to="/shop" className="font-mono text-xs uppercase text-primary">View all →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[products[0], products[2], products[9], products[10]].filter((p): p is NonNullable<typeof p> => !!p).map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
        <CatalogPreviews />
      </section>
    </>
  );
}
