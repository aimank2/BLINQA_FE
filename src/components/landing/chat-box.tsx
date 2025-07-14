"use client";
import { Sparkle } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <div className="w-[90vw] md:w-[500px] h-[600px]  bg-white/5 rounded-lg shadow-lg text-white p-8 ">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4">
          <Sparkle fill="white" />
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
            className="px-4 py-2 my-5 mt-4 font-semibold rounded-lg bg-white/5"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;
