import { describe, expect, it } from "vitest";
import { products } from "@/lib/products";

describe("Repository product media", () => {
  it("has a unique primary photo and complete gallery for every product", () => {
    const counts: Record<string, number> = { "1n5402": 3, "cardwell-zr-75-as": 3, "dual-gang-289-42": 4, "dual-gang-922111-2": 8, "hammarlund-es-675536-9": 3, "blue-rocker-switch": 1, "johnson-ks-16471l1": 2, "knight-1255": 8, "lm317": 2, "pn2907a": 2, "triple-gang-153210": 3 };
    expect(products).toHaveLength(11);
    expect(new Set(products.map((p) => p.image)).size).toBe(11);
    for (const product of products) {
      expect(product.images).toHaveLength(counts[product.slug] ?? 0);
      expect(product.image).toBe(product.images[0]);
      expect(product.image).toContain("/__l5e/assets-v1/");
      if (product.slug !== "blue-rocker-switch") expect(product.datasheets.length).toBeGreaterThan(0);
      for (const sheet of product.datasheets) expect(sheet.url).toMatch(/\.pdf$/);
    }
  });
});