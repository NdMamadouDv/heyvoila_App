import "../styles/globals.css";
import React from "react";
import { SessionProvider } from "next-auth/react";
import Layout1 from "../components/Layout/Layout";
import Layout2 from "../components/Layout/Layout2";

const layouts = {
  L1: Layout1,
  L2: Layout2,
};
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const Layout =
    layouts[Component.layout] || Layout1 || ((children) => <>{children}</>);
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
