import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './dashboard.css'
import { FaUsers, FaComments, FaUserCheck, FaImage, FaUserPlus, FaHeart } from 'react-icons/fa';


export default function Dashboard() {
  const [users, setuser] = useState(0);
  const [messages, setMessages] = useState(10);
  const [connections, setConnections] = useState(13);
  const [subscriptions, setSubscriptions] = useState(11);
  const [notifications, setNotifications] = useState(0);
  const [reported , setReported] = useState(0);

  const data = [
    { label: 'Manage Users', value: users, icon: <FaUsers />, link: '/showUsers' },
    { label: 'Messages', value: messages, icon: <FaComments />, link: '/message-users' },
    { label: 'Meeting Records', value: connections, icon: <FaUserCheck />, link: '/meetingrecord-table' },
    { label: 'Subscriptions & Payments', value: subscriptions, icon: <FaImage />, link: '/subscription-details' },
    { label: 'Notifications', value: notifications, icon: <FaUserPlus />, link: '/new-signups' },
    { label: 'Reported Profiles', value: reported, icon: <FaHeart />, link: '/reported-list' },
  ];
  


  return (
    <div style={{margin:"96px 0px 0px 261px", width:"82%"}}>
      <h2 className='text-center'>Admin Dashboard</h2>
      <div className='dashboard-cards'>
{  data.map((item,index)=>(
  <Link to={item.link} key={index}  className='dashboard-card link-style'>
    <div className='dashboard-icon'>{item.icon}</div>
    <div className='text-light'>{item.label}</div>
    <p>{item.value}</p>
   


  </Link>
))



}

      </div>

      
    </div>
  )
}
