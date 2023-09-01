import React from "react";
import Link from "next/link";

import Loading from "./Loading";
import { getLastBookmarks } from "lib/raindrop";
import Image from "next/image";

export default function Projects({}) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getLastBookmarks()
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="flex flex-col">
      <Link className="cursor-pointer" href="/bookmarks">
        <h2 className="text-3xl mb-4">Bookmarks</h2>
      </Link>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
        {data.length === 0 && <Loading />}
        {data.map((item, index) => (
          <Link href={item.link} key={index}>
            <BookMarkCard item={item} />
          </Link>
        ))}
        {/* show more button link to bookmarks */}
        <Link className="cursor-pointer" href="/bookmarks">
          <div className="flex gap-2 py-5 px-4 border border-gray-400 text-gray-400 p-4 rounded-lg items-center justify-center hover:bg-gray-500 hover:text-gray-100 transition-all cursor-pointer dark:hover:bg-gray-200 dark:hover:text-gray-800">
            See more
          </div>
        </Link>
      </div>
    </section>
  );
}

const BookMarkCard = ({ item }) => {
  return (
    <div className="flex gap-2 border  rounded-lg cursor-pointer">
      {item.cover && (
        <Image
          src={item.cover}
          className="object-cover rounded-l-md"
          unoptimized={true}
          width={100}
          height={100}
          cover
          alt={item.title}
        />
      )}
      <div className="flex flex-col px-1 py-3">
        <div className="font-semibold text-sm">{item.title}</div>
        <div className="text-xs">{item.excerpt}</div>
      </div>
    </div>
  );
};
