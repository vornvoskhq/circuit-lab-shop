import { describe, expect, it } from "vitest";
import { products } from "@/lib/products";

describe("Repository product media", () => {
  it("has a unique primary photo and complete gallery for every product", () => {
    const counts: Record<string, number> = {
      "1n5402": 2,
      "cardwell-zr-75-as": 2,
      "dual-gang-289-42": 3,
      "dual-gang-922111-2": 7,
      "hammarlund-es-675536-9": 2,
      "blue-rocker-switch": 1,
      "johnson-ks-16471l1": 1,
      "knight-1255": 7,
      lm317: 1,
      pn2907a: 1,
      "triple-gang-153210": 2,
    };
    expect(products).toHaveLength(11);
    expect(new Set(products.map((p) => p.image)).size).toBe(11);
    for (const product of products) {
      expect(product.images).toHaveLength(counts[product.slug] ?? 0);
      expect(product.image).toBe(product.images[0]);
      expect(product.image).toMatch(/^\/products\//);
      if (product.slug !== "blue-rocker-switch")
        expect(product.datasheets.length).toBeGreaterThan(0);
      for (const sheet of product.datasheets) expect(sheet.url).toMatch(/\.pdf$/);
    }
  });
});
