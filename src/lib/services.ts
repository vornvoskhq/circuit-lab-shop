import { Factory, KeyRound, Network, Radar } from "lucide-react";

export const specialtyServices = [
  {
    category: "Industrial Electronics",
    title: "Industrial Electronics",
    description:
      "Specialty industrial electronics services for contactors, relays, PLC I/O and panel hardware.",
    icon: Factory,
  },
  {
    category: "CAN Bus Tools",
    title: "CAN Bus Tools",
    description:
      "Specialty CAN bus tooling and support for analyzers, transceivers, breakout harnesses and sniffers.",
    icon: Network,
  },
  {
    category: "Physical & Electronic Entry Tools",
    title: "Physical & Electronic Entry Tools",
    description: "Specialty equipment and support for locksport, RFID/NFC and access-control work.",
    icon: KeyRound,
  },
  {
    category: "Counter-Surveillance Electronics",
    title: "Counter-Surveillance Electronics",
    description:
      "Specialty counter-surveillance equipment and support: RF detectors, spectrum sweepers and NLJD components.",
    icon: Radar,
  },
] as const;

export type SpecialtyService = (typeof specialtyServices)[number];
