import { useState, useCallback } from "react";
import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";
import SareeCard from "@/components/SareeCard";
import Cart, { type CartItem } from "@/components/Cart";
import { sarees, type Saree } from "@/data/sarees";
import { toast } from "sonner";

const Index = () => {
  const [category, setCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const filtered =
    category === "All" ? sarees : sarees.filter((s) => s.category === category);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = useCallback((saree: Saree) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.saree.id === saree.id);
      if (existing) {
        return prev.map((i) =>
          i.saree.id === saree.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { saree, qty: 1 }];
    });
    toast.success(`${saree.name} added to bag`);
  }, []);

  const updateQty = useCallback((id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.saree.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback((id: number) => {
    setCart((prev) => prev.filter((i) => i.saree.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <main className="px-4 pb-8">
        {/* Hero */}
        <div className="py-5">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Handcrafted Sarees
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Timeless elegance, woven with tradition
          </p>
        </div>

        <CategoryFilter active={category} onChange={setCategory} />

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {filtered.map((saree) => (
            <SareeCard key={saree.id} saree={saree} onAdd={addToCart} />
          ))}
        </div>
      </main>

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
      />
    </div>
  );
};

export default Index;
