import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Factory, Network, KeyRound, Radar, Atom, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "Labs & Upcoming Categories — Circuit Complete" },
      { name: "description", content: "Upcoming industrial, CAN bus, entry and counter-surveillance tools, plus lab previews with Open Matter Labs and Adafruit." },
      { property: "og:title", content: "Labs & Upcoming — Circuit Complete" },
      { property: "og:description", content: "Partner previews with Open Matter Labs and Adafruit Industries, and categories coming soon." },
    ],
  }),
  component: Labs,
});

const upcoming = [
  { icon: Factory, t: "Industrial Electronics", d: "Contactors, relays, PLC I/O and panel hardware." },
  { icon: Network, t: "CAN Bus Tools", d: "Analyzers, transceivers, breakout harnesses and sniffers." },
  { icon: KeyRound, t: "Physical & Electronic Entry Tools", d: "Locksport, RFID/NFC research and access-control test gear." },
  { icon: Radar, t: "Counter-Surveillance Electronics", d: "RF detectors, spectrum sweepers and NLJD components." },
];

function Labs() {
  const [inquiry, setInquiry] = useState("");
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">// Roadmap</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Coming online</h1>
      <div id="upcoming" className="mt-8 grid scroll-mt-24 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {upcoming.map(({ icon: I, t, d }) => (
          <div key={t} className="bg-background p-6">
            <I className="h-6 w-6 text-primary" />
            <h2 className="mt-4 font-semibold">{t}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            <span className="mt-4 inline-block border border-border px-2 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">Soon</span>
            <div className="mt-4 flex flex-wrap gap-2"><Button size="sm" variant="outline" onClick={() => setInquiry(t)}>Notify me</Button><Button size="sm" variant="ghost" onClick={() => setInquiry(t)}>Inquire</Button></div>
          </div>
        ))}
      </div>
      {inquiry && <div className="mt-6 border-t border-border py-4" role="status"><h2 className="font-semibold">{inquiry}</h2><p className="mt-2 text-sm text-muted-foreground">Notifications and inquiries are not open yet.</p></div>}

      <p className="mt-20 font-mono text-xs uppercase tracking-[0.3em] text-primary">// Lab previews</p>
      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        <LabCard
          icon={Atom}
          partner="Open Matter Labs"
          title="Terahertz varactor & thin-layer deposition"
          body="A benchtop thin-film deposition setup with quartz crystal microbalance (QCM) sensors for real-time thickness monitoring, paired with terahertz-range varactor development."
          points={["QCM sensor heads & oscillator boards", "Deposition rate monitoring to Å-scale", "THz varactor samples & test fixtures"]}
        />
        <LabCard
          icon={Wallet}
          partner="Adafruit Industries"
          title="Cold-cash embedded crypto wallet"
          body="A microcontroller-embedded offline 'cold cash' wallet based on an MIT CSAIL design — physical, bearer-style value storage on open hardware."
          points={["Open-source microcontroller platform", "Air-gapped key storage", "Based on MIT CSAIL research"]}
          waitlist
        />
      </div>
    </div>
  );
}

function LabCard({ icon: I, partner, title, body, points, waitlist }: { icon: typeof Atom; partner: string; title: string; body: string; points: string[]; waitlist?: boolean }) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [mode, setMode] = useState<"notify" | "inquire" | null>(null);
  return (
    <article id={partner === "Open Matter Labs" ? "open-matter-labs" : "adafruit-industries"} className="relative scroll-mt-24 overflow-hidden border border-border bg-card p-5 sm:p-8">
      <div className="grid-overlay absolute inset-0 opacity-40" />
      <div className="relative">
        <div className="flex items-center gap-3">
          <I className="h-6 w-6 text-primary" />
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Partnership · {partner}</p>
        </div>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-3 text-muted-foreground">{body}</p>
        <ul className="mt-4 space-y-1 font-mono text-sm">
          {points.map((p) => <li key={p}><span className="text-primary">▸</span> {p}</li>)}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2"><Button variant="outline" onClick={() => setMode("notify")}>Notify me</Button><Button variant="outline" onClick={() => setMode("inquire")}>Inquire</Button></div>
        {mode && <form
          className="mt-6 flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor={`e-${partner}`} className="font-mono text-xs uppercase">{mode === "inquire" ? "Partner inquiry" : waitlist ? "Join the waitlist" : "Notify me"}</label>
          <div className="flex flex-wrap gap-2">
            <input id={`e-${partner}`} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@lab.org" className="min-w-0 flex-1 border border-border bg-background px-3 py-2 font-mono text-sm" />
          </div>
          {mode === "inquire" && (
            <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Inquiry (optional) — volume, use case, questions" rows={2} className="border border-border bg-background px-3 py-2 text-sm" />
          )}
          <p className="text-xs text-muted-foreground">Notifications and inquiries are not open yet. Nothing is submitted or saved.</p>
          <Button disabled className="self-start">Opening soon</Button>
        </form>}
      </div>
    </article>
  );
}
