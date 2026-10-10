import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { FileText, Printer } from "lucide-react";
import { getProduct, fmt } from "@/lib/products";
import { useCart } from "@/lib/cart";

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
  const p = getProduct(slug)!;
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Link to="/shop" className="font-mono text-xs uppercase text-muted-foreground hover:text-primary">← Inventory</Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="border border-border bg-muted">
          <img src={p.image} alt={p.name} width={816} height={816} className="aspect-square w-full object-cover" />
        </div>
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
            <button onClick={() => { add(p.slug, qty); toast.success(`${qty} × ${p.name} added`); }} className="flex-1 bg-primary py-3 font-mono text-sm uppercase tracking-wider text-primary-foreground hover:bg-primary/85">
              Add to cart
            </button>
          </div>

          <section className="mt-10" aria-labelledby="specs">
            <div className="flex items-center justify-between">
              <h2 id="specs" className="font-mono text-sm uppercase tracking-widest">Full spec sheet</h2>
              <div className="flex gap-2">
                {p.datasheet && (
                  <a href={p.datasheet} target="_blank" rel="noreferrer" className="flex items-center gap-1 border border-border px-3 py-1.5 font-mono text-xs uppercase hover:border-primary">
                    <FileText className="h-3.5 w-3.5" /> Datasheet PDF
                  </a>
                )}
                <button onClick={() => window.print()} className="flex items-center gap-1 border border-border px-3 py-1.5 font-mono text-xs uppercase hover:border-primary">
                  <Printer className="h-3.5 w-3.5" /> Print
                </button>
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
          </section>
        </div>
      </div>
    </div>
  );
}
