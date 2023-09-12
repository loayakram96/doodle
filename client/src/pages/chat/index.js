import styles from "./styles.module.css";
import MessagesReceived from "./messages";
import SendMessage from "./send_message";
import RoomAndUsersColumn from "./room-and-users";

const Chat = ({ username, room, socket }) => {
  return (
    <div className={styles.chatContainer}>
      <div>
        <MessagesReceived socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
      <RoomAndUsersColumn socket={socket} username={username} room={room} />
    </div>
  );
};

export default Chat;
