import React from "react";
import NoteIcon from "../assets/svgs/note.svg";

function Notes({}) {
  return (
    <section>
      <h2 className="text-3xl">Public Notes</h2>
      <div className="mt-4 md:grid grid-cols-2 sm:grid-cols-3 gap-4 flex flex-row sm:flex-col overflow-x-auto">
        <div className="flex sm:w-full w-3/4 flex-col justify-between border rounded-lg hover:border-gray-700 transition-all cursor-pointer">
          <div className="flex items-center p-3 ">
            <div className="pr-4">
              <NoteIcon className="w-6 h-6" />
            </div>
            <div className="p-4 flex flex-col justify-between text-gray-800 dark:text-gray-200 border-l">
              <div className="text-lg font-semibold group-hover:text-gray-700">
                Title
              </div>
              <div className="text-sm">Subtitle</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Notes;
