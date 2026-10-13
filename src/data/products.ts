import type { Product, Category } from "../types";
export const CATEGORIES: Category[] = [
  "Brincos",
  "Colares",
  "Anéis",
  "Pulseiras",
];
const image = (name: string) =>
  import.meta.env.BASE_URL + "images/demo/" + name + ".webp";
export const PRODUCTS: Product[] = [
  {
    id: "argola-textura",
    name: "Argola Textura",
    category: "Brincos",
    priceCents: 8900,
    collection: "Formas",
    description:
      "Pequenas curvas com uma textura que encontra a luz. Uma proposta de argola para dar personalidade aos seus detalhes.",
    image: image("earrings-1"),
    variants: [],
  },
  {
    id: "argola-classica",
    name: "Argola Clássica",
    category: "Brincos",
    priceCents: 7900,
    collection: "Essenciais",
    description:
      "Uma silhueta circular, de linhas limpas e visual dourado. A inspiração clássica para compor do básico ao especial.",
    image: image("earrings-2"),
    variants: [],
  },
  {
    id: "argola-geometrica",
    name: "Argola Geométrica",
    category: "Brincos",
    priceCents: 9900,
    collection: "Formas",
    description:
      "Linhas geométricas e curvas suaves se encontram nesta proposta de brinco. Um detalhe com presença e leveza visual.",
    image: image("earrings-3"),
    variants: [],
  },
  {
    id: "colar-delicado",
    name: "Colar Delicado",
    category: "Colares",
    priceCents: 11900,
    collection: "Essenciais",
    description:
      "Uma corrente fina, com um brilho sutil e um desenho minimalista. A proposta perfeita para imaginar novas combinações.",
    image: image("necklaces-1"),
    variants: [],
  },
  {
    id: "colar-trama",
    name: "Colar Trama",
    category: "Colares",
    priceCents: 13900,
    collection: "Essenciais",
    description:
      "A beleza está no encontro dos elos. Uma corrente de aparência dourada que traz textura e um toque de luz à composição.",
    image: image("necklaces-2"),
    variants: [],
  },
  {
    id: "colar-gota",
    name: "Colar Gota",
    category: "Colares",
    priceCents: 15900,
    collection: "Luz",
    description:
      "Um ponto de luz em forma de gota, cercado por detalhes delicados. Uma proposta para acompanhar momentos especiais.",
    image: image("necklaces-3"),
    variants: [],
  },
  {
    id: "anel-luz",
    name: "Anel Luz",
    category: "Anéis",
    priceCents: 6900,
    collection: "Luz",
    description:
      "Uma linha delicada de pequenos pontos de brilho. Imagine esta proposta sozinha ou em uma composição de anéis.",
    image: image("rings-1"),
    variants: ["14", "16", "18", "20"],
  },
  {
    id: "anel-aurora",
    name: "Anel Aurora",
    category: "Anéis",
    priceCents: 8900,
    collection: "Formas",
    description:
      "Três detalhes retangulares dão ritmo a esta proposta de anel. Uma combinação entre geometria e delicadeza.",
    image: image("rings-2"),
    variants: ["14", "16", "18", "20"],
  },
  {
    id: "anel-elos",
    name: "Anel Elos",
    category: "Anéis",
    priceCents: 7900,
    collection: "Formas",
    description:
      "Elos abertos criam um desenho cheio de personalidade. Uma proposta de anel com textura e visual dourado.",
    image: image("rings-3"),
    variants: ["14", "16", "18", "20"],
  },
  {
    id: "pulseira-brilho",
    name: "Pulseira Brilho",
    category: "Pulseiras",
    priceCents: 10900,
    collection: "Luz",
    description:
      "Pequenos pontos de brilho desenham uma linha sobre o pulso. Uma inspiração delicada para a sua composição.",
    image: image("bracelets-1"),
    variants: [],
  },
  {
    id: "pulseira-trama",
    name: "Pulseira Trama",
    category: "Pulseiras",
    priceCents: 12900,
    collection: "Essenciais",
    description:
      "Uma trama de aparência dourada e desenho fluido. Uma proposta para trazer textura aos detalhes do seu dia.",
    image: image("bracelets-2"),
    variants: [],
  },
  {
    id: "pulseira-elos",
    name: "Pulseira Elos",
    category: "Pulseiras",
    priceCents: 9900,
    collection: "Essenciais",
    description:
      "Elos delicados e um fecho circular compõem esta inspiração. Um desenho simples para imaginar suas combinações.",
    image: image("bracelets-3"),
    variants: [],
  },
].map((p) => ({ ...p, finish: "Dourado" as const })) as Product[];
export const EDITORIAL_IMAGE = image("editorial");
export const HERO_IMAGE = image("hero");
export const FEATURED_IDS = [
  "argola-textura",
  "colar-delicado",
  "anel-aurora",
  "pulseira-brilho",
];
