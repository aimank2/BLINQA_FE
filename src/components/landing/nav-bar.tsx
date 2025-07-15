import { ArrowUpRight, Sparkle } from "lucide-react";
import Link from "next/link";
import React from "react";

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Contact Us", href: "#contact" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Road Map", href: "#roadmap", extraClass: "h-20" },
];

const NavItem = ({
  label,
  href,
  extraClass,
}: {
  label: string;
  href: string;
  extraClass?: string;
}) => (
  <Link
    href={href}
    className={`px-4 py-2 capitalize rounded-lg bg-white/5 hover:bg-white/10 w-[14vw] ${
      extraClass || ""
    }`}
  >
    {label}
  </Link>
);

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
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
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
