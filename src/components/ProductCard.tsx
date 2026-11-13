import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { fmt, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <article className="group flex flex-col border border-border bg-card transition-colors hover:border-primary">
      <Link
        to="/products/$slug"
        params={{ slug: p.slug }}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          width={816}
          height={816}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
          {p.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {p.mfr}
            </p>
            <Link
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="mt-1 block hover:text-primary"
            >
              <h3 className="text-lg font-semibold leading-tight">{p.name}</h3>
            </Link>
          </div>
          <p className="shrink-0 whitespace-nowrap pt-0.5 font-mono text-[10px] uppercase text-muted-foreground">
            {p.stock} in stock
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 border-y border-border py-3">
          <dl className="min-w-0 flex-1 space-y-1">
            {p.key.map((k) => (
              <div
                key={k.label}
                className="flex flex-wrap items-baseline gap-x-1 font-mono text-xs"
              >
                <dt className="text-muted-foreground">{k.label}:</dt>
                <dd className="text-foreground">{k.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <p className="font-mono text-xl text-foreground">{fmt(p.price)}</p>
            <Button
              size="sm"
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
