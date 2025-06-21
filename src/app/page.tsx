"use client";

import { useState } from "react";
import { useDatabase } from "../hooks/useDatabase";
import { useSearchParams } from "next/navigation";


export default function Home() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [dietary, setDietary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { addItem } = useDatabase();
  const searchParams = useSearchParams();

  const search = searchParams.get("salasana");
  if (search !== "kissa") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#008080]">
        <h1 className="text-white animate-pulse duration-200 font-bold text-3xl">Salasana väärin!</h1>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (count <= 0 || name === "") {
      alert("Täytä nimi ja henkilömäärä.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await addItem("guests", {
        name,
        number_of_quests: count,
        diets: dietary,
      });
      setSuccess(true);
      setName("");
      setCount(0);
      setDietary("");
    } catch (err: any) {
      setError(err.message || "Virhe tallennuksessa");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[#008080] ">
        <div className="w-full max-w-lg my-12 mx-auto px-2">
          <div className="max-w-lg mx-auto bg-[#cac6cb] text-[#464147] text-sm border border-white border-b-[#464147] border-r-[#464147]">
            <div className="flex flex-row items-center justify-between p-1 bg-gradient-to-r from-[#00007b] to-[#0884ce]">
              <h1 className="text-white">Kutsu(1)</h1>
              <div className="flex items-center space-x-0.5">
                <button
                  type="button"
                  className="flex items-center justify-center px-0.5 w-4 h-4 bg-[#cac6cb] border border-white border-b-black border-r-black"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M480 480H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h448c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center w-4 h-4 bg-[#cac6cb] border border-white border-b-black border-r-black"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 21h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zm0-2V7h16l.001 12H4z"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center w-4 h-4 bg-[#cac6cb] border border-white border-b-black border-r-black"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                      d="M7,7 L17,17 M7,17 L17,7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="border border-b-[#dadada]">
              <ul className="flex">
                <li className="p-1 first-letter:underline">New</li>
                <li className="p-1 first-letter:underline">Options</li>
                <li className="p-1 first-letter:underline">Help</li>
              </ul>
            </div>
            <div className="space-y-0.5 bg-[#808080]">
              <div className=" bg-[#cac6cb] ">
                <div className="flex flex-col mt-2 space-y-3 mx-2">
                  <h2 className="font-bold text-lg border-b">
                    Tervetuloa Sakun valmistujaisiin!
                  </h2>
                  <p>
                    <span className="font-semibold"> 26.07 </span> klo 15 alkaen
                  </p>
                  <p>
                    osoitteessa{" "}
                    <span className="font-semibold">
                      Kalevankatu 3, 2. kerros, 60100 Seinäjoki
                    </span>
                  </p>
                  <p className="border-t">
                    <input
                      type="text"
                      placeholder="Nimi*"
                      className="w-full windows95-input"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                    <input
                      type="number"
                      placeholder="Osallistujien määrä*"
                      className="w-full mt-1 windows95-input"
                      onChange={(e) => setCount(Number(e.target.value))}
                      value={count === 0 ? "" : count}
                    />
                    <input
                      type="text"
                      placeholder="Erityisruokavaliot"
                      className="w-full mt-1 windows95-input"
                      onChange={(e) => setDietary(e.target.value)}
                      value={dietary}
                    />
                  </p>
                  <button
                    disabled={count <= 0 || name === "" || loading}
                    type="button"
                    onClick={handleSubmit}
                    aria-label="Ilmoittaudu"
                    className="flex items-center justify-center px-2 bg-[#cac6cb] border border-white border-b-black border-r-black hover:cursor-pointer"
                  >
                    {loading ? "Tallennetaan..." : "Ilmoittaudu!"}
                  </button>
                  {error && <span className="text-red-600">{error}</span>}
                  {success && <span className="text-green-600">Kiitos {name || "vieras"}! Tavataan juhlassa!</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

