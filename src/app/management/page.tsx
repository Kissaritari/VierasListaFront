"use client";

import { useEffect, useState } from "react";
import { useDatabase } from "../../hooks/useDatabase";

export default function Management() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getItems } = useDatabase();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const items = await getItems("quests");
        setData(items);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Virhe haussa");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#008080]">
      <div className="w-full max-w-2xl my-12 mx-auto px-2">
        <div className="max-w-2xl mx-auto bg-[#cac6cb] text-[#464147] text-sm border border-white border-b-[#464147] border-r-[#464147]">
          <div className="flex flex-row items-center justify-between p-1 bg-gradient-to-r from-[#00007b] to-[#0884ce]">
            <h1 className="text-white">Hallintasivu</h1>
          </div>
          <div className="p-4">
            {/* Total number of people */}
            <div className="mb-2 font-bold">
              Yhteensä osallistujia: {data.reduce((sum, item) => sum + (Number(item.number_of_quests) || 0), 0)}
            </div>
            {loading ? (
              <div>Ladataan...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : (
              <table className="w-full border-collapse border border-[#464147]">
                <thead>
                  <tr>
                    <th className="border border-[#464147] p-1">Nimi</th>
                    <th className="border border-[#464147] p-1">Osallistujia</th>
                    <th className="border border-[#464147] p-1">Erityisruokavaliot</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center p-2">Ei ilmoittautumisia</td>
                    </tr>
                  ) : (
                    data.map((item, idx) => (
                      <tr key={idx}>
                        <td className="border border-[#464147] p-1">{item.name}</td>
                        <td className="border border-[#464147] p-1">{item.number_of_quests}</td>
                        <td className="border border-[#464147] p-1">{item.diets}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
