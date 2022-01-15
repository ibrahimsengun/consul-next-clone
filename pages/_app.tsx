import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/UI/Layout";
import Header from "../components/UI/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
