import Image from "next/image";
import React from "react";

function Herohome() {
  return (
    <div className="hero min-h-screen bg-secondary text-white">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="max-w-sm rounded-lg shadow-2xl">
          <Image
            src="https://placeimg.com/260/400/arch"
            layout="fill"
            alt="Soyez votre propre patron"
          />
        </div>

        <div className="w-7/12 mx-auto">
          <h1 className="text-4xl font-bold">
            Rejoignez la communauté Heyvoilà !
          </h1>
          <p className="py-10">
            Une nouvelle manière de travailler. Et le mieux c&apos;est que
            c&apos;est vous le patron !
          </p>
          <button className=" btn btn-primary text-white ">
            Devenir prestataire
          </button>
        </div>
      </div>
    </div>
  );
}

export default Herohome;
