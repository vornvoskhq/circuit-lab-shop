import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/products";
import type { SpecialtyService } from "@/lib/services";

export function CatalogGrid({
  products,
  services = [],
}: {
  products: Product[];
  services?: SpecialtyService[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.slug} p={product} />
      ))}
      {services.map((service) => (
        <SpecialtyServiceCard key={service.category} service={service} />
      ))}
    </div>
  );
}

function SpecialtyServiceCard({ service }: { service: SpecialtyService }) {
  const Icon = service.icon;

  return (
    <article className="group flex flex-col border border-border bg-card transition-colors hover:border-primary">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-muted">
        <Icon className="h-16 w-16 text-primary" strokeWidth={1.25} />
        <span className="absolute left-3 top-3 bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
          Specialty service
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Available by request
        </p>
        <h2 className="mt-1 text-lg font-semibold leading-tight">{service.title}</h2>
        <p className="mt-3 text-sm text-muted-foreground">{service.description}</p>
        <Link
          to="/labs"
          hash="services"
          className="mt-auto inline-flex items-center gap-1 self-start pt-5 font-mono text-xs uppercase text-primary hover:text-foreground"
        >
          Service details <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
