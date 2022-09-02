import Head from "next/head";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
//import Notes from "../components/Notes";
import About from "../components/About";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Head>
        <title>Umut Keskin</title>
        <meta name="description" content="Frontend Developer Umut Keskin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Nav />
        <Hero />
      </div>
      <div className="flex flex-col gap-20">
        <About />
        <Projects />
        {/* <Notes /> */}
      </div>
    </div>
  );
};

export default Home;
