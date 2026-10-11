import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { fmt, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <article className="group flex flex-col border border-border bg-card transition-colors hover:border-primary">
      <Link to="/products/$slug" params={{ slug: p.slug }} className="relative block aspect-square overflow-hidden bg-muted">
        <img src={p.image} alt={p.name} loading="lazy" width={816} height={816} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
          {p.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{p.mfr}</p>
          <h3 className="mt-1 text-lg font-semibold leading-tight">{p.name}</h3>
        </div>
        <dl className="space-y-1 border-y border-border py-3">
          {p.key.map((k) => (
            <div key={k.label} className="flex flex-wrap items-baseline gap-x-1 font-mono text-xs">
              <dt className="text-muted-foreground">{k.label}:</dt>
              <dd className="text-foreground">{k.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <p className="font-mono text-xl text-foreground">{fmt(p.price)}</p>
            <p className="font-mono text-[10px] uppercase text-muted-foreground">{p.stock} in stock</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm"><Link to="/products/$slug" params={{ slug: p.slug }} className="font-mono text-xs uppercase">
              Specs
            </Link></Button>
            <Button size="sm"
              onClick={() => {
                add(p.slug);
                toast.success(`${p.name} added to cart`);
              }}
              className="bg-primary px-3 py-2 font-mono text-xs uppercase text-primary-foreground hover:bg-primary/85"
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
