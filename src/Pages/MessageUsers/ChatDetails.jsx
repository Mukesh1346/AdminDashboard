import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { users, chats } from '../data/mockData';

export default function ChatDetails() {
  const { user1, user2 } = useParams();
  const navigate = useNavigate();

  const u1 = users.find(u => u.serial === Number(user1));
  const u2 = users.find(u => u.serial === Number(user2));

  const chatKey = `${user1}-${user2}`;
  const reverseKey = `${user2}-${user1}`;
  const chat = chats[chatKey] || chats[reverseKey] || [];

  return (
    <div style={{ margin: "100px 20px 20px 301px", width: "76%", position: "relative" }}>
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "8px 16px",
          backgroundColor: "#0d6efd",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        ← Back
      </button>
<div className='text-center'>
  
<h2 style={{ marginBottom: "30px", marginTop: "40px" }}>
        Chat between <strong>{u1?.name}</strong> and <strong>{u2?.name}</strong>
      </h2>
</div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {chat.map((msg, idx) => {
          const isSender = msg.from === Number(user1);
          return (
            <div
              key={idx}
              style={{
                alignSelf: isSender ? "flex-start" : "flex-end",
                maxWidth: "60%",
                backgroundColor: isSender ? "#d1e7dd" : "#cce5ff",
                padding: "10px 15px",
                borderRadius: "16px",
                borderTopLeftRadius: isSender ? "0" : "16px",
                borderTopRightRadius: isSender ? "16px" : "0",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              }}
            >
              <strong>{users.find(u => u.serial === msg.from)?.name}</strong><br />
              {msg.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
