import { useState, useCallback } from "react";
import Header from "@/components/Header";
import CategoryFilter from "@/components/CategoryFilter";
import SareeCard from "@/components/SareeCard";
import Cart, { type CartItem } from "@/components/Cart";
import Checkout from "@/components/Checkout";
import ProductDetail from "@/components/ProductDetail";
import BottomNav from "@/components/BottomNav";
import SearchPage from "@/components/SearchPage";
import OrdersPage, { type Order } from "@/components/OrdersPage";
import ProfilePage from "@/components/ProfilePage";
import { sarees, type Saree } from "@/data/sarees";
import { toast } from "sonner";

type Tab = "home" | "search" | "orders" | "profile";

const Index = () => {
  const [tab, setTab] = useState<Tab>("home");
  const [category, setCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedSaree, setSelectedSaree] = useState<Saree | null>(null);

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

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderPlaced = () => {
    const newOrder: Order = {
      id: String(Date.now()).slice(-6),
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      items: cart.map((i) => ({
        name: i.saree.name,
        qty: i.qty,
        price: i.saree.price,
      })),
      total: cart.reduce((s, i) => s + i.saree.price * i.qty, 0),
      status: "confirmed",
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setTimeout(() => {
      setCheckoutOpen(false);
      setTab("orders");
      toast.success("Order placed successfully!");
    }, 2600);
  };

  const handleTabChange = (t: Tab) => {
    setSelectedSaree(null);
    setTab(t);
  };

  // Product detail view
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
            <div className="grid grid-cols-2 gap-3 mt-4">
              {filtered.map((saree) => (
                <div key={saree.id} onClick={() => setSelectedSaree(saree)} className="cursor-pointer">
                  <SareeCard saree={saree} onAdd={addToCart} />
                </div>
              ))}
            </div>
          </main>
        </>
      )}

      {tab === "search" && (
        <>
          <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
          <SearchPage onAddToCart={addToCart} onSelectSaree={setSelectedSaree} />
        </>
      )}

      {tab === "orders" && (
        <>
          <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
          <OrdersPage orders={orders} />
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
