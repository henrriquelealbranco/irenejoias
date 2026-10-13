import credits from "../../public/images/demo/credits.json";
import { PRODUCTS } from "../data/products";
import { Icon } from "./Icon";
export function DemoPage() {
  return (
    <section className="container innerPage demoPage">
      <div className="breadcrumbs">
        <a href="#/">Início</a>
        <span>/</span>
        <span>Sobre a demonstração</span>
      </div>
      <span className="eyebrow">UMA PROPOSTA PARA A MARCA</span>
      <h1>Imagine a Irene online.</h1>
      <p className="largeCopy">
        Esta loja apresenta como a experiência de uma futura loja virtual
        poderia funcionar.
      </p>
      <h2>O que você pode experimentar</h2>
      <p>
        Explore 12 produtos fictícios, busque peças, use os filtros, salve
        favoritos e monte o carrinho. Carrinho e favoritos ficam apenas neste
        navegador, usando armazenamento local. No checkout, os campos servem
        somente para experimentar o fluxo.
      </p>
      <div className="checkoutWarning">
        <strong>
          Esta é uma demonstração. Nenhum pedido ou pagamento será realizado.
        </strong>
      </div>
      <h2>Uma proposta visual</h2>
      <p>
        Os nomes, preços, coleções, aros e a disponibilidade dos produtos são
        demonstrativos. As imagens são de banco de imagens e não representam
        peças reais da Irene. A composição tipográfica do nome também é uma
        proposta para esta demonstração, não a logo original da marca.
      </p>
      <h2>Para a loja definitiva</h2>
      <p>
        Serão usados o catálogo e as fotografias reais, preços e estoque
        confirmados, condições comerciais, cálculo de entrega e integração
        segura de pagamentos. Pedidos, atendimento e demais serviços serão
        definidos com a aprovação da proposta.
      </p>
      <h2>Fotografias e créditos</h2>
      <p>
        As fotografias são utilizadas sob a{" "}
        <a
          href="https://www.pexels.com/license/"
          target="_blank"
          rel="noreferrer"
        >
          licença Pexels
        </a>
        . Há recortes de detalhe na galeria. O uso não implica endosso da marca
        pelos fotógrafos ou pela pessoa retratada.
      </p>
      <details className="creditsDetails">
        <summary>
          Ver origem de cada fotografia <span>+</span>
        </summary>
        <ul className="creditsList">
          {credits.images.map((im) => (
            <li key={im.filename}>
              <a href={im.source} target="_blank" rel="noreferrer">
                {im.photographer} <Icon name="arrow" width={16} height={16} />
              </a>
              <span>
                {PRODUCTS.find((p) => p.image.endsWith("/" + im.filename))
                  ?.name ??
                  (im.filename === "hero.webp"
                    ? "Composição de colares e brincos"
                    : "Inspiração de estilo")}
              </span>
            </li>
          ))}
        </ul>
      </details>
      <a className="primaryButton" href="#/catalogo">
        Explorar a demonstração <Icon name="arrow" width={19} height={19} />
      </a>
    </section>
  );
}
