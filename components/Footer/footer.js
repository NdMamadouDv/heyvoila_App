import Image from "next/image";
import Link from "next/link";
import React from "react";

function footer() {
  return (
    <footer className="footer p-10 bg-secondary  text-white ">
      <div>
        <div className="block w-40 hover:cursor-pointer">
          <Link href="/">
            <a>
              <Image
                src="/HeyVoila_Logo.png"
                loading="lazy"
                width={400}
                height={215}
              />
            </a>
          </Link>
        </div>
      </div>

      <div>
        <span className="footer-title">Company</span>
        <Link href="/about">A propos de nous</Link>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
    </footer>
  );
}

export default footer;
