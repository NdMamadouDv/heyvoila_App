import React from "react";
import prisma from "../../lib/prisma";
import { useRouter } from "next/router";
import { NextProgressbarSpinner } from "nextjs-progressbar-spinner";
import SingleProduct from "../../components/modules/communs/SingleProduct";

const ListedAnnonce = (annonce = null) => {
  const router = useRouter();
  // console.log(annonce?.id);
  console.log(annonce?.annonce);
  // console.log({annonce.prixTache});

  // console.log(router);
  //console.log(router.query.id);
  //console.log("annonce", annonce);
  if (router.isFallback) {
    return (
      <div className="h-screen grid items-center">
        <NextProgressbarSpinner
          NextNProgressProps={{
            color: "#61DCFB",
            progressBarVisibility: "visible",
            startPosition: 0.3,
            stopDelayMs: 200,
            height: 1,
            showOnShallow: true,
            options: { showSpinner: false },
          }}
          spinnerType="CircleLoader"
          spinnerProps={{
            size: "2rem",
            color: "#61DCFB",
            // cssOverride: {},
            // speedMultiplier: 2.5,
            // height: 5,
            // width: 5,
            // radius: 5,
            // margin: 5,
          }}
        />
      </div>
    );
  }
  return (
    <section className="text-gray-600 body-font overflow-hidden mb-20">
      <div className="container px-5 py-24 mx-auto ">
        <SingleProduct annonce={annonce} />
      </div>
    </section>
  );
};

export default ListedAnnonce;

export async function getStaticPaths() {
  // Get all the annonces IDs from the database
  const annonces = await prisma.annonce.findMany({
    select: { id: true },
  });

  return {
    paths: annonces.map((annonce) => ({
      params: { id: annonce.id },
    })),
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  // Get the current annonce from the database
  const annonce = await prisma.annonce.findUnique({
    where: { id: params.id },
    include: {
      sousCategorie: true,
    },
  });

  if (annonce) {
    return {
      // props: annonce.map((result) => {
      //   JSON.parse(JSON.stringify(result));
      // }),
      props: JSON.parse(JSON.stringify({ annonce })),
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: true,
    },
  };
}
