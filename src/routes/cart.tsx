import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { getProduct, fmt } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Circuit Complete" },
      { name: "description", content: "Review your components and check out securely." },
      { property: "og:title", content: "Your Cart — Circuit Complete" },
      { property: "og:description", content: "Review your components and check out securely." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, remove, total } = useCart();
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-4xl font-semibold tracking-tight">Cart</h1>
      {lines.length === 0 ? (
        <div className="mt-10 border border-border p-12 text-center">
          <p className="text-muted-foreground">Your cart is an open circuit.</p>
          <Link to="/shop" className="mt-4 inline-block bg-primary px-5 py-2 font-mono text-sm uppercase text-primary-foreground">Shop parts</Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <ul className="divide-y divide-border border border-border">
            {lines.map((l) => {
              const p = getProduct(l.slug);
              if (!p) return null;
              return (
                <li key={l.slug} className="flex items-center gap-4 p-4">
                  <img src={p.image} alt="" width={64} height={64} className="h-16 w-16 object-cover" />
                  <div className="flex-1">
                    <Link to="/products/$slug" params={{ slug: p.slug }} className="font-semibold hover:text-primary">{p.name}</Link>
                    <p className="font-mono text-xs text-muted-foreground">{fmt(p.price)} each</p>
                  </div>
                  <label className="sr-only" htmlFor={`q-${p.slug}`}>Quantity</label>
                  <input id={`q-${p.slug}`} type="number" min={0} value={l.qty} onChange={(e) => setQty(p.slug, +e.target.value)} className="w-16 border border-border bg-background px-2 py-1 font-mono" />
                  <p className="w-20 text-right font-mono">{fmt(p.price * l.qty)}</p>
                  <button aria-label={`Remove ${p.name}`} onClick={() => remove(p.slug)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </li>
              );
            })}
          </ul>
          <aside className="h-fit border border-border bg-card p-6">
            <div className="flex justify-between font-mono text-sm"><span>Subtotal</span><span>{fmt(total)}</span></div>
            <p className="mt-1 font-mono text-xs text-muted-foreground">Shipping & tax calculated at checkout</p>
            <button onClick={() => toast.info("Secure Stripe checkout is being connected — check back shortly.")} className="mt-6 w-full bg-primary py-3 font-mono text-sm uppercase tracking-wider text-primary-foreground hover:bg-primary/85">
              Checkout
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
