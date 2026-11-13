import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { specialtyServices } from "@/lib/services";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "Labs & Specialty Services — Circuit Complete" },
      {
        name: "description",
        content:
          "Specialty industrial, CAN bus, entry and counter-surveillance services available on request.",
      },
      { property: "og:title", content: "Labs & Specialty Services — Circuit Complete" },
      {
        property: "og:description",
        content: "Specialty electronics services available on request.",
      },
    ],
  }),
  component: Labs,
});

function Labs() {
  const [inquiry, setInquiry] = useState("");
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
        // Specialty services
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Available on request</h1>
      <div
        id="services"
        className="mt-6 grid scroll-mt-24 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
      >
        {specialtyServices.map(({ icon: I, title, description }) => (
          <div key={title} className="bg-background p-6">
            <div className="mt-4 flex items-center gap-2">
              <I className="h-6 w-6 shrink-0 text-primary" />
              <h2 className="font-semibold">{title}</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            <div className="mt-4 flex items-center justify-between gap-2">
              <span className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase text-primary">
                Available by request
              </span>
              <Button size="sm" variant="outline" onClick={() => setInquiry(title)}>
                Inquire
              </Button>
            </div>
          </div>
        ))}
      </div>
      {inquiry && (
        <div className="mt-6 border-t border-border py-4" role="status">
          <h2 className="font-semibold">{inquiry}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This specialty service is available on request. Scope and availability are discussed
            individually.
          </p>
        </div>
      )}
    </div>
  );
}
