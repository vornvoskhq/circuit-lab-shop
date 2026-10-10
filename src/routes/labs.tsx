import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Factory, Network, KeyRound, Radar, Atom, Wallet } from "lucide-react";

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
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">// Roadmap</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Coming online</h1>
      <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {upcoming.map(({ icon: I, t, d }) => (
          <div key={t} className="bg-background p-6">
            <I className="h-6 w-6 text-primary" />
            <h2 className="mt-4 font-semibold">{t}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            <span className="mt-4 inline-block border border-border px-2 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">Soon</span>
          </div>
        ))}
      </div>

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
  return (
    <article className="relative overflow-hidden border border-border bg-card p-8">
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
        <form
          className="mt-6 flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success(`You're on the ${partner} list — we'll be in touch.`);
            setEmail("");
            setMsg("");
          }}
        >
          <label htmlFor={`e-${partner}`} className="font-mono text-xs uppercase">{waitlist ? "Join the waitlist" : "Notify me"}</label>
          <div className="flex gap-2">
            <input id={`e-${partner}`} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@lab.org" className="flex-1 border border-border bg-background px-3 py-2 font-mono text-sm" />
            <button className="bg-primary px-4 font-mono text-xs uppercase text-primary-foreground hover:bg-primary/85">{waitlist ? "Join" : "Notify"}</button>
          </div>
          {waitlist && (
            <textarea value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Inquiry (optional) — volume, use case, questions" rows={2} className="border border-border bg-background px-3 py-2 text-sm" />
          )}
        </form>
      </div>
    </article>
  );
}
