import { PrismaClient } from "@prisma/client";
import React, { useState } from "react";
import CreateJobForm from "../../components/modules/Forms/createJob/CreateJobForm";
import axios from "axios";

const prisma = new PrismaClient();

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
function create({ categories = [], sousCategories = [] }) {
  const addAnnonce = (data) => axios.post("/api/annonces/createAnnonces", data);

  return (
    <div className="">
      <div className="w-10/12 mx-auto min-h-screen">
        <h1 className="text-3xl text-center font-medium text-primary py-6">
          Ajouter une annonce
        </h1>
        <p className="text-gray-500 text-sm">
          Vous êtes à quelques pas d&apos;apparaître en ligne.
        </p>
        <div className="mt-8">
          <CreateJobForm
            buttonText="Enregistrer"
            redirectPath="/"
            onSubmit={addAnnonce}
            categories={categories}
            sousCategories={sousCategories}
          />
        </div>
      </div>
    </div>
  );
}

export default create;
create.layout = "L2";
export async function getServerSideProps() {
  const categories = await prisma.categorie.findMany();
  const sousCategories = await prisma.sousCategorie.findMany();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      sousCategories: JSON.parse(JSON.stringify(sousCategories)),
    },
  };
}
