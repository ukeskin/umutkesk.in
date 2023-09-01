import Nav from "components/Nav";
import { getAllBookmarks } from "lib/raindrop";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect } from "react";

const Bookmarks = () => {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    getAllBookmarks()
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Head>
        <title>Bookmarks</title>
        <meta
          name="description"
          content="I consume a lot of content on the internet about ui, ux, design, software development, startups, etc. I save the ones Here are some of them."
        />
        <meta property="og:title" content="Bookmarks" />
        <meta
          property="og:description"
          content="I consume a lot of content on the internet about ui, ux, design, software development, startups, etc. I save the ones Here are some of them."
        />
        <meta
          property="og:url"
          content="https://umutkesk.in/api/og?title=Bookmarks"
        />
        <meta
          property="og:image"
          content="https://umutkesk.in/api/og?title=Bookmarks"
        />
      </Head>

      <Nav title="Bookmarks" />
      <main className="flex flex-col">
        <p className="text-gra-800 dark:text-gray-200 text-2xl mb-7 leading-10">
          I consume a lot of content on the internet about ui, ux, design,
          software development, startups, etc. I save the ones Here are some of
          them.
        </p>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
          {data.map((item, index) => (
            <Link href={item.link} key={index}>
              <div className="flex flex-col gap-2 border rounded-lg cursor-pointer">
                {item.cover !== "null" ? (
                  <img
                    src={item.cover || ""}
                    className="w-full object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-800 rounded-t-lg"></div>
                )}
                <div className="flex flex-col gap-2 px-4 py-6">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-gray-400">{item.excerpt}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Bookmarks;
