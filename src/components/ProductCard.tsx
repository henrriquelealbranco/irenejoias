// Product media / favorite composition adapted from the original MIT-licensed ProductCard.
import type { Product } from "../types";
import { formatPrice } from "../utils";
import { useStore } from "../store/StoreContext";
import { Icon } from "./Icon";
import { ProductImage } from "./ProductImage";
export function ProductCard({ product }: { product: Product }) {
  const { state, dispatch, notify } = useStore();
  const favorite = !!state.favorites[product.id];
  return (
    <article className="productCard">
      <div className="cardMedia">
        <a
          href={"#/produto/" + product.id}
          aria-label={"Conhecer " + product.name}
        >
          <ProductImage product={product} />
        </a>
        <button
          className={
            "favoriteButton iconButton" + (favorite ? " isFavorite" : "")
          }
          aria-label={
            (favorite ? "Remover " : "Salvar ") +
            product.name +
            (favorite ? " dos favoritos" : " nos favoritos")
          }
          aria-pressed={favorite}
          onClick={() => {
            dispatch({ type: "fav/toggle", productId: product.id });
            notify(
              favorite
                ? "Peça removida dos favoritos."
                : "Peça salva nos favoritos.",
            );
          }}
        >
          <Icon name="heart" width={19} height={19} />
        </button>
        <span className="imageCaption">Imagem ilustrativa</span>
      </div>
      <div className="cardBody">
        <span className="productMeta">{product.category} · Visual dourado</span>
        <a className="productName" href={"#/produto/" + product.id}>
          {product.name}
        </a>
        <div className="cardBottom">
          <span>{formatPrice(product.priceCents)}</span>
          <a
            className="cardExplore"
            href={"#/produto/" + product.id}
            aria-label={"Ver " + product.name}
          >
            <Icon name="arrow" width={19} height={19} />
          </a>
        </div>
      </div>
    </article>
  );
}
