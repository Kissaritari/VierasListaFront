"use client";


import { useState, Suspense } from "react";
import { useDatabase } from "../hooks/useDatabase";
import { useSearchParams } from "next/navigation";
import Window from "./components/Window";
import Taskbar from "./components/Taskbar";
import Form from "./components/Form";

function HomeContent() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [windowVisible, setWindowVisible] = useState(true);
  const [windowMinimized, setWindowMinimized] = useState(false);
  const [windowMaximized, setWindowMaximized] = useState(false);
  const [count, setCount] = useState(0);
  const [inputError, setInputError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [dietary, setDietary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [nameForSuccess, setNameForSuccess] = useState("");
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
      await addItem("quests", {
        name,
        number_of_quests: count,
        diets: dietary,
      });
      setNameForSuccess(name); // store name for success message
      setSuccess(true);
      setName("");
      setCount(0);
      setDietary("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Virhe tallennuksessa");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-[#008080]">
      {windowVisible && <div className="flex-1 flex items-center justify-center">
        <Window
          windowMinimized={windowMinimized}
          windowMaximized={windowMaximized}
          setWindowMinimized={setWindowMinimized}
          setWindowMaximized={setWindowMaximized}
          setWindowVisible={setWindowVisible}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
        >
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
          <p>
            Ilmoittaudu mukaan juhlaan alla olevalla lomakkeella. Ilmoittautumisaika päättyy{" "}
            <span className="font-semibold"> 21.07 </span>.
          </p>
          Mahdolliset muistamiset mobilepaylla: {" "}
          <span className="font-semibold"> 045 1276653 </span>
          tai tilisiirrolla: {" "}
          <span className="font-semibold"> FI82 4108 0010 4061 33 </span>
          {success ? (
            <span className="text-green-600 text-lg py-8">Kiitos {nameForSuccess}! Tavataan juhlassa!</span>
          ) : (
            <Form
              name={name}
              setName={setName}
              count={count}
              setCount={setCount}
              dietary={dietary}
              setDietary={setDietary}
              inputError={inputError}
              setInputError={setInputError}
              loading={loading}
              error={error}
              handleSubmit={handleSubmit}
            />
          )}
        </Window>
      </div>}
      <Taskbar windowVisible={windowVisible} onRestore={() => setWindowMinimized(false)} />
    </div>
  );
}
export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
 
