import React from "react";
import Image from "next/image";
import Link from "next/link";
import { APP_ROUTES } from "../../utils/constants";
import { useSession, signIn, signOut } from "next-auth/react";

function Header() {
  const { data: session, status } = useSession();

  const loading = status === "loading";

  if (loading) return null;
  // console.log(session);
  return (
    <div className="navbar bg-base-100 sticky top-0 z-10 shadow-lg">
      <div className="navbar-start">
        <div className="ml-5 block w-32 hover:cursor-pointer ">
          <Link href="/">
            <a>
              <Image
                src="/HeyVoila_logo.png"
                width={400}
                height={215}
                layout="responsive"
                loading="lazy"
                className=""
                alt="Logo heyvoila.fr"
              />
            </a>
          </Link>
        </div>
      </div>
      <div className=" navbar-center  ">
        <ul className=" px-2  bg-white text-accent text-sm font-semibold menu md:menu-horizontal hidden">
          <li className="dropdown ">
            <label
              tabIndex={0}
              className="btn m-1 bg-transparent border-0 hover:bg-gray-200 text-xs "
            >
              Devenir partenaire
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className=" dropdown-content p-2 bg-white text-accent text-sm font-semibold rounded-md shadow-md space-y-2"
            >
              <li className="hover:bg-gray-200 rounded-md">
                <Link href="/">Pour les auto-entrepreneurs</Link>
              </li>
              <li className="hover:bg-gray-200 rounded-md">
                <Link href="/">Pour les particuliers</Link>
              </li>
            </ul>
          </li>
          <li className="">
            <Link href="/search" className="">
              <a className="md:text-sm text-xs">Trouver un prestataire</a>
            </Link>
          </li>
          <li>
            <Link href="/vendors/createJob">
              <a>Ajouter une annonce</a>
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end md:w-[50%] w-[45%]">
        <div className="dropdown dropdown-end ">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 py-5 px-4 shadow bg-base-100 rounded-box w-52 "
          >
            {session ? (
              <div className="grid space-y-3">
                <li className="hover:bg-gray-100 rounded-md">
                  <Link href={APP_ROUTES.VENDORPROFILE}>
                    <a> Mon tableau de bord</a>
                  </Link>
                </li>
                <li className="hover:bg-gray-100 rounded-md">
                  <Link href="/">
                    <a>Mes prestations</a>
                  </Link>
                </li>
                <li className="hover:bg-gray-100 rounded-md">
                  <Link href="/vendors/payments">
                    <a>Mes paiements</a>
                  </Link>
                </li>
                <li className="mx-auto">
                  <a className="hover:bg-transparent">
                    <button
                      className="btn btn-xs font-bold btn-outline btn-primary hover:btn-primary"
                      onClick={signOut}
                    >
                      Se déconnecter
                    </button>
                  </a>
                </li>
              </div>
            ) : (
              <div className="grid space-y-2">
                <div className="md:hidden ">
                  <li className="hover:bg-gray-100 ">
                    <Link href="/">
                      <a className="rounded-md md:text-sm text-xs">
                        Pour les auto-entrepreneurs
                      </a>
                    </Link>
                  </li>
                  <li className="hover:bg-gray-100 rounded-md ">
                    <Link href="/">
                      <a className="md:text-sm text-xs">
                        Pour les particuliers
                      </a>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/search">
                      <a className="hover:bg-gray-100 rounded-md md:text-sm text-xs">
                        Trouver un prestataire
                      </a>
                    </Link>
                  </li>
                  <div className="divider"></div>
                </div>

                <li>
                  <Link href="">
                    <a className="hover:bg-gray-100 rounded-md md:text-sm text-xs">
                      Nous rejoindre
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a className="hover:bg-gray-100 rounded-md md:text-sm text-xs">
                      Prendre rendez-vous
                    </a>
                  </Link>
                </li>
                <li className="">
                  <button
                    className="btn font-bold btn-primary btn-outline hover:btn-primary mt-5"
                    onClick={signIn}
                  >
                    Se connecter
                  </button>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
