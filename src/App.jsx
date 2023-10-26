import React, { useState,useEffect, useCallback,useRef } from "react";
import "./App.css";

function App() {
  const [length,setLength]=useState(6);
  const [password,setPassword]=useState("");
  const [number,setNumber] = useState(true);
  const [character, setCharacter]=useState(true);
  const passRef=useRef();

  const copyPass=useCallback(()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])
  const passwordGenerate=useCallback(()=>{
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let ans=''
    if(number){
      str+='0123456789'
    }
    if(character){
      str+='!@#$%^&*()-_=+[]{}|;:?'
    }
    for(let i =0;i<length;i++){
      ans+=str.charAt(Math.floor(Math.random()*str.length));
    }
    setPassword(ans);
  },[number,length,character])
  useEffect(()=>{
    passwordGenerate();
  },[length,number,character])
  return (
    <>
      <h1>Password Generator</h1>
      <div className="wrapper">
        <div className="input-wrapper">
          <input type="text" id="password-field" value={password} readOnly ref={passRef}/>
          <button id="copy-btn" onClick={copyPass}>Copy</button>
        </div>
        <div className="setter-wrapper">
          <div className="inner-wrapper" style={{marginLeft:'15px'}}>
            <input type="range" id="length" min={6} max={20} value={length} onChange={(e)=>{
              setLength(e.target.value)
            }}></input>
            <label htmlFor="length">Length ({length})</label>
          </div>
          <div className="inner-wrapper">
            <input type="checkbox" id="char" onChange={()=>{setCharacter((e)=>!e)}} checked={character}></input>
            <label htmlFor="char">Special Characters</label>
          </div>
          <div className="inner-wrapper" style={{marginRight:'15px'}}>
            <input type="checkbox" id="num" onChange={()=>{setNumber((e)=>!e)}} checked={number}></input>
            <label htmlFor="num">Numbers</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
