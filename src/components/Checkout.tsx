import { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import type { CartItem } from "@/components/Cart";

interface CheckoutProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderPlaced: (delivery: { name: string; phone: string; address: string; city: string; pincode: string }) => void;
}

const Checkout = ({ open, onClose, items, onOrderPlaced }: CheckoutProps) => {
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", pincode: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const total = items.reduce((s, i) => s + i.saree.price * i.qty, 0);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim() || form.phone.length < 10) e.phone = "Valid phone required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.pincode.trim() || form.pincode.length < 6) e.pincode = "Valid pincode required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitted(true);
    setTimeout(() => {
      onOrderPlaced(form);
      setSubmitted(false);
      setForm({ name: "", phone: "", address: "", city: "", pincode: "" });
    }, 2500);
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-foreground/30 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        <div className="bg-background w-full max-w-md rounded-t-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
              <h2 className="font-display text-2xl font-bold text-foreground">Order Confirmed!</h2>
              <p className="text-muted-foreground text-sm mt-2 text-center">
                Thank you, {form.name}! Your sarees will be delivered in 5-7 business days.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-display text-lg font-bold">Checkout</h2>
                <button onClick={onClose} className="p-1 hover:bg-secondary rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <div className="bg-secondary rounded-lg p-3 space-y-2">
                  {items.map((item) => (
                    <div key={item.saree.id} className="flex justify-between text-sm">
                      <span>{item.saree.name} × {item.qty}</span>
                      <span className="font-medium">₹{(item.saree.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm font-bold border-t border-border pt-2">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-display font-semibold text-foreground">Delivery Details</h3>
                  {([
                    { key: "name", label: "Full Name", type: "text", placeholder: "Enter your name" },
                    { key: "phone", label: "Phone Number", type: "tel", placeholder: "10-digit mobile number" },
                    { key: "address", label: "Address", type: "text", placeholder: "House no, Street, Area" },
                    { key: "city", label: "City", type: "text", placeholder: "Your city" },
                    { key: "pincode", label: "Pincode", type: "text", placeholder: "6-digit pincode" },
                  ] as const).map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="text-xs font-medium text-muted-foreground">{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[key]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        className="w-full mt-1 px-3 py-2.5 bg-secondary rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                      {errors[key] && (
                        <p className="text-xs text-accent mt-1">{errors[key]}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-foreground">Payment</h3>
                  <div className="bg-secondary rounded-lg p-3 flex items-center gap-3">
                    <input type="radio" checked readOnly className="accent-primary" />
                    <span className="text-sm font-medium text-foreground">Cash on Delivery (COD)</span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
                >
                  Place Order — ₹{total.toLocaleString()}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
