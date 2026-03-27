import { ArrowLeft, Heart, Share2, ShoppingBag } from "lucide-react";
import type { Saree } from "@/pages/Index";
import { useState } from "react";

interface ProductDetailProps {
  saree: Saree;
  onBack: () => void;
  onAddToCart: (saree: Saree) => void;
}

const ProductDetail = ({ saree, onBack, onAddToCart }: ProductDetailProps) => {
  const [liked, setLiked] = useState(false);
  const discount = Math.round(
    ((saree.originalPrice - saree.price) / saree.originalPrice) * 100
  );

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Image Section */}
      <div className="relative">
        <img
          src={saree.image}
          alt={saree.name}
          className="w-full aspect-[3/4] object-cover"
        />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-background/80 backdrop-blur rounded-full flex items-center justify-center shadow"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setLiked(!liked)}
            className="w-10 h-10 bg-background/80 backdrop-blur rounded-full flex items-center justify-center shadow"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                liked ? "fill-accent text-accent" : "text-foreground"
              }`}
            />
          </button>
          <button className="w-10 h-10 bg-background/80 backdrop-blur rounded-full flex items-center justify-center shadow">
            <Share2 className="w-5 h-5 text-foreground" />
          </button>
        </div>
        <span className="absolute bottom-4 left-4 bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded-full">
          {discount}% OFF
        </span>
      </div>

      {/* Info */}
      <div className="p-5 space-y-4">
        <div>
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {saree.category}
          </span>
          <h1 className="font-display text-2xl font-bold text-foreground mt-1">
            {saree.name}
          </h1>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {saree.description}. This exquisite piece is handwoven by skilled
            artisans using traditional techniques passed down through
            generations. Perfect for weddings, festivals, and special occasions.
          </p>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="font-display text-3xl font-bold text-foreground">
            ₹{saree.price.toLocaleString()}
          </span>
          <span className="text-lg text-muted-foreground line-through">
            ₹{saree.originalPrice.toLocaleString()}
          </span>
          <span className="text-sm font-semibold text-accent">
            Save ₹{(saree.originalPrice - saree.price).toLocaleString()}
          </span>
        </div>

        {/* Details */}
        <div className="border rounded-lg divide-y">
          {[
            ["Fabric", saree.category === "Cotton" ? "Pure Cotton" : "Pure Silk"],
            ["Length", "6.3 meters (with blouse piece)"],
            ["Care", "Dry clean only"],
            ["Delivery", "Free delivery in 5-7 days"],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between px-4 py-3 text-sm">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium text-foreground">{value}</span>
            </div>
          ))}
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => onAddToCart(saree)}
          className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <ShoppingBag className="w-5 h-5" />
          Add to Bag
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
