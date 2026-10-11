import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { FileText, Printer } from "lucide-react";
import { getProduct, fmt } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductGallery } from "@/components/ProductGallery";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData && getProduct(loaderData.slug);
    if (!p) return { meta: [{ title: "Part not found" }, { name: "robots", content: "noindex" }] };
    const t = `${p.name} — Spec Sheet & Price | Circuit Complete`;
    return {
      meta: [
        { title: t },
        { name: "description", content: p.summary },
        { property: "og:title", content: t },
        { property: "og:description", content: p.summary },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="py-32 text-center">
      <p>Part not found.</p>
      <Link to="/shop" className="text-primary">Back to shop</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  if (!p) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Link to="/shop" className="font-mono text-xs uppercase text-muted-foreground hover:text-primary">← Inventory</Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery key={p.slug} name={p.name} images={p.images} />
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary">{p.category} · {p.mfr}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{p.name}</h1>
          <p className="mt-4 text-muted-foreground">{p.summary}</p>
          <div className="mt-6 grid grid-cols-3 gap-px border border-border bg-border">
            {p.key.map((k) => (
              <div key={k.label} className="bg-card p-3">
                <p className="font-mono text-[10px] uppercase text-muted-foreground">{k.label}</p>
                <p className="mt-1 font-mono text-base">{k.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-4">
            <p className="font-mono text-3xl">{fmt(p.price)}</p>
            <p className="font-mono text-xs uppercase text-muted-foreground">{p.stock} in stock</p>
          </div>
          <div className="mt-4 flex gap-2">
            <label className="sr-only" htmlFor="qty">Quantity</label>
            <input id="qty" type="number" min={1} max={p.stock} value={qty} onChange={(e) => setQty(Math.max(1, +e.target.value || 1))} className="w-20 border border-border bg-background px-3 font-mono" />
            <Button onClick={() => { add(p.slug, qty); toast.success(`${qty} × ${p.name} added`); }} className="h-auto flex-1 py-3 font-mono text-sm uppercase tracking-wider">
              Add to cart
            </Button>
          </div>

          <section className="mt-10" aria-labelledby="specs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="specs" className="font-mono text-sm uppercase tracking-widest">Full spec sheet</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => window.print()} className="font-mono text-xs uppercase">
                  <Printer className="h-3.5 w-3.5" /> Print
                </Button>
              </div>
            </div>
            <table className="mt-3 w-full border border-border text-sm">
              <tbody>
                {p.specs.map((s) => (
                  <tr key={s.label} className="border-b border-border last:border-0">
                    <th scope="row" className="w-1/2 bg-card p-3 text-left font-mono text-xs font-normal uppercase text-muted-foreground">{s.label}</th>
                    <td className="p-3 font-mono">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {p.datasheets.length > 0 && <div className="mt-6 space-y-2">
              <h3 className="font-mono text-xs uppercase text-muted-foreground">Datasheets & catalog PDFs</h3>
              {p.datasheets.map((sheet) => <Button key={sheet.url} asChild variant="outline" className="h-auto w-full justify-start whitespace-normal py-3 text-left font-mono text-xs">
                <a href={sheet.url} target="_blank" rel="noreferrer"><FileText className="shrink-0" /><span className="min-w-0 break-words">{sheet.label}</span></a>
              </Button>)}
            </div>}
          </section>
        </div>
      </div>
    </div>
  );
}
