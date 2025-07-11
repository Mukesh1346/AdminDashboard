import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './dashboard.css'
import { FaUsers, FaComments} from 'react-icons/fa';
import { IoPricetagsOutline } from "react-icons/io5";
import { FaHandshake } from "react-icons/fa6";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdOutlineAppBlocking } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { FcTwoSmartphones } from "react-icons/fc";


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
    { label: 'Meeting Records', value: connections, icon: < FaHandshake/>, link: '/meetingrecord-table' },
    { label: 'Subscriptions & Payments', value: subscriptions, icon: <IoPricetagsOutline  />, link: '/subscription-details' },
    { label: 'Notifications', value: notifications, icon: <IoNotificationsSharp/>, link: '/notifications' },
    { label: 'Reported Profiles', value: reported, icon: < MdOutlineAppBlocking/>, link: '/reported-list' },
    { label: 'Refund Detail', value: reported, icon: <GiTakeMyMoney />, link: '/refund-detail' },
    { label: 'Referral Detail', value: reported, icon: <FcTwoSmartphones  />, link: '/referral-detail' },
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
