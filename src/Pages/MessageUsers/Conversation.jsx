import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { users, messages } from '../data/mockData';

export default function Conversations() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = users.find(u => u.serial === Number(id));
  const talkedTo = messages[id] || [];

  return (
    <div style={{ margin: "100px 20px 20px 301px", width: "79%", position: "relative" }}>
      
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

      <h2 style={{ marginTop: "40px" }}>{user?.name}'s Conversations</h2>
      </div>
      
      <ul>
        {talkedTo.map((partnerId, index) => {
          const partner = users.find(u => u.serial === partnerId);
          return (
            <li key={index} style={{ margin: "10px 0" }}>
              {partner?.name}
              <button
                onClick={() => navigate(`/chat/${user.serial}/${partner.serial}`)}
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px'
                }}
              >
                View Chat
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
