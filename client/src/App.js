import "./App.css";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [reciveMessage, setReciveMessage] = useState("");

  const sendMessage = () => {
    socket.emit("send-message", message);
  };

  useEffect(() => {
    socket.on("recive-data", (data) => {
      setReciveMessage(data);
    });
  }, [socket]);

  return (
    <div className="App w-full flex justify-center mt-5">
      <div className="border-2 border-black p-10 h-96">
        <input
          className="border-2 border-gray-600 rounded-md mx-1"
          type="text"
          placeholder="Message..."
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          onClick={sendMessage}
          className="border-2  py-1 px-10 bg-blue-800 text-white shadow-2xl mx-1 hover:bg-sky-700 border-none"
        >
          Send
        </button>
        <br />
        <h2>{reciveMessage}</h2>
      </div>
    </div>
  );
}

export default App;
