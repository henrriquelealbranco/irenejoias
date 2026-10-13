# Conferência da demonstração

Conferência realizada em 13/10/2026. Build de produção estático servido por Vite Preview, além de teste em servidor HTTP simples dentro da subpasta `/dist/`.

## Resultado

- `npm test`: 5 testes de lógica passaram.
- `npm run build`: TypeScript e Vite concluíram sem erros.
- `python tests/browser_qa.py --url http://127.0.0.1:5188`: fluxos completos passaram em Chromium, desktop 1440×1000 e celular 390×844; verificação de layout das páginas em 320×740.
- Teste adicional com carrinho e checkout preenchidos em 320 px: sem overflow horizontal.
- Teste adicional em `http://127.0.0.1:5189/dist/#/produto/colar-gota`: acesso direto, atualização da página e imagens locais funcionaram sem reescrita de URLs.
- Teste com localStorage bloqueado: a loja montou normalmente, mostrou o aviso e manteve o carrinho em memória.
- Auditoria npm: nenhum alerta nas dependências da versão final instalada.
- `LICENSE`, `public/LICENSE.txt` e `dist/LICENSE.txt`: conteúdos idênticos, SHA-256 `C6B5E7B2E5C0265DF67D78BF4320B6E3E6540521285079B8E2345ECFD287FB89`. LICENSE original sem alteração.

## Comportamentos verificados

Navegação principal e menu no celular; busca global e no catálogo, incluindo busca sem acentos; categorias; combinação de coleção e preço; ordenação; estado sem resultados; favoritos e persistência após reload; produto por URL direta; seleção de detalhe; abertura e fechamento de ampliação via Escape; validação de aro; inclusão de quantidades; aros separados; aumento/redução de quantidade; remoção; subtotais; persistência do carrinho; campos obrigatórios e telefone; confirmação de simulação; ausência de armazenamento de dados pessoais; rotas e reload; estados vazios; JSON corrompido em localStorage; imagens carregadas; links confirmados de Instagram e WhatsApp.

No fluxo completo de produção não houve erros de console, requisições para origens externas ou requisições diferentes de GET. A simulação não alterou o localStorage e não registrou pedidos. A interação com contatos foi conferida no endereço e comportamento dos links; não foram enviadas mensagens.

Capturas de tela das páginas inicial, produto, catálogo, favoritos, carrinho, checkout e confirmação foram revisadas. As quatro capturas para apresentação ficam em `docs/screenshots/`; as demais e o relatório automatizado ficam em `artifacts/qa/`, ignorados no Git.

## Ajustes encontrados durante QA

Corrigidos: atributo de prioridade da imagem incompatível com React 18; expressão de telefone incompatível com o modo de regex do HTML; codificação de acentos em arquivos regravados no Windows. A conferência final foi feita com os arquivos corrigidos. Capturas completas foram ajustadas para iniciar no topo da página, evitando artefatos de posição de cabeçalho fixo durante a captura.

## Limites da conferência

Chromium em tamanhos de desktop e celular, sem teste em aparelhos físicos ou Safari/iOS. Integrações comerciais, pagamento, frete, autenticação e administração estão fora da demonstração. Não houve publicação da loja em hospedagem externa nesta etapa.

## Revisão de textos — 13/10/2026

Revisadas 22 páginas/variações de navegação em desktop 1440×1000 e celular 390×844 no navegador integrado: início, catálogo, quatro categorias, 12 produtos, favoritos, carrinho, marca e explicação da demonstração. Nenhum caractere de codificação quebrada ou overflow horizontal encontrado. Também conferidos mensagens de seleção de aro, inclusão de peça, carrinho com item e checkout preenchido com dados fictícios, incluindo a confirmação.

Padronizados UTF-8 e finais de linha nos arquivos de texto com EditorConfig e atributos Git. A verificação de navegador agora detecta regressões de codificação no texto renderizado, nos placeholders, nas descrições de imagens e nos rótulos acessíveis. Ajustados singular/plural, espaçamento do título do carrinho, preços dos filtros, mensagens de estados vazios e identificação legível das fotografias nos créditos. Testes de lógica e build passaram após a revisão; script de QA verificado sintaticamente. Nenhum erro de console na aba de revisão. O item temporário usado no teste foi removido.
