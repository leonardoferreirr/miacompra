/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apple Pay domain verification: arquivo precisa ser servido como text/plain.
        // Quando o Stripe baixar de https://www.miacompra.com/.well-known/apple-developer-merchantid-domain-association
        // o Content-Type tem que ser texto puro, senão a verificação falha.
        source: "/.well-known/apple-developer-merchantid-domain-association",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache" },
        ],
      },
    ];
  },
};
export default nextConfig;
