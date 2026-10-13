# Gostosão Lanches · Cardápio digital

Cardápio online do **Gostosão Lanches** (Cristo Rei, Teresina – PI), aberto pelo QR code de cada mesa.
Projeto real em produção, feito com Next.js 16, TypeScript e Tailwind CSS 4 e exportado como site 100% estático.

<p align="center">
  <img src="docs/screenshots/celular.png" alt="Três telas do cardápio no celular: topo com o selo da mesa, barra de categorias fixa em Cervejas e busca por bacon" width="860">
</p>

## Funcionalidades

- **Cardápio completo** (86 itens em 11 seções) com a identidade do cardápio impresso: preto, vermelho e preço em pílula.
- **Busca sem acento** por nome, ingrediente ou categoria: `bacon`, `suco caju`, `xtudo`, `agua de coco`.
- **Barra de categorias fixa** que acompanha a rolagem e destaca a seção atual.
- **Selo da mesa**: quem chega pelo QR code vê “Mesa 07” no topo (`/?mesa=7`).
- **Cartões de mesa prontos para imprimir** em `/qrcodes`, em A6 (4 por folha) ou A5 (2 por folha).
- **Rápido no 4G**: HTML estático, fotos em WebP e fonte servida pelo próprio site.
- **SEO e compartilhamento**: metadados, imagem de prévia para WhatsApp e Instagram, dados estruturados [schema.org](https://schema.org/Restaurant), sitemap e robots.
- **Acessível**: HTML semântico, foco visível, contraste AA e zero violações no [axe](https://github.com/dequelabs/axe-core) (WCAG 2.1 AA).

## Stack

| Camada | Escolha |
| --- | --- |
| Framework | Next.js 16 (App Router, `output: "export"`) e React 19 |
| Linguagem | TypeScript (strict) |
| Estilo | Tailwind CSS 4 com tokens da marca em `globals.css` |
| QR codes | [`qrcode`](https://www.npmjs.com/package/qrcode), gerados no build |
| Testes | Vitest |
| CI | GitHub Actions: lint, tipos, testes e build a cada push |
| Hospedagem | Vercel, com deploy automático via GitHub |

## Rodando localmente

Requer Node.js 22.12 ou mais recente.

```bash
npm install
npm run dev       # http://localhost:3000 (teste uma mesa em http://localhost:3000/?mesa=7)
npm run check     # lint + tipos + testes
npm run build     # gera a pasta out/
npm run preview   # serve a pasta out/ como em produção
```

## Atualizando o cardápio

Tudo fica em [`src/data/menu.ts`](src/data/menu.ts). Os preços estão em centavos (R$ 18,00 → `1800`), o que evita erros de arredondamento.

1. Edite o item.
2. Faça commit e push na `main`.
3. A Vercel publica a nova versão em cerca de 1 minuto. Os QR codes impressos continuam valendo, porque guardam só o endereço.

Os testes conferem ids únicos, preços válidos e se as imagens existem, então um erro de digitação quebra o CI antes de chegar ao cliente.

## Deploy

1. Suba o repositório para o GitHub.
2. Na Vercel: **Add New → Project → Import** do repositório. Não precisa de configuração extra.
3. A partir daí, cada push na `main` vai para produção e cada pull request ganha uma URL de preview.

O endereço usado nos QR codes e nas prévias de link é detectado sozinho pela variável `VERCEL_PROJECT_PRODUCTION_URL`. Com domínio próprio, defina `NEXT_PUBLIC_SITE_URL` (veja [`.env.example`](.env.example)).

> **Uso comercial:** o plano Hobby (gratuito) da Vercel é só para projetos pessoais e não comerciais. Antes de os QR codes irem para as mesas, migre para o Vercel Pro ou para outra hospedagem que permita uso comercial no plano gratuito, como a Cloudflare. Como o site é estático, basta apontar o build (`npm run build`) e a pasta `out`.

## QR codes das mesas

1. **Defina o domínio final antes de imprimir.** O QR code guarda o endereço; se ele mudar, os cartões param de funcionar.
2. Ajuste a quantidade de mesas em `tables`, no arquivo [`src/config/site.ts`](src/config/site.ts).
3. Abra `/qrcodes` no site publicado, escolha o tamanho e clique em **Imprimir**. Ative “Gráficos de plano de fundo” para sair o vermelho.

Cada código abre `https://seu-dominio/?mesa=N`. O número da mesa já vai no código para facilitar uma futura fase de pedidos pela mesa, sem precisar reimprimir nada.

<p align="center">
  <img src="docs/screenshots/qrcodes.png" alt="Folha A4 com quatro cartões de mesa, cada um com QR code e número da mesa" width="420">
</p>

## Estrutura

```text
src/
├── app/
│   ├── page.tsx           # cardápio
│   ├── qrcodes/           # cartões de mesa para impressão
│   ├── layout.tsx         # fonte, metadados e tema
│   ├── globals.css        # tokens da marca (Tailwind 4)
│   └── fonts/             # Montserrat (SIL OFL)
├── components/            # Hero, busca, barra de categorias, seções
├── config/site.ts         # dados da lanchonete, mesas e URL do site
├── data/menu.ts           # o cardápio
└── lib/                   # preço, busca, mesa e dados estruturados, com testes
```

## Próximos passos

- [ ] Horário de funcionamento e telefone/WhatsApp
- [ ] Fotos reais dos lanches da casa
- [ ] Pedido pela mesa (WhatsApp ou painel na cozinha)
- [ ] Painel para o dono atualizar preços sem mexer em código

## Créditos

Desenvolvido por Hederson Lima, com a colaboração do Claude (Anthropic).
Cardápio, marca e fotos pertencem ao Gostosão Lanches. O código está sob a [licença MIT](LICENSE).
