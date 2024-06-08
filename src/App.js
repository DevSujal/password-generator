import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [isNumberInclude, setIsNumberInclude] = useState(false);
  const [isSpecialCharacterInclude, setIsSpecialCharacterInclude] =
    useState(false);

  const passwordGenerator = useCallback(() => {
    copyRef.current.innerHTML = "Copy";
    copyRef.current.style.background = "";
    let pass = "";
    let str = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;
    let specialCharacters = "!@#$%^&*()-_=+[]{}|;:',.<>?/~`";

    let numbers = "0123456789";

    if (isNumberInclude) str += numbers;
    if (isSpecialCharacterInclude) str += specialCharacters;

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(pass);
  }, [setPassword, length, isNumberInclude, isSpecialCharacterInclude]);

  useEffect(passwordGenerator, [
    passwordGenerator,
    length,
    isNumberInclude,
    isSpecialCharacterInclude,
  ]);

  const passwordRef = useRef(null);
  const copyRef = useRef(null);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();

    passwordRef?.current.setSelectionRange(0, length);
    copyRef.current.innerHTML = "Copied";
    copyRef.current.style.background = "rgb(45,254,84)";
    window.navigator.clipboard.writeText(password);
  }, [password, length]);
  return (
    <>
      <div className="bg-black h-screen w-screen p-10">
        <div className=" text-center max-w-xl mx-auto shadow-md rounded-lg  text-orange-500 px-4 my-8 py-3 bg-gray-700">
          <h1 className="text-center text-white font-semibold text-3xl my-3">
            Password Generator
          </h1>
          <div className="flex  text-lg shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              className=" outline-none py-1 px-3 w-full "
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />

            <button
              onClick={copyPasswordToClipBoard}
              ref={copyRef}
              className="outline-none font-semibold bg-blue-700 text-white px-3 py-0.5 shrink-0"
            >
              copy
            </button>
          </div>

          <div className="column flex justify-between text-lg">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={8}
                max={50}
                value={length}
                className=" cursor-pointer"
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="length">length : {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={isNumberInclude}
                id="numberInput"
                onChange={() => setIsNumberInclude((prev) => !prev)}
              />
              <label htmlFor="Numbers">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={isSpecialCharacterInclude}
                id="charInput"
                onChange={() => setIsSpecialCharacterInclude((prev) => !prev)}
              />
              <label htmlFor="Special Characters">Special Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
