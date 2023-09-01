import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import SunIcon from "../assets/svgs/sun.svg";
import MoonIcon from "../assets/svgs/moon.svg";
import Logo from "../assets/svgs/logo.svg";
import { motion } from "framer-motion";

const Nav = (props) => {
  const { systemTheme, theme, setTheme } = useTheme();

  const handleThemeChange = (e) => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.nav
      className="max-w-4xl mx-auto flex items-center py-8  mb-4 justify-between"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex items-center">
        <Link href="/">
          <Logo className="w-12 mr-4 cursor-pointer" />
        </Link>
        <h2 className="pl-3 border-l-2 border-red-600d dark:border-red-600 text-md font-bold">
          {props.title}
        </h2>
      </div>
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
    </motion.nav>
  );
};

export default Nav;
