import Script from "next/script";
import { HOME_HTML } from "@/lib/home-html";
import { HOME_JS } from "@/lib/home-js";

export default function HomePage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: HOME_HTML }} />
      <Script id="home-js" strategy="afterInteractive">
        {HOME_JS}
      </Script>
    </>
  );
}
