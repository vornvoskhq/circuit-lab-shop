import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProductGallery({ name, images }: { name: string; images: string[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  return (
    <div className="min-w-0" aria-label={`${name} photo gallery`}>
      <div className="relative border border-border bg-muted">
        <img src={current} alt={`${name} — ${active === 0 ? "header photo" : `angle ${active}`}`} width={816} height={816} className="aspect-square w-full object-contain" />
        {images.length > 1 && <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
          <Button variant="outline" size="icon" aria-label="Previous photo" title="Previous photo" onClick={() => setActive((active + images.length - 1) % images.length)}><ChevronLeft /></Button>
          <span className="bg-background/90 px-3 py-2 font-mono text-xs" aria-live="polite">{active + 1} / {images.length}</span>
          <Button variant="outline" size="icon" aria-label="Next photo" title="Next photo" onClick={() => setActive((active + 1) % images.length)}><ChevronRight /></Button>
        </div>}
      </div>
      {images.length > 1 && <div className="mt-3 flex gap-2 overflow-x-auto pb-2" aria-label="Photo thumbnails">
        {images.map((image, index) => <Button key={image} variant="outline" className={`h-20 w-20 shrink-0 p-1 ${active === index ? "border-primary ring-1 ring-ring" : "border-border"}`} aria-label={`Show photo ${index + 1}`} aria-pressed={active === index} onClick={() => setActive(index)}>
          <img src={image} alt="" loading="lazy" className="h-full w-full object-contain" />
        </Button>)}
      </div>}
    </div>
  );
}