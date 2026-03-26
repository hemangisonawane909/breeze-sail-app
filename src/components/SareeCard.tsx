import { Plus } from "lucide-react";
import type { Saree } from "@/data/sarees";

interface SareeCardProps {
  saree: Saree;
  onAdd: (saree: Saree) => void;
}

const SareeCard = ({ saree, onAdd }: SareeCardProps) => {
  const discount = Math.round(
    ((saree.originalPrice - saree.price) / saree.originalPrice) * 100
  );

  return (
    <div className="animate-fade-in group">
      <div className="relative overflow-hidden rounded-lg bg-secondary aspect-[3/4]">
        <img
          src={saree.image}
          alt={saree.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded">
          {discount}% OFF
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onAdd(saree); }}
          className="absolute bottom-2 right-2 w-9 h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-2 px-0.5">
        <h3 className="font-display font-semibold text-sm text-foreground truncate">
          {saree.name}
        </h3>
        <p className="text-xs text-muted-foreground truncate mt-0.5">
          {saree.description}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-sm text-foreground">
            ₹{saree.price.toLocaleString()}
          </span>
          <span className="text-xs text-muted-foreground line-through">
            ₹{saree.originalPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SareeCard;
