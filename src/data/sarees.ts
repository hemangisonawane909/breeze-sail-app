import saree1 from "@/assets/saree1.jpg";
import saree2 from "@/assets/saree2.jpg";
import saree3 from "@/assets/saree3.jpg";
import saree4 from "@/assets/saree4.jpg";
import saree5 from "@/assets/saree5.jpg";
import saree6 from "@/assets/saree6.jpg";
import saree7 from "@/assets/saree7.jpg";
import saree8 from "@/assets/saree8.jpg";
import saree9 from "@/assets/saree9.jpg";
import saree10 from "@/assets/saree10.jpg";
import saree11 from "@/assets/saree11.jpg";
import saree12 from "@/assets/saree12.jpg";
import saree13 from "@/assets/saree13.jpg";
import saree14 from "@/assets/saree14.jpg";
import saree15 from "@/assets/saree15.jpg";
import saree16 from "@/assets/saree16.jpg";
import saree17 from "@/assets/saree17.jpg";
import saree18 from "@/assets/saree18.jpg";
import saree19 from "@/assets/saree19.jpg";
import saree20 from "@/assets/saree20.jpg";

export const categories = ["All", "Silk", "Cotton", "Bridal"];

// Map DB image_url values to imported assets
const imageMap: Record<string, string> = {
  "/saree1.jpg": saree1,
  "/saree2.jpg": saree2,
  "/saree3.jpg": saree3,
  "/saree4.jpg": saree4,
  "/saree5.jpg": saree5,
  "/saree6.jpg": saree6,
  "/saree7.jpg": saree7,
  "/saree8.jpg": saree8,
  "/saree9.jpg": saree9,
  "/saree10.jpg": saree10,
  "/saree11.jpg": saree11,
  "/saree12.jpg": saree12,
  "/saree13.jpg": saree13,
  "/saree14.jpg": saree14,
  "/saree15.jpg": saree15,
  "/saree16.jpg": saree16,
  "/saree17.jpg": saree17,
  "/saree18.jpg": saree18,
  "/saree19.jpg": saree19,
  "/saree20.jpg": saree20,
};

export const resolveImage = (imageUrl: string): string => {
  if (imageUrl.startsWith("http")) return imageUrl;
  return imageMap[imageUrl] || imageUrl;
};
