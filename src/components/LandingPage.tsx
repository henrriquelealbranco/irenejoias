import {
  CATEGORIES,
  PRODUCTS,
  FEATURED_IDS,
  HERO_IMAGE,
  EDITORIAL_IMAGE,
} from "../data/products";
import { catalogHref, INSTAGRAM } from "../navigation";
import { ProductCard } from "./ProductCard";
import { Icon } from "./Icon";
import { DemoNotice } from "./Footer";
export function LandingPage() {
  const featured = FEATURED_IDS.map((id) => PRODUCTS.find((p) => p.id === id)!);
  return (
    <>
      <section className="hero container">
        <div className="heroCopy">
          <span className="eyebrow">
            <span className="goldLine" /> BELEZA QUE ACOMPANHA VOCÊ
          </span>
          <h1>
            O seu brilho,
            <br />
            <em>em cada detalhe.</em>
          </h1>
          <p>
            Semijoias para expressar quem você é.
            <br className="desktopBreak" /> Encontre a delicadeza que combina
            com o seu jeito.
          </p>
          <a className="primaryButton" href={catalogHref()}>
            Conheça as peças <Icon name="arrow" width={20} height={20} />
          </a>
          <a
            className="heroSecondary"
            href="#destaques"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("destaques")
                ?.scrollIntoView({ behavior: "auto", block: "start" });
            }}
          >
            Explore a coleção em destaque <span>↓</span>
          </a>
          <div className="heroFoot">
            <span className="fineDiamond">◇</span>
            <span>
              Pequenos detalhes.
              <br />
              <strong>Um brilho só seu.</strong>
            </span>
          </div>
        </div>
        <div className="heroVisual">
          <div className="heroImageFrame">
            <img
              src={HERO_IMAGE}
              alt="Composição ilustrativa de colares e brincos dourados sobre fundo claro"
              loading="eager"
            />
            <span className="heroPhotoCaption">Fotografia ilustrativa</span>
          </div>
          <span className="verticalCaption">
            IRENE SEMIJOIAS · BELEZA & AUTOESTIMA
          </span>
          <div className="heroSignature">
            <span>Feita de detalhes.</span>
            <span className="fineDiamond">✧</span>
          </div>
        </div>
      </section>
      <div className="brandRibbon">
        <div className="container">
          <span>
            <Icon name="spark" width={17} height={17} /> Seu estilo, seu brilho
          </span>
          <span>
            <Icon name="pin" width={17} height={17} /> Guarapuava, Paraná
          </span>
          <span>
            Para todo o Brasil <Icon name="arrow" width={17} height={17} />
          </span>
        </div>
      </div>
      <section className="container homeSection categoriesSection">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">ENCONTRE O SEU FAVORITO</span>
            <h2>Um detalhe para cada versão de você.</h2>
          </div>
          <a className="textLink" href={catalogHref()}>
            Explorar tudo <Icon name="arrow" width={20} height={20} />
          </a>
        </div>
        <div className="categoryGrid">
          {CATEGORIES.map((c, i) => {
            const p = PRODUCTS.find(
              (p) =>
                p.category === c &&
                p.id ===
                  [
                    "argola-classica",
                    "colar-trama",
                    "anel-aurora",
                    "pulseira-trama",
                  ][i],
            )!;
            return (
              <a className="categoryTile" key={c} href={catalogHref(c)}>
                <div className="categoryImage">
                  <img
                    src={p.image}
                    alt={c + " — fotografia ilustrativa"}
                    loading="lazy"
                  />
                </div>
                <div className="categoryLabel">
                  <h3>{c}</h3>
                  <Icon name="arrow" width={23} height={23} />
                </div>
              </a>
            );
          })}
        </div>
      </section>
      <section id="destaques" className="featuredSection">
        <div className="container homeSection">
          <div className="sectionHeading">
            <div>
              <span className="eyebrow">UMA SELEÇÃO PARA SE INSPIRAR</span>
              <h2>Delicadeza em destaque.</h2>
            </div>
            <a className="textLink" href={catalogHref()}>
              Ver todas as peças <Icon name="arrow" width={20} height={20} />
            </a>
          </div>
          <div className="productGrid">
            {featured.map((p) => (
              <ProductCard product={p} key={p.id} />
            ))}
          </div>
          <DemoNotice />
        </div>
      </section>
      <section className="container homeSection editorialSection">
        <div className="editorialImage">
          <img
            src={EDITORIAL_IMAGE}
            alt="Fotografia de banco de imagens: composição de colares sobre roupa neutra"
            loading="lazy"
          />
          <span className="imageCaption">
            Imagem ilustrativa · banco de imagens
          </span>
        </div>
        <div className="editorialCopy">
          <span className="eyebrow">MAIS DO QUE UM ACESSÓRIO</span>
          <h2>
            A beleza de
            <br />
            <em>ser você.</em>
          </h2>
          <p>
            Um detalhe pode mudar o jeito de se olhar. A Irene Semijoias
            apresenta peças para acompanhar sua beleza e sua autoestima, do dia
            a dia aos momentos especiais.
          </p>
          <a className="textLink" href="#/marca">
            Conheça a Irene <Icon name="arrow" width={20} height={20} />
          </a>
        </div>
      </section>
      <section className="instagramSection">
        <div className="container instagramInner">
          <span className="eyebrow">
            <Icon name="instagram" width={20} height={20} /> MAIS INSPIRAÇÃO,
            MAIS IRENE
          </span>
          <h2>Nos encontramos no Instagram.</h2>
          <p>Conheça as peças reais e acompanhe o universo da marca.</p>
          <a
            className="outlineButton"
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
          >
            @irene.semijoias_ <Icon name="arrow" width={19} height={19} />
          </a>
        </div>
      </section>
    </>
  );
}
