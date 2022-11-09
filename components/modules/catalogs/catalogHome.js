import Image from "next/image";
import Link from "next/link";
import React from "react";

function catalog({ annonces }) {
  // console.log({ annonces });
  // console.log(annonces[0].offreBasique.prix);
  // console.log(annonces[0].images[1].url);
  return (
    // Premiere ligne du catalogue
    <div className="w-full">
      {" "}
      <div className="flex flex-col mt-3">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl py-10 px-4 sm:py-3 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-3xl">Nos offres disponibles </h2>

            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 my-5">
              {annonces.map((annonce) => (
                <div className="grid" key={annonce.id}>
                  <Link
                    href={`/marketplace/${annonce.id}`}
                    as={`/marketplace/${annonce.id}`}
                    className="grid"
                  >
                    <div className="">
                      <div className="">
                        {annonce.image?.url ? (
                          <Image
                            src={annonce.image.url}
                            alt="Votre image"
                            loading="lazy"
                            className="rounded-lg group-hover:opacity-75"
                          />
                        ) : (
                          <Image
                            src="/image_vendors_default.jpg"
                            width={3000}
                            height={2000}
                            alt="image de votre annonce"
                            loading="lazy"
                            className="rounded-lg group-hover:opacity-75"
                          />
                        )}
                      </div>
                      <h3 className="mt-2 text-lg text-secondary text-center">
                        {annonce.titre}
                      </h3>
                      <p className="mt-1 text-lg font-medium text-gray-900 text-right">
                        {/* {annonce.offreBasique?.prix
                          ? annonce.offreBasique.prix
                          : annonce.prixTache} */}
                        {annonce.prixTache} €
                      </p>
                      <p className="text-xs italic truncate">
                        {annonce.description}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default catalog;
