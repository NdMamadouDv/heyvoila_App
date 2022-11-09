import Head from "next/head";
import Image from "next/image";
import React from "react";

function About() {
  return (
    <div className="">
      {/*         
          titre: "Heyvoila | A propos de nous",
          description: "Un problème,une solution | Heyvoila.fr",
          icone: "/public/HeyVoila_logo1.png", */}

      <main>
        <div className="flex flex-col">
          <h1>A propos de heyvoila.fr</h1>

          <div className="grid h-52 items-center">
            <h2 className="text-3xl font-bold text-center text-neutral">
              Notre équipe heyvoila vous remercie
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
}
About.layout = "L1";
export default About;
