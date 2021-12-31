import type { AppProps } from "next/app";
import Head from "next/head";
import { useApollo } from "../lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import "../styles/global.css";
import '../icons/css/boxicons.css'
import Layout from "../components/Layout";


function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>Dashboard | Traveller</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
