# Irene Semijoias — demonstração

O brief do usuário é a especificação autorizada: loja estática para apresentação à dona, sem publicação ou serviços externos nesta etapa.

Direção: branco #FFFFFF, porcelana #F9F7F3, carvão #282621, ouro #947446, linha #E5DED4. Cormorant Garamond para títulos e assinatura tipográfica; Manrope para leitura e controles. Cabeçalho central inspirado no original, navegação de categorias, hero com composição editorial e fotografia grande, cards com fotos e favoritos, seção de marca e convite ao Instagram. A tipografia representa uma proposta, não a logo original.

Conservar integralmente o frontend original manteria fluxos de autenticação/servidor fora do escopo; HTML puro perderia o aproveitamento dos componentes React. Escolha: adaptar React/Vite e o padrão do store original, mantendo LICENSE, ícones e composição visual, substituindo as dependências remotas por dados locais.

Rotas hash: /, /catalogo com categoria e busca em query, /produto/:id, /carrinho, /favoritos, /checkout e /sobre-a-demo. Funcionam em hospedagem estática e em subpastas sem reescrita de servidor.

12 produtos fictícios, 3 por categoria; fotos de banco licenciadas, identificadas como ilustrativas. Preços em reais, sem descontos, avaliações, garantias ou alegações técnicas reais. Variação de aro para anéis. Carrinho diferencia variações. Persistência só de carrinho/favoritos validada em localStorage. Checkout valida campos no navegador e mostra confirmação; não salva, transmite nem gera pedido, e não esvazia o carrinho.

Instagram conforme brief; WhatsApp 5542999992166 confirmado no print fornecido. Ambos apenas links após clique. Sem newsletter ou contas. Fontes e imagens locais.

Validação: testes de quantidades, variações, armazenamento inválido e busca sem acentos; Playwright desktop e celular para rotas, busca, filtros, galeria, favoritos, carrinho, checkout, imagens, overflow e ausência de requests externos. Build TypeScript/Vite; revisão visual de screenshots. README com comandos e limites.
