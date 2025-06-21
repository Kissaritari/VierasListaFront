"use client";


import { useEffect, useState } from "react";
import { useDatabase } from "../../hooks/useDatabase";
import { useSupabaseClient } from "../../hooks/useSupabaseClient";


export default function Management() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getItems } = useDatabase();
  const supabase = useSupabaseClient();
  const [user, setUser] = useState<any>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);


  // Check auth state on mount
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getSession();
  }, [supabase]);

  // Fetch data if logged in
  useEffect(() => {
    if (!user) return;
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
  }, [user]);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    if (error) {
      setLoginError(error.message);
    } else {
      setUser(data.user);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setData([]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#008080]">
      <div className="w-full max-w-2xl my-12 mx-auto px-2">
        <div className="max-w-2xl mx-auto bg-[#cac6cb] text-[#464147] text-sm border border-white border-b-[#464147] border-r-[#464147]">
          <div className="flex flex-row items-center justify-between p-1 bg-gradient-to-r from-[#00007b] to-[#0884ce]">
            <h1 className="text-white">Hallintasivu</h1>
            {user && (
              <button onClick={handleLogout} className="text-xs bg-[#008080] text-white px-2 py-1 rounded">Kirjaudu ulos</button>
            )}
          </div>
          <div className="p-4">
            {!user ? (
              <form onSubmit={handleLogin} className="max-w-xs mx-auto bg-white p-4 rounded shadow">
                <div className="mb-2 font-bold text-center">Kirjaudu sisään</div>
                <input
                  type="email"
                  placeholder="Sähköposti"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  className="w-full mb-2 p-1 border border-[#464147] rounded"
                  required
                />
                <input
                  type="password"
                  placeholder="Salasana"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  className="w-full mb-2 p-1 border border-[#464147] rounded"
                  required
                />
                {loginError && <div className="text-red-600 text-xs mb-2">{loginError}</div>}
                <button type="submit" className="w-full bg-[#008080] text-white py-1 rounded">Kirjaudu</button>
              </form>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
