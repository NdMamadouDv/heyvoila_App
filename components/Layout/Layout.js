import Header from "../Header/header";
import Footer from "../Footer/footer";
import React from "react";
import Head from "next/head";
import Favicon from "../modules/communs/favicon";

function Layout({ children }) {
  // const { titre, icone, description } = meta;
  return (
    <>
      <Head>
        <Favicon />
      </Head>
      <main className="flex flex-col">
        <Header />
        <div className="relative">{children}</div>
        <Footer />
      </main>
    </>
  );
}

export default Layout;
