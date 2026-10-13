import { EDITORIAL_IMAGE } from "../data/products";
import { INSTAGRAM, WHATSAPP } from "../navigation";
import { Icon } from "./Icon";
export function BrandPage() {
  return (
    <section className="container innerPage">
      <div className="breadcrumbs">
        <a href="#/">Início</a>
        <span>/</span>
        <span>A Irene</span>
      </div>
      <div className="brandPageLayout">
        <div>
          <span className="eyebrow">IRENE SEMIJOIAS</span>
          <h1>
            A beleza de
            <br />
            <em>se reconhecer.</em>
          </h1>
          <p className="largeCopy">
            Beleza e autoestima através das semijoias.
          </p>
          <p>
            A Irene Semijoias está em Guarapuava, no Paraná, e atende todo o
            Brasil. Uma marca para quem encontra nos detalhes uma forma de
            expressar a própria beleza.
          </p>
          <p>
            Conheça as peças reais, tire suas dúvidas e acompanhe a marca pelos
            canais oficiais.
          </p>
          <div className="brandPageActions">
            <a
              className="primaryButton"
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
            >
              <Icon name="instagram" width={20} height={20} /> Conheça no
              Instagram
            </a>
            <a
              className="textLink"
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
            >
              Conversar no WhatsApp <Icon name="arrow" width={19} height={19} />
            </a>
          </div>
          <small className="muted">
            O visual desta loja é uma proposta de demonstração.
          </small>
        </div>
        <div className="brandPageImage">
          <img
            src={EDITORIAL_IMAGE}
            alt="Composição de colares — fotografia ilustrativa de banco de imagens"
          />
          <span className="imageCaption">
            Fotografia ilustrativa · não é uma imagem da marca
          </span>
        </div>
      </div>
    </section>
  );
}
