import Header from "../Header/header2";
import Footer from "../Footer/footer";
import React from "react";
import Head from "next/head";

function Layout2({ children }) {
  return (
    <>
      {/* <Head>
        <title>{titre}</title>
        <meta name="description" content={description} />
        <link rel="icon" href={icone || ""} />
      </Head>*/}
      <main className="flex flex-col">
        <Header />
        <div className="relative">{children}</div>
        <Footer />
      </main>
    </>
  );
}

export default Layout2;
