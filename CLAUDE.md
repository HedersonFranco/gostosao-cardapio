# CLAUDE.md

@AGENTS.md

## O projeto

Cardápio digital do Gostosão Lanches (Av. São Raimundo, 2070 – Cristo Rei, Teresina – PI). Projeto solo de estudo de design de front-end, com uso real pela lanchonete.

- Só consulta de preços. Um único QR code, igual para todas as mesas, abre o site. Sem controle de mesa e sem pedidos.
- Futuro possível: pedido local ou delivery. Não adiantar nada disso sem eu pedir.
- Stack: Next.js 16 (App Router, `output: "export"`), React 19, TypeScript strict, Tailwind CSS 4, Vitest e GitHub Actions.
- Visual "Imersivo": hero com foto de ponta a ponta, Anton nos títulos, Manrope no texto, preto e vermelho da marca.
- Hospedagem: Vercel Hobby para teste e portfólio. Para a lanchonete usar de verdade: Cloudflare (grátis com uso comercial) ou Vercel Pro, com domínio próprio antes de imprimir o QR.

## Como trabalhar comigo

- Quero aprender fazendo. Por padrão, explique, revise, dê dicas e proponha exercícios. Não escreva funcionalidades inteiras nem faça commit ou push sem eu pedir.
- Quando eu disser "faça", pode implementar, e no final explique as decisões que tomou.
- Responda em português.

## Comandos

```bash
npm run dev       # http://localhost:3000
npm run check     # lint + tipos + testes
npm run build     # gera a pasta out/
npm run preview   # serve a pasta out/
```

## Onde fica cada coisa

- `src/data/menu.ts`: o cardápio. Preços em centavos (R$ 18,00 = `1800`). O lanche em destaque fica em `highlight`.
- `src/config/site.ts`: dados da lanchonete e URL do site (`NEXT_PUBLIC_SITE_URL` ou `VERCEL_PROJECT_PRODUCTION_URL`).
- `src/components/`: Hero, CategoryTiles (carrossel), MenuBrowser (busca + navegação + lista), CategoryNav (abas no celular, coluna lateral no computador), useActiveSection, SearchField, MenuSectionView, SiteFooter e ícones.
- Layout responsivo: celular primeiro; `md` (768 px) para tablet e `lg` (1024 px) para computador.
- `src/app/qrcodes/`: página para imprimir o cartão com o QR code.
- `src/lib/`: preço, busca e dados estruturados, com testes ao lado.
- `src/app/globals.css`: cores e fontes da marca (tokens do Tailwind).

## Regras do código

- O site é 100% estático: nada que precise de servidor (server actions, route handlers dinâmicos, middleware/proxy, otimização de imagem do Next).
- Preços sempre em centavos, formatados com `formatPrice`/`formatBRL`.
- Fontes servidas pelo próprio site (`src/app/fonts`), sem depender do Google Fonts no build.
- Mobile primeiro, alvos de toque de pelo menos 44 px, contraste AA e HTML semântico.
- Rode `npm run check` antes de considerar uma tarefa pronta.
