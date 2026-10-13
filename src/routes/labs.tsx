import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Factory, Network, KeyRound, Radar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "Labs & Upcoming Categories — Circuit Complete" },
      {
        name: "description",
        content: "Upcoming industrial, CAN bus, entry and counter-surveillance tools.",
      },
      { property: "og:title", content: "Labs & Upcoming — Circuit Complete" },
      { property: "og:description", content: "Upcoming electronics categories." },
    ],
  }),
  component: Labs,
});

const upcoming = [
  {
    icon: Factory,
    t: "Industrial Electronics",
    d: "Contactors, relays, PLC I/O and panel hardware.",
  },
  {
    icon: Network,
    t: "CAN Bus Tools",
    d: "Analyzers, transceivers, breakout harnesses and sniffers.",
  },
  {
    icon: KeyRound,
    t: "Physical & Electronic Entry Tools",
    d: "Locksport, RFID/NFC research and access-control test gear.",
  },
  {
    icon: Radar,
    t: "Counter-Surveillance Electronics",
    d: "RF detectors, spectrum sweepers and NLJD components.",
  },
];

function Labs() {
  const [inquiry, setInquiry] = useState("");
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">// Roadmap</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Coming online</h1>
      <div
        id="upcoming"
        className="mt-8 grid scroll-mt-24 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
      >
        {upcoming.map(({ icon: I, t, d }) => (
          <div key={t} className="bg-background p-6">
            <I className="h-6 w-6 text-primary" />
            <h2 className="mt-4 font-semibold">{t}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            <span className="mt-4 inline-block border border-border px-2 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
              Soon
            </span>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => setInquiry(t)}>
                Notify me
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setInquiry(t)}>
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
            Notifications and inquiries are not open yet.
          </p>
        </div>
      )}
    </div>
  );
}
