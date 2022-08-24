import { useRef } from 'react';
import './Start.css';
export default function Start({ setUsername }) {
  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
  };
  const inputRef = useRef();
  return (
    <div className="start">
      <input
        className="usernameInput"
        placeholder="Please enter your name"
        ref={inputRef}
      />
      <button className="playButton" onClick={handleClick}>
        Play
      </button>
    </div>
  );
}
