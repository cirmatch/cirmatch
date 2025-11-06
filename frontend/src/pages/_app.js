import { store } from "@/config/redux/store";
import "@/styles/globals.css";
import AuthInitializer from "@/utils/authInitializer";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { useEffect, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [showToaster, setShowToaster] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShowToaster(true); // only render Toaster after client mount
  }, []);

  // Track page views on route change
  useEffect(() => {
    const handleRouteChange = (url) => {
      window.gtag("config", "G-K0MF94S2QL", {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Cirmatch - rPlastic marketplace</title>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>

      {/* ✅ Google Analytics Scripts */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-K0MF94S2QL"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-K0MF94S2QL', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      <Provider store={store}>
        <AuthInitializer />
        <Component {...pageProps} />
        {showToaster && <Toaster position="top-center" />}
      </Provider>
    </>
  );
}
