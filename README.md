# Cardápio digital · Gostosão Lanches

Projeto solo de estudo: testar design de front-end e aprender, de ponta a ponta, como um site sai do papel e chega no ar.

A ideia veio de uma lanchonete aqui perto, o Gostosão Lanches, em Teresina. O cardápio deles só existia impresso, então virou um site que abre pelo QR code da mesa. É estudo, mas com cliente de verdade.

<p align="center">
  <img src="docs/screenshots/celular.png" alt="Três telas do cardápio no celular: topo com o selo da mesa, barra de categorias em Cervejas e busca por bacon" width="860">
</p>

## O que estou praticando

- **Design mobile:** levar a cara do cardápio impresso (preto, vermelho, fotos em círculo e preço em pílula) pra tela do celular.
- **Next.js, TypeScript e Tailwind:** App Router, componentes de servidor e de cliente, site exportado como estático.
- **Experiência de cardápio:** busca sem acento, barra de categorias que acompanha a rolagem e número da mesa vindo do QR code.
- **O caminho até produção:** testes, CI no GitHub Actions, deploy automático, SEO e acessibilidade.

## Pra rodar

Precisa do Node.js 22.12 ou mais novo.

```bash
npm install
npm run dev     # http://localhost:3000 (pra simular uma mesa: /?mesa=7)
npm run check   # lint, tipos e testes
```

## Onde mexer

- O cardápio inteiro fica em `src/data/menu.ts`. Os preços estão em centavos: R$ 18,00 vira `1800`.
- Endereço, Instagram e quantidade de mesas ficam em `src/config/site.ts`.
- Os cartões com QR code pra imprimir ficam em `/qrcodes`:

<p align="center">
  <img src="docs/screenshots/qrcodes.png" alt="Folha A4 com quatro cartões de mesa, cada um com QR code e número da mesa" width="360">
</p>

## Anotações do caminho

- Preço em centavos evita erro de arredondamento.
- O QR code guarda só o endereço: dá pra mudar o cardápio à vontade sem reimprimir nada, mas trocar de domínio quebra os cartões.
- O plano grátis da Vercel não permite uso comercial; pra lanchonete usar de verdade, a hospedagem precisa mudar.

## Próximos passos

- [ ] Horário de funcionamento e WhatsApp
- [ ] Fotos reais dos lanches
- [ ] Pedido pela mesa
- [ ] Painel pra atualizar preços

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Vitest · GitHub Actions · Vercel

---

Cardápio, marca e fotos são do Gostosão Lanches. O código está sob a [licença MIT](LICENSE).
