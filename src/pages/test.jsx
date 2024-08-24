import React from "react";
import { useState, useEffect } from "react";

export default function Test() {
  //   const [name, setName] = useState("");
  //   const changeName = function () {
  //     setName("Mateen");
  //   };

  //The Effect Hook, just like the name implies, carries out an effect each time there is a state change.
  //By default, it runs after the first render and every time the state is updated.

  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(`You have clicked this button ${count} times`);
  }, [count]);

  const [count2, setCount2] = useState(0);

  useEffect(() => {
    console.log(`You have clicked the second button ${count2} times`);
  }, [count2]);

  return (
    // <div>
    //     <p>My first name is {name}</p>
    //     <button onClick={changeName}>Reveal Name</button>
    // </div>

    <div>
      {/* <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <p>{name}</p>
      </form> */}
      <p>You have clicked this button {count} times</p>

      <div>
        <button onClick={() => setCount(count + 1)}>Click me</button>
        <button onClick={() => setCount2(count2 + 1)}>Click me</button>
      </div>

      
    </div>
  );
}
