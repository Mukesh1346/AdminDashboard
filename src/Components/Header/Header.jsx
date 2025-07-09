import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const  Header = () => {
  const [sidetoggle,setSideToggle] = useState(false)

  const handletoggleBtn =()=>{
    setSideToggle(!sidetoggle)
  }

  const logout = ()=>{
    sessionStorage.clear()
    window.location.href = "/"
  }
  return (
    <>
      <header>
        <div className="top-head">
          <div className="right">
            <img src="/log.png" style={{height:50}} alt="" />
            <h2>LUVNESTOR</h2>
            <div className="bar" onClick={handletoggleBtn}>
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
          <div className="left ">
            <a href="/" className='bg-theme' target="_blank">
             
            Our Website,
            <i className="fa-solid fa-globe"></i>
            </a>
          </div>

        </div>

        <div className={`rightNav ${sidetoggle ? "active" : "" } `}>
          <ul>
            <li><Link to="/dashboard"  onClick={handletoggleBtn}> <i className="fa-solid fa-gauge"></i> Dashboard</Link></li>
            <li><Link to="/banner" onClick={handletoggleBtn}> <i className="fa-regular fa-images"></i>Banners</Link></li>
            <li><Link to="/earn-members" onClick={handletoggleBtn}> <i className="fa-solid fa-tag"></i>EarnMembers</Link></li>
            <li><Link to="/subscriptions" onClick={handletoggleBtn}> <i className="fa-solid fa-tag"></i>Edit Subcription</Link></li>

            <li><Link to="/showUsers" onClick={handletoggleBtn}> <i className="fa-solid fa-user"></i>Manage Users</Link></li>
            <li><Link to="/message-users" onClick={handletoggleBtn}> <i className="fa-solid fa-message"></i>Message</Link></li>
            <li><Link to="/meetingrecord-table" onClick={handletoggleBtn}> <i className="fa-solid fa-folder-open"></i>Meeting Record</Link></li>
            <li><Link to="/subscription-details" onClick={handletoggleBtn}> <i className="fa-solid fa-credit-card"></i>Subscription & Payment</Link></li>
            <li><Link to="/reported-list" onClick={handletoggleBtn}> <i className="fa-solid fa-heart"></i>Reported Profiles</Link></li>
            <li><Link to="/premium-partners" onClick={handletoggleBtn}> <i className="fa-solid fa-heart"></i>Premium Partner</Link></li>
            {/* <li><Link to="/all-products" onClick={handletoggleBtn}> <i className="fa-solid fa-layer-group"></i> Product</Link></li>
            <li><Link to="/all-blog" onClick={handletoggleBtn}> <i className="fa-solid fa-layer-group"></i> Blog</Link></li>
                
           
            <li><Link to="/all-shop-banners" onClick={handletoggleBtn}> <i className="fa-brands fa-unsplash"></i>Contact Query</Link></li>
            <li><Link to="/all-voucher" onClick={handletoggleBtn}> <i className="fa-solid fa-layer-group"></i>Enquiry Query</Link></li>
            <li><Link to="/all-subscription-email" onClick={handletoggleBtn}> <i className="fa-solid fa-layer-group"></i>Subscription Users</Link></li> */}
            {/* <li><Link to="/all-cart-enquiry" onClick={handletoggleBtn}> <i className="fa-solid fa-layer-group"></i> All Cart Enquiry</Link></li> */}
            {/* <li><Link to="/all-users" onClick={handletoggleBtn}> <i className="fa-solid fa-user"></i> All Users</Link></li>
            <li><Link to="/all-orders" onClick={handletoggleBtn}> <i className="fa-solid fa-truck-arrow-right"></i> Manage Orders</Link></li> */}
            
            <button className='logout mb-5' onClick={logout}>Log Out <i className="fa-solid fa-right-from-bracket"></i></button>

          </ul>
        </div>

      </header>
    </>
  )
}

export default Header; 
