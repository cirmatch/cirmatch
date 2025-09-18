import { store } from "@/config/redux/store";
import "@/styles/globals.css";
import AuthInitializer from "@/utils/authInitializer";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [showToaster, setShowToaster] = useState(false);

  useEffect(() => {
    setShowToaster(true); // only render Toaster after client mount
  }, []);

  return (
    <>
      <Head>
        <title>Cirmatch - rPlastic marketplace</title>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>

      <Provider store={store}>
        <AuthInitializer />
        <Component {...pageProps} />
        {showToaster && <Toaster position="top-center" />} {/* client-only render */}
      </Provider>
    </>
  );
}
