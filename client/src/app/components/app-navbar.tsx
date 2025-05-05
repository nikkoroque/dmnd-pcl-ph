import Image from "next/image";
import React from "react";
import Logo from "../../../public/images/OFFICIAL-LOGO.png";
import Link from "next/link";

export default function AppNavbar() {
  return (
    <header className="relative z-10">
      <Link href="https://vellorajewelry.com/" target="_blank" rel="noopener noreferrer">
        <div className="bg-[#361111] flex items-center justify-center p-2 mx-auto">
          <p className="text-sm text-white">
            Thank Mom Beautifully & Save Up to 40% | Visit Vellora Jewelry
          </p>
        </div>
      </Link>
      <nav className="shadow bg-white">
        <div className="container flex items-center justify-center p-6 mx-auto">
          <Link href="/">
            <Image
              src={Logo}
              alt="Diamond Parcel Logo.png"
              height={100}
              width={300}
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}
