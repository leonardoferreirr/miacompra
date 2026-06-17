import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mia Compra · Envíos de Estados Unidos a Venezuela, sin sorpresas",
  description:
    "Llevamos tus compras y encomiendas desde Estados Unidos hasta la puerta de tu casa en Venezuela. Precio cerrado desde el primer mensaje, impuestos y seguro incluidos. Aéreo y marítimo, puerta a puerta.",
  themeColor: "#04123D",
  icons: {
    icon: [{ url: "/assets/logo-yellow.png", type: "image/png" }],
  },
  openGraph: {
    title: "Mia Compra · Tu aliado para enviar de Estados Unidos a Venezuela",
    description: "Precio cerrado, sin sorpresas en la aduana. Puerta a puerta, asegurado, aéreo y marítimo.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link
          rel="preload"
          as="image"
          href="/assets/hero-abuela.webp"
          imageSrcSet="/assets/hero-abuela-960.webp 960w, /assets/hero-abuela.webp 1920w"
          imageSizes="100vw"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/fonts/montserrat-latin.woff2"
          crossOrigin=""
        />
      </head>
      <body>
        {children}
        <Script id="ms-clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "x3iyfqnlgs");`}
        </Script>
        <Script id="meta-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '3860924050839203');
          fbq('track', 'PageView');`}
        </Script>
        {/* Pixel noscript como HTML cru: evita que o React/Next hoiste um
            <link rel="preload" as="image"> do tr?...noscript que competia com
            o hero (LCP) no mobile. O fallback p/ JS desligado segue valendo. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=3860924050839203&ev=PageView&noscript=1" alt="" />',
          }}
        />
      </body>
    </html>
  );
}
