// Subdomínios gratuitos de hospedagem: o nome volta a ficar livre quando o projeto é apagado.
// ponytail: lista fixa; uma hospedagem fora dela passa sem aviso. Acrescente aqui se mudar de hospedagem.
const FREE_HOSTING = [
  "vercel.app",
  "pages.dev",
  "workers.dev",
  "github.io",
  "netlify.app",
  "web.app",
  "firebaseapp.com",
  "onrender.com",
  "surge.sh",
];

/**
 * Motivo para não imprimir um QR code com este endereço, ou `null` se ele pode ir para as mesas.
 * O cartão impresso dura anos, então o endereço precisa ser um domínio próprio com https.
 */
export function qrUrlProblem(url: string): string | null {
  const { protocol, hostname } = new URL(url);
  const host = hostname.replace(/\.$/, "");

  if (host === "localhost" || host.endsWith(".localhost") || /^[\d.]+$/.test(host) || host.startsWith("[")) {
    return "Este código aponta para um computador, não para o site publicado. Defina NEXT_PUBLIC_SITE_URL com o domínio da lanchonete e publique o site de novo.";
  }
  // Nomes reservados para exemplo (RFC 2606), como o do .env.example
  if (/(^|\.)(example|test|invalid)$/.test(host) || /(^|\.)example\.(com|net|org)$/.test(host)) {
    return "Este é um endereço de exemplo. Defina NEXT_PUBLIC_SITE_URL com o domínio da lanchonete antes de imprimir.";
  }
  if (FREE_HOSTING.some((suffix) => host === suffix || host.endsWith(`.${suffix}`))) {
    return "Este é o endereço gratuito da hospedagem. Se o projeto for apagado ou mudar de hospedagem, outra pessoa pode registrar o mesmo endereço e receber quem escanear os cartões. Defina NEXT_PUBLIC_SITE_URL com um domínio próprio (ex.: .com.br) antes de imprimir.";
  }
  if (protocol !== "https:") {
    return "O endereço não usa https. Defina NEXT_PUBLIC_SITE_URL com o domínio começando por https://.";
  }
  return null;
}
