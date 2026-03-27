import { useState, useCallback } from "react";
import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";
import SareeCard from "@/components/SareeCard";
import Cart, { type CartItem } from "@/components/Cart";
import Checkout from "@/components/Checkout";
import ProductDetail from "@/components/ProductDetail";
import BottomNav from "@/components/BottomNav";
import SearchPage from "@/components/SearchPage";
import OrdersPage from "@/components/OrdersPage";
import ProfilePage from "@/components/ProfilePage";
import AuthPage from "@/components/AuthPage";
import { useAuth } from "@/hooks/useAuth";
import { useProducts, type Product } from "@/hooks/useProducts";
import { usePlaceOrder } from "@/hooks/useOrders";
import { toast } from "sonner";

// Map Product from DB to the Saree-like shape used by UI components
const toSaree = (p: Product) => ({
  id: p.id,
  name: p.name,
  price: p.price,
  originalPrice: p.original_price,
  image: p.image_url,
  category: p.category,
  description: p.description,
});

export type Saree = ReturnType<typeof toSaree>;

type Tab = "home" | "search" | "orders" | "profile";

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: products, isLoading: productsLoading } = useProducts();
  const placeOrder = usePlaceOrder();

  const [tab, setTab] = useState<Tab>("home");
  const [category, setCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSaree, setSelectedSaree] = useState<Saree | null>(null);

  const sarees = (products ?? []).map(toSaree);
  const filtered = category === "All" ? sarees : sarees.filter((s) => s.category === category);
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

  const updateQty = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.saree.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.saree.id !== id));
  }, []);

  const handleCheckout = () => {
    if (!user) {
      setCartOpen(false);
      toast.error("Please sign in to checkout");
      setTab("profile");
      return;
    }
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderPlaced = async (delivery: {
    name: string; phone: string; address: string; city: string; pincode: string;
  }) => {
    try {
      await placeOrder.mutateAsync({
        items: cart.map((i) => ({
          product_id: i.saree.id,
          product_name: i.saree.name,
          quantity: i.qty,
          price: i.saree.price,
        })),
        total: cart.reduce((s, i) => s + i.saree.price * i.qty, 0),
        delivery,
      });
      setCart([]);
      setCheckoutOpen(false);
      setTab("orders");
      toast.success("Order placed successfully!");
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  };

  const handleTabChange = (t: Tab) => {
    setSelectedSaree(null);
    setTab(t);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary font-display text-xl">✦ Vastra</div>
      </div>
    );
  }

  // Show auth page in profile tab if not logged in
  if (tab === "profile" && !user) {
    return (
      <div className="max-w-md mx-auto pb-16">
        <AuthPage />
        <BottomNav active={tab} onChange={handleTabChange} />
      </div>
    );
  }

  if (selectedSaree) {
    return (
      <div className="max-w-md mx-auto">
        <ProductDetail
          saree={selectedSaree}
          onBack={() => setSelectedSaree(null)}
          onAddToCart={(s) => {
            addToCart(s);
            setSelectedSaree(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto pb-16">
      {tab === "home" && (
        <>
          <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
          <main className="px-4 pb-8">
            <div className="py-5">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Handcrafted Sarees
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Timeless elegance, woven with tradition
              </p>
            </div>
            <CategoryFilter active={category} onChange={setCategory} />
            {productsLoading ? (
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="animate-pulse bg-secondary rounded-lg aspect-[3/4]" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 mt-4">
                {filtered.map((saree) => (
                  <div key={saree.id} onClick={() => setSelectedSaree(saree)} className="cursor-pointer">
                    <SareeCard saree={saree} onAdd={addToCart} />
                  </div>
                ))}
              </div>
            )}
          </main>
        </>
      )}

      {tab === "search" && (
        <>
          <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
          <SearchPage sarees={sarees} onAddToCart={addToCart} onSelectSaree={setSelectedSaree} />
        </>
      )}

      {tab === "orders" && (
        <>
          <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
          <OrdersPage />
        </>
      )}

      {tab === "profile" && (
        <>
          <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
          <ProfilePage />
        </>
      )}

      <BottomNav active={tab} onChange={handleTabChange} />

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onCheckout={handleCheckout}
      />

      <Checkout
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        onOrderPlaced={handleOrderPlaced}
      />
    </div>
  );
};

export default Index;
