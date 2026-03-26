import { Search, X } from "lucide-react";
import { useState } from "react";
import { sarees, type Saree } from "@/data/sarees";
import SareeCard from "@/components/SareeCard";

interface SearchPageProps {
  onAddToCart: (saree: Saree) => void;
  onSelectSaree: (saree: Saree) => void;
}

const SearchPage = ({ onAddToCart, onSelectSaree }: SearchPageProps) => {
  const [query, setQuery] = useState("");

  const results = query.trim()
    ? sarees.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.description.toLowerCase().includes(query.toLowerCase()) ||
          s.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="animate-fade-in px-4 pt-4 pb-20">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search sarees by name, fabric..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full pl-10 pr-10 py-3 bg-secondary rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Results */}
      {query.trim() === "" ? (
        <div className="mt-8 text-center text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="font-medium">Search our collection</p>
          <p className="text-xs mt-1">Try "silk", "wedding", "green"</p>
        </div>
      ) : results.length === 0 ? (
        <div className="mt-8 text-center text-muted-foreground">
          <p className="font-medium">No sarees found</p>
          <p className="text-xs mt-1">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 mt-4">
          {results.map((saree) => (
            <div key={saree.id} onClick={() => onSelectSaree(saree)} className="cursor-pointer">
              <SareeCard saree={saree} onAdd={onAddToCart} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
