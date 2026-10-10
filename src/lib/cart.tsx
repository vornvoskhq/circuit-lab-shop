import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct } from "./products";

type Line = { slug: string; qty: number };
type Ctx = {
  lines: Line[];
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  count: number;
  total: number;
};

const CartCtx = createContext<Ctx | null>(null);
const KEY = "cc-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  useEffect(() => {
    try {
      setLines(JSON.parse(localStorage.getItem(KEY) || "[]"));
    } catch {}
  }, []);
  const save = (l: Line[]) => {
    setLines(l);
    localStorage.setItem(KEY, JSON.stringify(l));
  };
  const add = (slug: string, qty = 1) => {
    const ex = lines.find((l) => l.slug === slug);
    save(ex ? lines.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l)) : [...lines, { slug, qty }]);
  };
  const setQty = (slug: string, qty: number) =>
    save(qty <= 0 ? lines.filter((l) => l.slug !== slug) : lines.map((l) => (l.slug === slug ? { ...l, qty } : l)));
  const remove = (slug: string) => save(lines.filter((l) => l.slug !== slug));
  const count = lines.reduce((a, l) => a + l.qty, 0);
  const total = lines.reduce((a, l) => a + (getProduct(l.slug)?.price ?? 0) * l.qty, 0);
  return (
    <CartCtx.Provider value={{ lines, add, setQty, remove, clear: () => save([]), count, total }}>
      {children}
    </CartCtx.Provider>
  );
}

export const useCart = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside provider");
  return c;
};
