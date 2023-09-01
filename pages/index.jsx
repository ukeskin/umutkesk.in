import Head from "next/head";
import Nav from "components/Nav";
import Hero from "components/Hero";
import Projects from "components/Projects";
import Notes from "components/Notes";
import About from "components/About";
import Bookmarks from "components/Bookmarks";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Head>
        <title>Umut Keskin</title>
        <meta
          name="description"
          content="Umut Keskin's personal website. I'm a software developer based in Istanbul, Turkey. I'm currently working at egaranti as a Frontend Developer. I'm interested in web development, I'm also a big fan of open source."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Nav />
        <Hero />
      </div>
      <div className="flex flex-col gap-20">
        <About />
        <Projects />
        <Bookmarks />
        <Notes />
      </div>
    </div>
  );
};

export default Home;
