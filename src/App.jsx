import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const useref = useRef(null);
  const [password, setPass] = useState("");
  const [length, setLegth] = useState(6);
  const [numbers, setNumbers] = useState(false);
  const [char, setChar] = useState(false);
  const [copy, setCopy] = useState("Copy");
  const passwordGenerator = useCallback(() => {
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let Pass = "";
    if (numbers) string += "0123456789";
    if (char) string += `~!@#$%^&*()_+<>?/`;
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length + 1);
      console.log(char);
      Pass += string.charAt(char);
    }
    setPass(Pass);
    setCopy("copy");
  }, [numbers, char, setPass, length]);
  useEffect(() => {
    passwordGenerator();
  }, [numbers, char, length]);
  const copyToClip = useCallback(() => {
    useref.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopy("copied");
  }, [password]);
  
  return (
    <>
      <div
        className="w-full max-w-md h-auto shadow-md bg-gray-800 text-orange-600 mx-auto rounded-lg px-4 py-3 my-8 
        "
      >
        <h1 className="text-white text-center">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Pasword"
            id=""
            readOnly
            ref={useref}
          />
          <button
            className=" outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 cursor-pointer"
            onClick={copyToClip}
          >
            {copy}
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              className=" cursor-pointer"
              min={6}
              max={20}
              value={length}
              onChange={(e) => {
                setLegth(e.target.value);
              }}
            />
            <label>Length :{length}</label>
          </div>
          <input
            type="checkbox"
            defaultChecked={numbers}
            onChange={() => {
              setNumbers((prev) => !prev);
            }}
            name=""
            id=""
          />
          <label htmlFor="">Numbers</label>
          <input
            type="checkbox"
            name=""
            defaultChecked={char}
            onChange={() => {
              setChar((prev) => !prev);
            }}
            id=""
          />
          <label htmlFor="">Char</label>
        </div>
      </div>
    </>
  );
}

export default App;
