import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export interface OrderWithItems {
  id: string;
  order_number: string;
  total: number;
  status: string;
  created_at: string;
  delivery_name: string;
  order_items: { product_name: string; quantity: number; price: number }[];
}

export const useOrders = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["orders", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(product_name, quantity, price)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as OrderWithItems[];
    },
  });
};

interface PlaceOrderParams {
  items: { product_id: string; product_name: string; quantity: number; price: number }[];
  total: number;
  delivery: { name: string; phone: string; address: string; city: string; pincode: string };
}

export const usePlaceOrder = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ items, total, delivery }: PlaceOrderParams) => {
      if (!user) throw new Error("Not authenticated");

      const orderNumber = String(Date.now()).slice(-6);

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          order_number: orderNumber,
          total,
          delivery_name: delivery.name,
          delivery_phone: delivery.phone,
          delivery_address: delivery.address,
          delivery_city: delivery.city,
          delivery_pincode: delivery.pincode,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(
          items.map((item) => ({
            order_id: order.id,
            product_id: item.product_id,
            product_name: item.product_name,
            quantity: item.quantity,
            price: item.price,
          }))
        );

      if (itemsError) throw itemsError;
      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
