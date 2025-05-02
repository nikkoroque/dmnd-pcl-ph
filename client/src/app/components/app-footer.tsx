import { Facebook, Instagram, Twitter } from "lucide-react";
import Logo from "../../../public/images/OFFICIAL-LOGO.png";
import Image from "next/image";

import React from "react";

const AppFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="shadow">
      <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
        <a href="#">
          <Image
            src={Logo}
            alt="Diamond Parcel Logo.png"
            height={100}
            width={200}
          />
        </a>

        <p className="text-sm text-gray-900">
          © Copyright {currentYear}. All Rights Reserved.
        </p>

        <div className="flex -mx-2">
          <a
            href="#"
            className="mx-2  transition-colors duration-300  hover:text-[#421515]"
            aria-label="Facebook"
          >
            <Facebook />
          </a>

          <a
            href="#"
            className="mx-2 transition-colors duration-300 hover:text-[#421515]"
            aria-label="Instagram"
          >
            <Instagram />
          </a>

          <a
            href="#"
            className="mx-2 transition-colors duration-300 hover:text-[#421515]"
            aria-label="Twitter"
          >
            <Twitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
