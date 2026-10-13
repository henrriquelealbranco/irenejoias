# Plano de implementação — Irene Semijoias

**Objetivo:** concluir o brief autorizado como demonstração local estática.
**Arquitetura:** React/Vite do repositório base, componentes adaptados, catálogo local, reducer e persistência local. Rotas hash para hospedagem estática sem configuração especial.
**Stack:** React 18, TypeScript, Vite, fontes locais Fontsource, Node test runner e Python Playwright.

- [x] Preparar package.json sem servidor; manter LICENSE e distribuir cópia no build. Guardar atribuição em THIRD_PARTY_NOTICES.md. Remover módulos de contas/admin/API e fotos não verificadas do checkout.
- [x] Implementar tipos, produtos, cart.ts, storage.ts e StoreContext.tsx. Testar variações distintas, subtotais, limite de quantidades e restauração inválida.
- [x] Adaptar Header, Footer, ProductCard, ProductImage, Toast; implementar navegação hash e catálogo com busca normalizada e filtros combinados.
- [x] Criar LandingPage e ProductPage com hero editorial, fotos locais licenciadas, galeria com recorte identificado, seleção de aro e compra demonstrativa.
- [x] Implementar CartPage, FavoritesPage e CheckoutPage com resumo, campos obrigatórios e modal acessível que confirma simulação, sem persistir dados pessoais.
- [x] Aplicar CSS responsivo; desktop 1440px, celular 390px e 320px. Controles por teclado, foco visível, diálogos nativos, estados vazios e imagens fallback locais.
- [x] Executar testes Node e Playwright, revisar screenshots de início/produto/catálogo/carrinho/checkout nos dois tamanhos, corrigir falhas, executar build e validar preview estático. Documentar comandos exatos e resultado.

Critérios globais: português; 12 produtos fictícios; aviso discreto e claro; nenhum dado externo em runtime; nenhuma autenticação/pagamento/pedido real; nenhuma promessa comercial inventada. Não publicar nesta etapa.
