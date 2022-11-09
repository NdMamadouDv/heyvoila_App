import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { hygraphClient } from "../../lib/hygraph";
import { gql } from "graphql-request";

const GetUserProfileById = gql`
  query GetUserProfileById($id: ID!) {
    userVendor: heyvoilaUser(where: { id: $id }) {
      id
      nom
      createdAt
      prenom
      photo {
        height
        url
        width
      }
      email
    }
  }
`;

function vendorAccount({ userVendor }) {
  return (
    <div className="">
      {/*        
          titre: "Heyvoila | Mon compte ",
          description: "Un problème,une solution | Heyvoila.fr",
          icone: "/HeyVoila_logo1.png", */}

      <main className="flex flex-col">
        <h1 className="text-center">Mon compte Vendeur - Heyvoila</h1>
        <div className="grid grid-cols-3 min-h-screen py-10">
          {/* composent info profil */}

          {/* Lien vers les ancien */}
          {/* vue sur les stats de ventes */}
        </div>
      </main>
    </div>
  );
}

export default vendorAccount;
vendorAccount.layout = "L2";
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const { userVendor } = await hygraphClient.request(GetUserProfileById, {
    id: session.userId,
  });

  return {
    props: { userVendor },
  };
}
