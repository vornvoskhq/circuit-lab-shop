import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { products } from "@/lib/products";
import { CatalogGrid } from "@/components/CatalogGrid";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Circuit Complete — RF & Electronic Components" },
      {
        name: "description",
        content:
          "Variable capacitors, semiconductors and electromechanical parts with full spec sheets. Ships fast.",
      },
      { property: "og:title", content: "Circuit Complete — RF & Electronic Components" },
      {
        property: "og:description",
        content:
          "Variable capacitors, semiconductors and electromechanical parts with full spec sheets.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={hero}
          alt="Brass air variable capacitor on an engineering bench"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="grid-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 py-8 md:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            // Components for the signal path
          </p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
            Close the circuit.
            <br />
            <span className="text-muted-foreground">Find the part.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Hard-to-find RF tuning capacitors, power semiconductors and switches — every listing
            with its real spec sheet.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              to="/shop"
              className="bg-primary px-6 py-3 font-mono text-sm uppercase tracking-wider text-primary-foreground hover:bg-primary/85"
            >
              Browse inventory
            </Link>
            <Link
              to="/labs"
              className="border border-border bg-background/50 px-6 py-3 font-mono text-sm uppercase tracking-wider hover:border-primary"
            >
              Specialty services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">In stock now</h2>
        </div>
        <CatalogGrid products={products} />
      </section>
    </>
  );
}
