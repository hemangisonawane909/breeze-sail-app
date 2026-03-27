import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import type { Saree } from "@/pages/Index";

export interface CartItem {
  saree: Saree;
  qty: number;
}

interface CartProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const Cart = ({ open, onClose, items, onUpdateQty, onRemove, onCheckout }: CartProps) => {
  const total = items.reduce((s, i) => s + i.saree.price * i.qty, 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-foreground/30 z-50 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-sm bg-background z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-display text-lg font-bold">Your Bag</h2>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <ShoppingBag className="w-12 h-12" />
            <p className="font-medium">Your bag is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item) => (
                <div key={item.saree.id} className="flex gap-3">
                  <img
                    src={item.saree.image}
                    alt={item.saree.name}
                    className="w-20 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm font-semibold truncate">
                      {item.saree.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      ₹{item.saree.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQty(item.saree.id, -1)}
                        className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-medium w-5 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.saree.id, 1)}
                        className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(item.saree.id)}
                    className="self-start p-1 hover:bg-secondary rounded"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4 border-t space-y-3">
              <div className="flex justify-between font-display font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
