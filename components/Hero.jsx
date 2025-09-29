import React from "react";
import Link from "next/link";
import Logo from "../assets/svgs/logo.svg";

export default function Hero({}) {
  return (
    <section className="flex items-center justify-center h-full ">
      <div className="container mx-auto flex flex-col items-center justify-center space-y-8 p-8">
        <Logo className="w-48" />
        <p className="text-3xl text-gray-700 text-center dark:text-white">
          I love to build cool stuff.
        </p>
        <div className="flex gap-2">
          <a
            target={"_blank"}
            rel="noreferrer"
            href="https://www.linkedin.com/in/umutdev/"
            className="bg-blue-500 text-blue-100 px-2 py-1 rounded"
          >
            Linkedin
          </a>
          <a
            target={"_blank"}
            rel="noreferrer"
            href="https://www.github.com/ukeskin/"
            className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
          >
            Github
          </a>
          <Link href="/cv">
            <a className="bg-yellow-300 text-gray-700 px-2 py-1 rounded">CV</a>
          </Link>
        </div>
      </div>
    </section>
  );
}
