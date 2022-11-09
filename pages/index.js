import Image from "next/image";
import React from "react";
import prisma from "../lib/prisma";
// import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Catalog from "../components/modules/catalogs/catalogHome";

import Hero from "../components/modules/communs/Herohome";
import Link from "next/link";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
export default function Home({ annonces = [] }) {
  // console.log(annonces);
  return (
    <div className="">
      {/* titre: "Heyvoila | Un problème, une solution",
          description: "Un problème,une solution | Heyvoila.fr",
          icone: "/HeyVoila_logo1.png", */}

      <main className="">
        <div className="flex flex-col">
          <div className="">
            <Hero />
          </div>
          <div className="">
            <Catalog annonces={annonces} />
          </div>
          <div className=""></div>
          <div className="container mx-auto grid h-52 items-center">
            <p className="">Poster mon annonce ici</p>
            <h1 className="text-3xl font-bold text-center text-neutral">
              Site en construction. Veuillez patienter ...
            </h1>
          </div>
        </div>
      </main>
    </div>
  );
}

Home.layout = "L1";
export async function getServerSideProps() {
  const annonces = await prisma.annonce.findMany();
  return {
    props: {
      annonces: JSON.parse(JSON.stringify(annonces)),
    },
  };
}
