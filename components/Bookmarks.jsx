import React from "react";
import Link from "next/link";

import Loading from "./Loading";
import { getLastBookmarks } from "lib/raindrop";

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
      {/* carousel  */}
      <div class="grid md:grid-cols-3 grid-cols-1 gap-3">
        {data.map((item, index) => (
          <Link href={item.link} key={index}>
            <BookMarkCard item={item} />
          </Link>
        ))}
        {/* show more button link to bookmarks */}
        <Link className="cursor-pointer" href="/bookmarks">
          <div className="flex gap-2 py-5 px-4 border border-gray-800 p-4 rounded-lg items-center justify-center hover:bg-gray-800 transition-all cursor-pointer">
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
        <img src={item.cover} className="w-10 object-cover rounded-l-md" />
      )}
      <div className="flex flex-col px-1 py-3">
        <div className="font-semibold text-sm">{item.title}</div>
        <div className="text-xs">{item.excerpt}</div>
      </div>
    </div>
  );
};
