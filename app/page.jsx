"use client";
import Link from "next/link";
import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoLogoWebComponent } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";

export default function Home() {
  const [word, setWord] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await res.json();
    setData(data[0]);
    console.log(data[0]);
    setLoading(false);
  };

  return (
    <main className="bg-black w-full flex justify-center min-h-screen text-white">
      <div className=" w-[700px] py-10 px-4">
        <div className="flex justify-between w-full">
          <p className="font-bold">DK</p>
          <div className="flex gap-2">
            <Link
              href="https://github.com/anuragchauhan07"
              className="flex items-center gap-1 bg-gray-300/40 hover:bg-gray-300/20 transition  px-2 py-1 rounded-sm"
            >
              <FaRegStar className="text-yellow-500" />
              <p className="text-sm">GITHUB</p>
            </Link>

            <Link
              href="https://anuragchauhan.vercel.app/"
              className="flex items-center gap-1 bg-gray-300/40 hover:bg-gray-300/20 transition  px-2 py-1 rounded-sm"
            >
              <IoLogoWebComponent />
            </Link>
          </div>
        </div>
        <div className="flex my-10 bg-gray-400/40 rounded-md items-center ">
          <input
            onChange={(e) => {
              setWord(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") getData();
            }}
            placeholder="Enter Text..."
            className="flex-1 text-sm bg-transparent outline-none py-2 px-4"
          />
          <div
            className="p-2 pr-4"
            onClick={() => {
              getData();
            }}
          >
            <FaSearch />
          </div>
        </div>
        <div className="bg-gray-600/40 rounded-md p-4 py-6 min-h-[300px] ">
          
          {loading ? (
            <div className="animate-spin">
              <FaSpinner />
            </div>
          ) : null}

          {!loading && data ? (
            <div className="">
              <p className="text-6xl">{data.word}</p>
              <p className="text-purple-600">{data.phonetic}</p>
              <div className="mt-10 flex flex-col gap-10">
                {data.meanings &&
                  data.meanings.map((key) => {
                    return (
                      <div>
                        <div className="flex items-center gap-6">
                          <p className="text-sm"> {key.partOfSpeech}</p>
                          <div className="h-[1px] w-full bg-gray-600"></div>
                        </div>
                        <p className="text-gray-400 text-md mt-4">Meaning</p>
                        <ul className="flex flex-col gap-2 list-disc	ml-4 mt-2">
                          {key.definitions &&
                            key.definitions.map((definition, index) => {
                              if (index < 8 && definition.example) {
                                return (
                                  <li className="">
                                    <p className="text-sm">
                                      {" "}
                                      {definition.definition}
                                    </p>
                                    <p className="text-xs">
                                      {" "}
                                      {definition.example}
                                    </p>
                                  </li>
                                );
                              }
                            })}
                        </ul>

                        <div className="flex gap-6 text-sm mt-6 items-center">
                          <p className="bg-gray-300/40 rounded-sm px-1">
                            Synonyms
                          </p>
                          {key.synonyms &&
                            key.synonyms.map((synonym, index) => {
                              if (index < 3) {
                                return (
                                  <div>
                                    <p className="text-purple-600">
                                      {" "}
                                      {synonym}
                                    </p>
                                  </div>
                                );
                              }
                            })}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <div className="text-white text-sm bg-gray-300/40 rounded-sm px-2">
                <p>Enter Word</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
