import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { users, messages } from '../data/mockData';

export default function Conversations() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = users.find(u => u.serial === Number(id));
  const talkedTo = messages[id] || [];

  // Local state to track active status per partner
  const [activeStatus, setActiveStatus] = useState(
    Object.fromEntries(talkedTo.map(pid => [pid, true])) // default: active
  );

  const toggleActive = (partnerId) => {
    setActiveStatus(prev => ({
      ...prev,
      [partnerId]: !prev[partnerId],
    }));
  };

  return (
    <div style={{ margin: "100px 20px 20px 301px", width: "79%", position: "relative" }}>
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

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px' }}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Aadhaar No</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
            {/* <th style={thStyle}>Block</th> */}
      
          </tr>
        </thead>
        <tbody>
          {talkedTo.map((partnerId, index) => {
            const partner = users.find(u => u.serial === partnerId);
            return (
              <tr key={index}>
                <td style={tdStyle}>{partner?.name}</td>
                <td style={tdStyle}>{partner?.aadhaar}</td>
                <td style={tdStyle}>
               <button
  onClick={() => toggleActive(partnerId)}
  style={{
    ...buttonStyleRed,
    marginLeft: '10px',
    backgroundColor: activeStatus[partnerId] ?  '#dc3545'  :'#ffc107'
  }}
>
  {activeStatus[partnerId] ? 'Chat Deactivate' : 'Chat Activate'}
</button>
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => navigate(`/chat/${user.serial}/${partner.serial}`)}
                    style={buttonStyleGreen}
                  >
                    View Chat
                  </button>
                  
                </td>
                 {/* <td style={tdStyle}>
                      <button className='btn btn-primary'>
                        Block
                      </button>
                 </td> */}

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  backgroundColor: '#f5f5f5',
  textAlign: 'left'
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '10px'
};

const buttonStyleGreen = {
  padding: '6px 10px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const buttonStyleRed = {
  padding: '6px 10px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};
