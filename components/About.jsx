import React from "react";

export default function About({}) {
  return (
    <section className="mt-12">
      <h2 className="text-3xl">About</h2>
      <p className="mt-4 text-gray-800 dark:text-gray-200 text-lg leading-8">
        Frontend Developer with focus on <Highlight>ReactJS</Highlight> library.
        worked on several personal projects using
        <Highlight>Javascript</Highlight>, <Highlight>ReactJS</Highlight>,
        <Highlight>NextJS</Highlight>,<Highlight>Node.JS</Highlight>,
        <Highlight>ExpressJS</Highlight>,<Highlight>TailwindCSS</Highlight>,
        <Highlight>SCSS</Highlight>, and other technologies with Accessibility,
        Responsive Design and Mobile First Approaches being my main focus.
      </p>
    </section>
  );
}

function Highlight({ children }) {
  return (
    <b className="font-semibold border-b border-yellow-200 bg-yellow-200/10 p-px">
      {children}
    </b>
  );
}
