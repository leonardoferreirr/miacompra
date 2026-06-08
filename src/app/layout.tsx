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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "x3iyfqnlgs");`}
        </Script>
      </body>
    </html>
  );
}
