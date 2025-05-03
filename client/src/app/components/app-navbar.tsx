import Image from "next/image";
import React from "react";
import Logo from "../../../public/images/OFFICIAL-LOGO.png";

export default function AppNavbar() {
  return (
    <header className="relative z-10">
      <a href="/">
        <div className="bg-[#361111] flex items-center justify-center p-2 mx-auto">
          <p className="text-sm text-white">
            Thank Mom Beautifully & Save Up to 40% | DETAILS
          </p>
        </div>
      </a>
      <nav className="shadow bg-white">
        <div className="container flex items-center justify-center p-6 mx-auto">
          <a href="/">
            <Image
              src={Logo}
              alt="Diamond Parcel Logo.png"
              height={100}
              width={300}
            />
          </a>
        </div>
      </nav>
    </header>
  );
}
