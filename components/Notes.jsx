import React from "react";
import Link from "next/link";

import NoteIcon from "../assets/svgs/note.svg";
import { allPosts } from "contentlayer/generated";

function Notes() {
  return (
    <section>
      <h2 className="text-3xl">Public Notes</h2>
      <div className="mt-4 md:grid grid-cols-2 sm:grid-cols-3 gap-4 flex flex-row sm:flex-col overflow-x-auto">
        {allPosts?.map((post, key) => (
          <Link href={`${post.url}`} key={key}>
            <div className="flex flex-col gap-4 p-4 sm:w-full w-3/4 justify-between border rounded-lg hover:border-gray-700 transition-all cursor-pointer">
              <div className="pr-4">
                <NoteIcon className="w-6 h-6" />
              </div>
              <h3>{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Notes;
