import saree1 from "@/assets/saree1.jpg";
import saree2 from "@/assets/saree2.jpg";
import saree3 from "@/assets/saree3.jpg";
import saree4 from "@/assets/saree4.jpg";
import saree5 from "@/assets/saree5.jpg";
import saree6 from "@/assets/saree6.jpg";

export const categories = ["All", "Silk", "Cotton", "Bridal"];

// Map DB image_url values to imported assets
const imageMap: Record<string, string> = {
  "/saree1.jpg": saree1,
  "/saree2.jpg": saree2,
  "/saree3.jpg": saree3,
  "/saree4.jpg": saree4,
  "/saree5.jpg": saree5,
  "/saree6.jpg": saree6,
};

export const resolveImage = (imageUrl: string): string => {
  if (imageUrl.startsWith("http")) return imageUrl;
  return imageMap[imageUrl] || imageUrl;
};
