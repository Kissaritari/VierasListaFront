import React, { useState } from "react";
import { useDatabase } from "../hooks/useDatabase";

const AddGuestForm = () => {
  const { addItem } = useDatabase();
  const [name, setName] = useState("");
  const [numberOfQuests, setNumberOfQuests] = useState(0);
  const [diets, setDiets] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await addItem("guests", {
        name,
        number_of_quests: numberOfQuests,
        diets,
      });
      setSuccess(true);
      setName("");
      setNumberOfQuests(0);
      setDiets("");
    } catch (err: any) {
      setError(err.message || "Error adding guest");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h2>Add Guest</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Number of Quests:</label>
        <input
          type="number"
          value={numberOfQuests}
          onChange={e => setNumberOfQuests(Number(e.target.value))}
          min={0}
        />
      </div>
      <div>
        <label>Diets:</label>
        <input
          type="text"
          value={diets}
          onChange={e => setDiets(e.target.value)}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Guest"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>Guest added!</div>}
    </form>
  );
};

export default AddGuestForm;
