import React, { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Login from '../auth/Login'
import Header from '../Header/Header'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import Banner from '../../Pages/Banner/Banner'
import ShowUser from '../../Pages/ShowUsers/Page'
import MessageUsers from '../../Pages/MessageUsers/UserList'
import Conversations from '../../Pages/MessageUsers/Conversation'
import ChatDetails from '../../Pages/MessageUsers/ChatDetails'
import SubscriptionDetail from '../../Pages/SubscriptionDetails/page'
import ReportedUsers from '../../Pages/ReportedUsers/page'
import CoupleMeetingsTable from '../../Pages/MeetingRecordsTable/page'
import Details from '../../Pages/Banner/detail'
import EarnMembers from '../../Pages/EarnMembers/page' // Assuming this is the correct import path
import EditMembers from  '../../Pages/EarnMembers/EditMembers'
import EditSubscription from '../../Pages/EditSubscription/page'
import AllSubscription from '../../Pages/EditSubscription/AllSubscription'
import Notifications from  '../../Pages/Notifications/page'
import PremiumPartner from  '../../Pages/PremiumPartners/Page'
import RefundDetails from '../../Pages/RefundDetails/page'
import ReferralDetails from '../../Pages/ReferralDetails/page'

export default function Home() {
  const [counter , setCounter] = useState(4);

 

  const login = sessionStorage.getItem("login");

  if (!login) {
    // If not logged in, redirect all to login
    return (
      <Routes>
        <Route path="/*" element={<Login />} />
      </Routes>
    );
  }

    
 const countNotification = ( value, unread )=>{
     console.log( "New value ",value)
     setCounter(value)
   
 }




  // If logged in, show header and app routes
  return (
    <>
      <Header  counter={counter}/>
      <div className="rightside">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/banner" element={<Banner/>} />
          <Route path="/showUsers" element={<ShowUser/>} />
          <Route path="/message-users" element={<MessageUsers/>}/>    
          <Route path="/conversations/:id" element={<Conversations/>}/>    
          <Route path="/chat/:user1/:user2" element={<ChatDetails/>} />    
          <Route path="/subscription-details" element={<SubscriptionDetail/>}/>    
          <Route path="/reported-list" element={<ReportedUsers/>}/>    
          <Route path="/meetingrecord-table" element={<CoupleMeetingsTable/>}/> 
          <Route path="/banner/details"  element={<Details />} />
          <Route path="/earn-members"  element={<EarnMembers/>} />
          <Route path="/edit-members"  element={<EditMembers />} /> 
          <Route path="/subscriptions"  element={<EditSubscription/>} /> 
          <Route path="/all-subscriptions"  element={<AllSubscription/>} /> 
          <Route path="/notifications"  element={<Notifications counter={counter}  countNotification={countNotification}/>} /> 
          <Route path="/premium-partner"  element={<PremiumPartner/>} /> 
          <Route path="/refund-detail"  element={<RefundDetails/>} /> 
          <Route path="/referral-detail"  element={<ReferralDetails/>} /> 
          
          {/* Uncomment when components are ready */}
          {/* <Route path="/all-category" element={<AllCategory />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/edit-category/:_id" element={<EditCategory />} /> */}
          
          {/* Fallback route */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
}
