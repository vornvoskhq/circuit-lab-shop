import { Factory, Network, KeyRound, Radar } from "lucide-react";

export const previewCategories = [
  "Industrial Electronics",
  "CAN Bus Tools",
  "Physical and Electronic Entry Tools",
  "Counter Surveillance Electronics",
];

export const previews = [
  {
    category: "Industrial Electronics",
    title: "Industrial Electronics",
    description: "Contactors, relays, PLC I/O and panel hardware.",
    icon: Factory,
    hash: "upcoming",
    action: "Notify me",
  },
  {
    category: "CAN Bus Tools",
    title: "CAN bus analyzers & interfaces",
    description: "Analyzers, transceivers, breakout harnesses and sniffers.",
    icon: Network,
    hash: "upcoming",
    action: "Inquire",
  },
  {
    category: "Physical and Electronic Entry Tools",
    title: "Physical & electronic entry tools",
    description: "Locksport, RFID/NFC research and access-control test gear.",
    icon: KeyRound,
    hash: "upcoming",
    action: "Inquire",
  },
  {
    category: "Counter Surveillance Electronics",
    title: "Counter surveillance electronics",
    description: "RF detectors, spectrum sweepers and NLJD components.",
    icon: Radar,
    hash: "upcoming",
    action: "Notify me",
  },
];
