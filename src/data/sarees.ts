import saree1 from "@/assets/saree1.jpg";
import saree2 from "@/assets/saree2.jpg";
import saree3 from "@/assets/saree3.jpg";
import saree4 from "@/assets/saree4.jpg";
import saree5 from "@/assets/saree5.jpg";
import saree6 from "@/assets/saree6.jpg";

export interface Saree {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  description: string;
}

export const sarees: Saree[] = [
  {
    id: 1,
    name: "Royal Banarasi Silk",
    price: 4999,
    originalPrice: 7999,
    image: saree1,
    category: "Silk",
    description: "Handwoven red & gold Banarasi silk with rich zari border",
  },
  {
    id: 2,
    name: "Navy Kanjivaram",
    price: 6499,
    originalPrice: 9999,
    image: saree2,
    category: "Silk",
    description: "Deep navy blue Kanjivaram with intricate golden motifs",
  },
  {
    id: 3,
    name: "Emerald Patola",
    price: 3999,
    originalPrice: 5999,
    image: saree3,
    category: "Cotton",
    description: "Vibrant green Patola with traditional geometric patterns",
  },
  {
    id: 4,
    name: "Pink Banarasi Wedding",
    price: 8999,
    originalPrice: 12999,
    image: saree4,
    category: "Bridal",
    description: "Luxurious magenta Banarasi with silver zari for weddings",
  },
  {
    id: 5,
    name: "Golden Chanderi",
    price: 2999,
    originalPrice: 4499,
    image: saree5,
    category: "Cotton",
    description: "Elegant mustard Chanderi with delicate floral motifs",
  },
  {
    id: 6,
    name: "Purple Mysore Silk",
    price: 5499,
    originalPrice: 7999,
    image: saree6,
    category: "Silk",
    description: "Rich purple Mysore silk with temple border design",
  },
];

export const categories = ["All", "Silk", "Cotton", "Bridal"];
