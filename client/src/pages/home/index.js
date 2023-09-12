import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Home = ({ username, setUsername, room, setChatRoom, socket }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const joinChat = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
      navigate("/chat", { replace: true });
    } else {
      setError("Please enter a username and select a channel");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`Doodle Chat`}</h1>
        <input
          className={styles.input}
          placeholder="Username..."
          onChange={(e) => setUsername(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              joinChat();
            }
          }}
        />

        <select
          className={styles.input}
          onChange={(e) => setChatRoom(e.target.value)}
        >
          <option>-- Select Channel --</option>
          <option value="dev">Dev</option>
          <option value="sales">Sales</option>
          <option value="marketing">Marketing</option>
          <option value="all_hands">All Hands</option>
        </select>
        <div className={styles.submit}>
          {error && <h5 className={styles.error}>{error}</h5>}
          <button
            className="btn btn-secondary"
            style={{ width: "100%" }}
            onClick={joinChat}
          >
            Join Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
