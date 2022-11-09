import React from "react";
import { getCsrfToken } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function SignIn({ csrfToken }) {
  return (
    <>
      <div className="grid h-screen w-full">
        <div className=" flex justify-center items-center bg-primary">
          <div className="md:w-1/2 h-1/2 shadow-lg rounded-md bg-white p-8 flex flex-col">
            <div className="block self-center w-32 hover-cursor-pointer ">
              <Image
                src="/HeyVoila_logo.png"
                width={400}
                height={215}
                layout="responsive"
                loading="lazy"
                className=""
              />
            </div>
            <h2 className="text-center font-medium text-2xl mb-4">
              Se connecter sur Heyvoila.fr
            </h2>
            <form
              method="post"
              action="/api/auth/callback/credentials"
              className="flex flex-1 flex-col justify-evenly"
            >
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <input
                className="border-2 outline-none p-2 rounded-md"
                type="email"
                name="email"
                placeholder="Enter Your Email"
              />
              <input
                className="border-2 outline-none p-2 rounded-md"
                type="password"
                name="password"
                placeholder="*******"
              />

              <button
                className="
            flex justify-center
            p-2 rounded-md w-1/2 self-center
            bg-blue-900  text-white hover:bg-blue-800"
                type="submit"
              >
                <span>Se connecter</span>
              </button>
            </form>
            <div className="text-center text-sm">
              Pas membre ?
              <Link href="./signup">
                <a className="font-medium text-secondary ml-1 hover:text-primary">
                  Créer un compte
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
    // <div  className="h-screen flex">
    //   <button onClick={() => signIn(provider.id)}>
    //     Sign in with {provider.name}
    //   </button>
    // </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
