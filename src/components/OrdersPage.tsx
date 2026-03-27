import { Package } from "lucide-react";
import { useOrders } from "@/hooks/useOrders";
import { useAuth } from "@/hooks/useAuth";

const statusColors: Record<string, string> = {
  confirmed: "text-primary bg-gold-light",
  shipped: "text-accent bg-accent/10",
  delivered: "text-green-700 bg-green-100",
};

const OrdersPage = () => {
  const { user } = useAuth();
  const { data: orders, isLoading } = useOrders();

  if (!user) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center pt-24 text-muted-foreground px-4">
        <Package className="w-16 h-16 mb-4 opacity-40" />
        <p className="font-display text-lg font-semibold text-foreground">Sign in to view orders</p>
        <p className="text-sm mt-1 text-center">Please sign in from the Profile tab to see your orders.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="animate-fade-in px-4 pt-4 pb-20 space-y-4">
        <h2 className="font-display text-xl font-bold text-foreground">My Orders</h2>
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse border rounded-lg p-4 h-32 bg-secondary" />
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center pt-24 text-muted-foreground px-4">
        <Package className="w-16 h-16 mb-4 opacity-40" />
        <p className="font-display text-lg font-semibold text-foreground">No orders yet</p>
        <p className="text-sm mt-1 text-center">Your order history will appear here after you place an order.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in px-4 pt-4 pb-20 space-y-4">
      <h2 className="font-display text-xl font-bold text-foreground">My Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Order #{order.order_number}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(order.created_at).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric",
                })}
              </p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[order.status] || ""}`}>
              {order.status}
            </span>
          </div>
          {order.order_items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-foreground">{item.product_name} × {item.quantity}</span>
              <span className="font-medium text-foreground">₹{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm font-bold border-t pt-2">
            <span>Total</span>
            <span>₹{order.total.toLocaleString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
