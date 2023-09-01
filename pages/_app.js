import "@code-hike/mdx/dist/index.css";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class" defaultTheme="system">
      <Script
        strategy="afterInteractive"
        data-website-id="6e2d5876-59d9-4702-b422-0791399569c5"
        src="https://umami-omega-three.vercel.app/umami.js"
        data-domains="umutkesk.in"
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
