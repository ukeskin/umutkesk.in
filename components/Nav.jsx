import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import SunIcon from "../assets/svgs/sun.svg";
import MoonIcon from "../assets/svgs/moon.svg";

const Nav = (props) => {
  const { systemTheme, theme, setTheme } = useTheme();

  const handleThemeChange = (e) => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="container mx-auto flex h-20 items-center justify-between w-full p-4">
      <Link href="/">
        <a></a>
      </Link>
      <div>
        <button
          className="flex items-center justify-center bg-transparent text-gray-800 font-semibold hover:text-gray-900 p-4 rounded-full"
          onClick={handleThemeChange}
        >
          {theme === "dark" ? (
            <SunIcon className="w-6 h-6 text-white" />
          ) : (
            <MoonIcon className="w-6 h-6 text-gray-500" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
