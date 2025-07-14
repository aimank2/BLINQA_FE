"use client";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <div className="relative z-10 w-[90vw] md:w-[500px] h-[600px]  bg-white/5 rounded-lg shadow-lg text-white p-8 ">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4">
          <Sparkles fill="white" />
          <p className="text-lg font-thin capitalize font-unbounded">
            build Ai-powerd spreadsheets <br />
            without the complexity
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xs font-thin font-unbounded max-w-1/2">
            Try AI-powered software free
            <br />
            To get started, you’ll need to grant access to your Google Sheets.{" "}
          </p>
          <Link
            href={""}
            className="flex !justify-between px-4 py-2 my-5 mt-4 font-semibold uppercase rounded-lg flex-center bg-white/5 md:bg-black/15 hover:bg-white/10 transition-colors duration-1000"
          >
            Get started <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;
