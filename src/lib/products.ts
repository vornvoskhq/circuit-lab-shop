import varcap from "@/assets/varcap.jpg";
import semis from "@/assets/semis.jpg";
import rocker from "@/assets/rocker.jpg";
import { productMedia } from "@/lib/product-media";

export type Category = "Variable Capacitors" | "Semiconductors & Power" | "Electromechanical";

export interface Product {
  slug: string;
  name: string;
  mfr: string;
  category: Category;
  price: number;
  stock: number;
  image: string;
  summary: string;
  /** Key specs shown on cards */
  key: { label: string; value: string }[];
  /** Full spec sheet */
  specs: { label: string; value: string }[];
  datasheet?: string;
  images: string[];
  datasheets: { label: string; url: string }[];
}

const vc = (
  slug: string,
  name: string,
  mfr: string,
  price: number,
  stock: number,
  range: string,
  gangs: string,
  voltage: string,
  extra: { label: string; value: string }[] = [],
): Omit<Product, "images" | "datasheets"> => ({
  slug,
  name,
  mfr,
  category: "Variable Capacitors",
  price,
  stock,
  image: varcap,
  summary: `${gangs} air-dielectric variable capacitor for RF tuning, antenna matching and oscillator work.`,
  key: [
    { label: "Capacitance", value: range },
    { label: "Sections", value: gangs },
    { label: "Breakdown", value: voltage },
  ],
  specs: [
    { label: "Manufacturer", value: mfr },
    { label: "Capacitance range", value: range },
    { label: "Sections", value: gangs },
    { label: "Dielectric", value: "Air" },
    { label: "Breakdown voltage", value: voltage },
    { label: "Rotation", value: "180°" },
    { label: "Condition", value: "Surplus / tested" },
    ...extra,
  ],
});

