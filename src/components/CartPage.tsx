import { PRODUCTS } from "../data/products";
import { useStore } from "../store/StoreContext";
import { formatPrice } from "../utils";
import { Icon } from "./Icon";
import { ProductImage } from "./ProductImage";
import { DemoNotice } from "./Footer";
export function EmptyState({ kind }: { kind: "cart" | "favorites" }) {
  return (
    <div className="emptyState">
      <Icon name={kind === "cart" ? "bag" : "heart"} width={40} height={40} />
      <h2>
        {kind === "cart"
          ? "Seu carrinho está vazio."
          : "Seus favoritos ficam aqui."}
      </h2>
      <p>
        {kind === "cart"
          ? "Explore as peças e escolha suas favoritas para simular a experiência."
          : "Toque no coração de uma peça para encontrá-la aqui depois."}
      </p>
      <a className="primaryButton" href="#/catalogo">
        Conhecer as peças <Icon name="arrow" width={19} height={19} />
      </a>
    </div>
  );
}
export function OrderSummary({ checkout = false }: { checkout?: boolean }) {
  const { state, cartSubtotalCents, cartCount } = useStore();
  return (
    <aside className="orderSummary">
      <span className="eyebrow">SEU PEDIDO SIMULADO</span>
      <h2>Resumo</h2>
      {checkout && (
        <div className="checkoutItems">
          {state.cart.map((line) => {
            const p = PRODUCTS.find((p) => p.id === line.productId)!;
            return (
              <div className="checkoutItem" key={line.productId + line.variant}>
                <ProductImage product={p} />
                <div>
                  <strong>{p.name}</strong>
                  <small>
                    {line.variant ? "Aro " + line.variant + " · " : ""}Qtd.{" "}
                    {line.qty}
                  </small>
                </div>
                <span>{formatPrice(p.priceCents * line.qty)}</span>
              </div>
            );
          })}
        </div>
      )}
      <div className="summaryRow">
        <span>
          Subtotal ({cartCount} {cartCount === 1 ? "item" : "itens"})
        </span>
        <span>{formatPrice(cartSubtotalCents)}</span>
      </div>
      <div className="summaryRow muted">
        <span>Entrega</span>
        <span>Não simulada</span>
      </div>
      <div className="summaryTotal">
        <span>Subtotal demonstrativo</span>
        <strong>{formatPrice(cartSubtotalCents)}</strong>
      </div>
      {!checkout && (
        <a href="#/checkout" className="primaryButton">
          Continuar para simulação <Icon name="arrow" width={18} height={18} />
        </a>
      )}
      <p className="summaryNote">
        Valores ilustrativos. Frete e condições comerciais serão definidos na
        loja definitiva.
      </p>
      {checkout && (
        <a className="textLink" href="#/carrinho">
          Editar carrinho <Icon name="arrow" width={17} height={17} />
        </a>
      )}
    </aside>
  );
}
export function CartPage() {
  const { state, dispatch, cartCount, notify } = useStore();
  return (
    <section className="container innerPage">
      <div className="breadcrumbs">
        <a href="#/">Início</a>
        <span>/</span>
        <span>Carrinho</span>
      </div>
      <div className="pageHeading">
        <span className="eyebrow">OS DETALHES QUE VOCÊ ESCOLHEU</span>
        <h1>
          Meu carrinho <span className="headingCount">({cartCount})</span>
        </h1>
      </div>
      {state.cart.length ? (
        <div className="cartLayout">
          <div className="cartLines">
            {state.cart.map((line) => {
              const product = PRODUCTS.find((p) => p.id === line.productId)!;
              return (
                <article
                  className="cartLine"
                  key={line.productId + line.variant}
                >
                  <a className="cartImage" href={"#/produto/" + product.id}>
                    <ProductImage product={product} />
                  </a>
                  <div className="cartLineDetails">
                    <span className="productMeta">{product.category}</span>
                    <a className="cartName" href={"#/produto/" + product.id}>
                      {product.name}
                    </a>
                    <small>
                      Visual dourado{line.variant && " · Aro " + line.variant}
                    </small>
                    <span className="unitPrice">
                      {formatPrice(product.priceCents)} <small>por peça</small>
                    </span>
                    <button
                      className="removeItem"
                      onClick={() => {
                        dispatch({
                          type: "cart/remove",
                          productId: line.productId,
                          variant: line.variant,
                        });
                        notify("Peça removida do carrinho.");
                      }}
                    >
                      Remover
                    </button>
                  </div>
                  <div className="cartQuantity">
                    <div className="quantityControl">
                      <button
                        aria-label={
                          "Diminuir quantidade de " +
                          product.name +
                          (line.variant ? " aro " + line.variant : "")
                        }
                        disabled={line.qty <= 1}
                        onClick={() =>
                          dispatch({
                            type: "cart/setQty",
                            productId: line.productId,
                            variant: line.variant,
                            qty: line.qty - 1,
                          })
                        }
                      >
                        <Icon name="minus" width={16} height={16} />
                      </button>
                      <span aria-live="polite">{line.qty}</span>
                      <button
                        aria-label={
                          "Aumentar quantidade de " +
                          product.name +
                          (line.variant ? " aro " + line.variant : "")
                        }
                        disabled={line.qty >= 99}
                        onClick={() =>
                          dispatch({
                            type: "cart/setQty",
                            productId: line.productId,
                            variant: line.variant,
                            qty: line.qty + 1,
                          })
                        }
                      >
                        <Icon name="plus" width={16} height={16} />
                      </button>
                    </div>
                    <strong>
                      {formatPrice(product.priceCents * line.qty)}
                    </strong>
                  </div>
                </article>
              );
            })}
            <a className="textLink continueShopping" href="#/catalogo">
              Continuar explorando <Icon name="arrow" width={18} height={18} />
            </a>
          </div>
          <OrderSummary />
        </div>
      ) : (
        <EmptyState kind="cart" />
      )}
      <DemoNotice />
    </section>
  );
}
