import { ArrowUpRight, Sparkle } from "lucide-react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav>
      <div className="flex absolute top-8 left-8 flex-col gap-0 text-2xl -z-0 md:gap-6">
        <div className="flex flex-row gap-4 items-start" id="logo">
          <Sparkle fill="white" />
          BLINQA
        </div>
        <p className="text-xs font-thin md:text-sm">
          Effortless AI-enhanced
          <br /> spreadsheets for everyone
        </p>
        <div className="hidden flex-col gap-2 my-8 text-sm md:flex">
          <Link
            href={""}
            className="px-4 py-2 capitalize rounded-lg bg-white/5 hover:bg-white/10"
          >
            About
          </Link>
          <Link
            href={""}
            className="px-4 py-2 capitalize rounded-lg bg-white/5 hover:bg-white/10"
          >
            Contact Us
          </Link>
          <Link
            href={""}
            className="px-4 py-2 capitalize rounded-lg bg-white/5 hover:bg-white/10"
          >
            Privacy Policy
          </Link>
          <Link
            href={""}
            className="px-4 py-2 h-20 capitalize rounded-lg bg-white/5 hover:bg-white/10"
          >
            Road Map
          </Link>
        </div>
      </div>
      <div className="hidden absolute top-8 right-8 flex-col gap-2 items-end text-2xl md:flex">
        <div className="flex flex-row gap-2 items-start" id="logo">
          73% <ArrowUpRight className="text-green-500" />
        </div>
        <p className="text-sm font-thin" dir="rtl">
          Faster spreadsheet generation
          <br /> powered by AI
        </p>
      </div>
    </nav>
  );
};

export default NavBar;