const inventory: Omit<Product, "images" | "datasheets">[] = [
  vc("cardwell-zr-75-as", "Cardwell ZR-75-AS", "Cardwell", 64, 3, "7 – 75 pF", "Single", "1,000 V", [
    { label: "Plate spacing", value: "0.030 in" },
    { label: "Shaft", value: '1/4" front, rear extension' },
  ]),
  vc("dual-gang-289-42", "Dual Gang 289-42", "Surplus", 38, 5, "12 – 365 pF / sec", "Dual", "500 V"),
  vc("dual-gang-922111-2", "Dual Gang 922111-2", "Surplus", 46, 4, "15 – 575 pF / sec", "Dual", "500 V", [
    { label: "Tolerance", value: "±5% at max" },
  ]),
  vc("hammarlund-es-675536-9", "Hammarlund ES-675536-9", "Hammarlund", 72, 2, "5 – 50 pF", "Single", "1,200 V", [
    { label: "Construction", value: "Silver-plated brass, ceramic end plates" },
  ]),
  vc("johnson-ks-16471l1", "Johnson KS-16471L1", "E.F. Johnson", 58, 3, "8 – 140 pF", "Single", "1,000 V", [
    { label: "Spec", value: "Western Electric KS-16471 L1" },
  ]),
  vc("knight-1255", "Knight 1255", "Knight (Allied Radio)", 32, 6, "10 – 365 pF", "Single", "500 V"),
  vc("triple-gang-153210", "Triple Gang 153210", "Surplus", 54, 3, "12 – 420 pF / sec", "Triple", "500 V", [
    { label: "Tracking", value: "Matched sections, ±2%" },
  ]),
  {
    slug: "1n5402",
    name: "1N5402 Rectifier Diode",
    mfr: "Vishay / generic",
    category: "Semiconductors & Power",
    price: 0.35,
    stock: 500,
    image: semis,
    summary: "3 A, 200 V general-purpose axial-lead silicon rectifier (DO-201AD).",
    key: [
      { label: "IF(AV)", value: "3 A" },
      { label: "VRRM", value: "200 V" },
      { label: "IFSM surge", value: "200 A" },
    ],
    specs: [
      { label: "Package", value: "DO-201AD axial" },
      { label: "Repetitive reverse voltage", value: "200 V" },
      { label: "Average forward current", value: "3.0 A" },
      { label: "Peak surge current (8.3 ms)", value: "200 A" },
      { label: "Forward voltage @ 3 A", value: "1.0 V max" },
      { label: "Reverse current @ 25 °C", value: "5 µA max" },
      { label: "Operating temperature", value: "−50 to +150 °C" },
    ],
    datasheet: "https://www.vishay.com/docs/88516/1n5400.pdf",
  },
  {
    slug: "pn2907a",
    name: "PN2907A PNP Transistor",
    mfr: "onsemi / generic",
    category: "Semiconductors & Power",
    price: 0.25,
    stock: 800,
    image: semis,
    summary: "General-purpose PNP switching and amplifier transistor in TO-92.",
    key: [
      { label: "VCEO", value: "−60 V" },
      { label: "IC", value: "−600 mA" },
      { label: "hFE", value: "100 – 300" },
    ],
    specs: [
      { label: "Package", value: "TO-92" },
      { label: "Polarity", value: "PNP" },
      { label: "Collector–emitter voltage", value: "−60 V" },
      { label: "Collector current", value: "−600 mA" },
      { label: "DC gain hFE @ 150 mA", value: "100 – 300" },
      { label: "Transition frequency", value: "200 MHz min" },
      { label: "Power dissipation", value: "625 mW" },
    ],
    datasheet: "https://www.onsemi.com/pdf/datasheet/pn2907a-d.pdf",
  },
  {
    slug: "lm317",
    name: "LM317 Adjustable Regulator",
    mfr: "Texas Instruments / generic",
    category: "Semiconductors & Power",
    price: 0.9,
    stock: 250,
    image: semis,
    summary: "Adjustable 1.25–37 V positive linear regulator, 1.5 A, TO-220.",
    key: [
      { label: "Vout", value: "1.25 – 37 V" },
      { label: "Iout", value: "1.5 A" },
      { label: "Ref tol.", value: "±4%" },
    ],
    specs: [
      { label: "Package", value: "TO-220" },
      { label: "Output voltage", value: "1.25 – 37 V adjustable" },
      { label: "Output current", value: "1.5 A" },
      { label: "Reference voltage", value: "1.25 V ±4%" },
      { label: "Line regulation", value: "0.01 %/V typ" },
      { label: "Load regulation", value: "0.1 % typ" },
      { label: "Protection", value: "Thermal, current limit, SOA" },
    ],
    datasheet: "https://www.ti.com/lit/ds/symlink/lm317.pdf",
  },
  {
    slug: "blue-rocker-switch",
    name: "Illuminated Blue Rocker Switch",
    mfr: "KCD4-style",
    category: "Electromechanical",
    price: 2.5,
    stock: 120,
    image: rocker,
    summary: "DPST illuminated rocker, snap-in panel mount, blue lamp.",
    key: [
      { label: "Rating", value: "16 A / 250 VAC" },
      { label: "Poles", value: "DPST" },
      { label: "Lamp", value: "Blue" },
    ],
    specs: [
      { label: "Contact rating", value: "16 A @ 250 VAC, 20 A @ 125 VAC" },
      { label: "Configuration", value: "DPST, ON–OFF" },
      { label: "Terminals", value: '4 × 6.3 mm (1/4") quick-connect' },
      { label: "Panel cutout", value: "30 × 22 mm" },
      { label: "Illumination", value: "Blue neon, 250 V" },
      { label: "Mechanical life", value: "10,000 cycles" },
    ],
  },
];

export const products: Product[] = inventory.map((product) => {
  const media = productMedia[product.slug];
  return {
    ...product,
    image: media?.images[0] ?? product.image,
    images: media?.images ?? [product.image],
    datasheets: media?.datasheets ?? [],
    datasheet: media?.datasheets[0]?.url,
  };
});

export const categories: Category[] = ["Variable Capacitors", "Semiconductors & Power", "Electromechanical"];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const fmt = (n: number) => `$${n.toFixed(2)}`;
