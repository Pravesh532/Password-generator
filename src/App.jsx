import { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [charAllowed, setCharAllowed] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}[]";
    
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  return (
    <>
      <h2>My Password Generator</h2>
      <div className='w-full max-w-md mx-auto rounded-lg px-4 my-8 bg-gray'>
        <input
          type='text'
          value={password}
          placeholder='password'
          readOnly
        />
        <button onClick={handleCopy}>Copy</button>
      </div>

      <div>
        <div>
          <input
            type='range'
            min={6}
            max={15}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label> Length: {length} </label>
          <div>
            <input
              type='checkbox'
              checked={charAllowed}
              id='charAllowed'
              onChange={() => setCharAllowed(prev => !prev)}
            />
            <label htmlFor="charAllowed">Special Characters</label>
          </div>
          <div>
            <input
              type='checkbox'
              checked={numberAllowed}
              id='numberAllowed'
              onChange={() => setNumberAllowed(prev => !prev)}
            />
            <label htmlFor="numberAllowed">Numbers</label>
          </div>
        </div>

        <button onClick={passwordGenerator}>Generate Password</button>
      </div>
    </>
  );
}

export default App;
