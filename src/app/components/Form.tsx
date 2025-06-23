import React from "react";

interface FormProps {
  name: string;
  setName: (name: string) => void;
  count: number;
  setCount: (count: number) => void;
  dietary: string;
  setDietary: (dietary: string) => void;
  inputError: string | null;
  setInputError: (err: string | null) => void;
  loading: boolean;
  error: string | null;
  handleSubmit: () => void;
}

const Form: React.FC<FormProps> = ({
  name,
  setName,
  count,
  setCount,
  dietary,
  setDietary,
  inputError,
  setInputError,
  loading,
  error,
  handleSubmit,
}) => (
  <>
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
        onKeyDown={(e) => {
          if ([
            'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
            'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
          ].includes(e.key)) {
            setInputError(null);
            return;
          }
          if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
            setInputError(null);
            return;
          }
          if (/^[a-zA-Z]$/.test(e.key)) {
            setInputError('Vain numerot sallittu!');
            e.preventDefault();
            return;
          }
          if (!/^[0-9]$/.test(e.key)) {
            setInputError(null);
            e.preventDefault();
          } else {
            setInputError(null);
          }
        }}
      />
      {inputError && (
        <span className="text-red-600 text-xs block mt-1">{inputError}</span>
      )}
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
  </>
);

export default Form;
