import { useState, useEffect } from "react";
import Link from "next/link";

import Image from "next/image";
import { getAllBookmarks } from "lib/raindrop";
import Nav from "components/Nav";

function Bookmarks() {
  const [allBookmarks, setAllBookmarks] = useState([]);

  useEffect(() => {
    getAllBookmarks().then((data) => {
      console.log(data);
      setAllBookmarks(data);
    });
  }, []);

  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-4xl font-bold">Bookmarks</h1>
        <div className="w-full lg:columns-3 sm:columns-2 gap-12">
          {allBookmarks.map((bookmark, index) => (
            <div className="cursor-pointer py-6 px-1 inline-block w-full group">
              <figure
                className={`relative h-64 ${
                  index % 2 == 0 ? "md:h-96" : "md:h-64"
                } w-full hidden md:block mb-3 sm:mb-0 mr-6 border border-gray-100 overflow-hidden rounded-lg transform group-hover:translate-x-0 group-hover:shadow group-hover:translate-y-0 transition duration-700 ease-out`}
              >
                <div className="absolute w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition duration-700 ease-out cursor-pointer">
                  <Image
                    objectFit="cover"
                    className="rounded-lg contrast-115"
                    layout="fill"
                    src={bookmark?.cover}
                  />
                </div>
              </figure>

              <h4 className="text-black-1 font-semibold text-lg leading-normal mt-2">
                <Link href={`/post/${bookmark?.slug}`}>
                  <a>{bookmark?.title}</a>
                </Link>
              </h4>
              <div className="mt-3">123</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Bookmarks;
