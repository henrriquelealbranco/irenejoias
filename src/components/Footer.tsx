import { CATEGORIES } from "../data/products";
import { catalogHref, INSTAGRAM, WHATSAPP } from "../navigation";
import { Icon } from "./Icon";
import { Wordmark } from "./Header";
export function DemoNotice() {
  return (
    <p className="demoNotice">
      Produtos, preços e disponibilidade demonstrativos. As fotografias são
      ilustrativas e não representam peças reais da Irene.
    </p>
  );
}
export function Footer() {
  return (
    <footer className="siteFooter">
      <div className="container footerGrid">
        <div className="footerBrand">
          <a className="brand" href="#/" aria-label="Irene Semijoias — início">
            <Wordmark />
          </a>
          <p>
            Beleza e autoestima
            <br />
            em cada detalhe.
          </p>
          <span className="location">
            <Icon name="pin" width={16} height={16} /> Guarapuava · Paraná
          </span>
        </div>
        <div>
          <h3>Encontre seu brilho</h3>
          <a href={catalogHref()}>Todas as peças</a>
          {CATEGORIES.map((c) => (
            <a key={c} href={catalogHref(c)}>
              {c}
            </a>
          ))}
        </div>
        <div>
          <h3>Seu espaço</h3>
          <a href="#/favoritos">Meus favoritos</a>
          <a href="#/carrinho">Meu carrinho</a>
          <a href="#/marca">Conheça a Irene</a>
          <a href="#/sobre-a-demo">Sobre esta demonstração</a>
        </div>
        <div>
          <h3>Vamos conversar?</h3>
          <p>
            Acompanhe a marca e conheça
            <br />
            as peças reais.
          </p>
          <a
            className="externalLink"
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="instagram" width={17} height={17} /> Instagram{" "}
            <Icon name="arrow" width={16} height={16} />
          </a>
          <a
            className="externalLink"
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
          >
            Conversar no WhatsApp <Icon name="arrow" width={16} height={16} />
          </a>
          <small>Atendimento em todo o Brasil.</small>
        </div>
      </div>
      <div className="container footerBottom">
        <span>Irene Semijoias · Proposta de loja virtual</span>
        <a href="#/sobre-a-demo">Demonstração sem pedidos ou pagamentos</a>
      </div>
      <div className="container">
        <DemoNotice />
      </div>
    </footer>
  );
}
