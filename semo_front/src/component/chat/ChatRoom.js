import React, { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";

const ChatRoom = (props) => {
  const { roomId, senderName } = props;
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const clientRef = useRef(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:9999/ws",
      onConnect: () => {
        console.log("WebSocket connected");
        client.subscribe(`/chat/rooms/${roomId}`, (message) => {
          const receivedMsg = JSON.parse(message.body);
          console.log("Received message:", receivedMsg);
          onMessageReceive(receivedMsg, `/chat/rooms/${roomId}`);
        });
      },
      onDisconnect: () => {
        console.log("WebSocket disconnected");
      },
    });

    client.onStompError = (frame) => {
      console.error("STOMP error", frame);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [roomId]);

  const onMessageReceive = (msg, index) => {
    setMessages((prevMessages) => {
      const currentRoomMessages = prevMessages[roomId] || [];
      return {
        ...prevMessages,
        [roomId]: [...currentRoomMessages, msg],
      };
    });
  };

  const sendMessage = () => {
    if (clientRef.current && newMessage) {
      const messagePayload = {
        message: newMessage,
        senderName: senderName,
        roomId: roomId,
      };
      clientRef.current.publish({
        destination: "/app/chat/" + roomId,
        body: JSON.stringify(messagePayload),
      });
      setNewMessage("");
    }
  };

  return (
    <div>
      <div>
        <h2>Room: {roomId}</h2>
        <div>
          {messages[roomId]?.map((msg, idx) => (
            <div key={idx}>
              {msg.senderName}: {msg.message}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
