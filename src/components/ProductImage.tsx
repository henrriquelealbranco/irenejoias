import { useState } from "react";
import type { Product } from "../types";
export function ProductImage({
  product,
  className = "",
  loading = "lazy",
}: {
  product: Product;
  className?: string;
  loading?: "eager" | "lazy";
}) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      className={className}
      src={
        failed
          ? import.meta.env.BASE_URL + "images/fallback.svg"
          : product.image
      }
      alt={product.name + " — fotografia ilustrativa"}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
