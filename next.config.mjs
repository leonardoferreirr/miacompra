/** @type {import('next').NextConfig} */

// CSP — bloqueia injeção de script externo. Stripe (js.stripe.com + checkout)
// + Upstash (rate limit) + Google Fonts são as únicas origens externas.
// 'unsafe-inline' + 'unsafe-eval' são necessárias pro Next.js client runtime.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://m.stripe.com https://checkout.stripe.com https://*.stripe.com https://www.clarity.ms https://*.clarity.ms https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.stripe.com https://checkout.stripe.com https://maps.stripe.com https://*.stripe.com https://*.upstash.io https://*.clarity.ms https://c.bing.com https://www.facebook.com https://connect.facebook.net",
  "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com https://*.stripe.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://checkout.stripe.com",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "payment=(self \"https://checkout.stripe.com\" \"https://js.stripe.com\")" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig = {
  async headers() {
    return [
      {
        // Apple Pay domain verification: arquivo precisa ser servido como text/plain.
        source: "/.well-known/apple-developer-merchantid-domain-association",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache" },
        ],
      },
      {
        // Fonte self-hosted: imutável, cache de 1 ano (renomear o arquivo se trocar).
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};
export default nextConfig;
