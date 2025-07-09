import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const allNotifications = [
  {
    id: 1,
    type: 'signup',
    icon: 'bi-person-plus-fill',
    message: 'New user registered: Priya Sharma (ID #1023)',
    time: 'Just now',
    read: false,
  },
  {
    id: 2,
    type: 'profile_update',
    icon: 'bi-pencil-fill',
    message: 'User Raj updated profile picture',
    time: '2 min ago',
    read: false,
  },
  {
    id: 3,
    type: 'subscription',
    icon: 'bi-credit-card-fill',
    message: 'User Anjali purchased Gold Plan',
    time: '5 min ago',
    read: true,
  },
  {
    id: 4,
    type: 'report',
    icon: 'bi-flag-fill text-danger',
    message: 'User Rakesh reported user Soniya for spam',
    time: '10 min ago',
    read: false,
  },
  {
    id: 5,
    type: 'message',
    icon: 'bi-chat-dots-fill',
    message: 'User Aditya started a conversation with Neha',
    time: '15 min ago',
    read: true,
  },
  {
    id: 6,
    type: 'kyc',
    icon: 'bi-shield-lock-fill',
    message: 'User Rahul submitted KYC documents',
    time: '30 min ago',
    read: false,
  },
  {
    id: 7,
    type: 'error',
    icon: 'bi-exclamation-triangle-fill text-warning',
    message: 'Payment gateway error on user ID #1043',
    time: '1 hour ago',
    read: true,
  },
];

export default function NotificationPage() {
  const [filter, setFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const navigate = useNavigate();

  const filteredNotifications = allNotifications.filter((note) => {
    const filterByRead =
      filter === 'unread' ? !note.read : true;
    const filterByType =
      typeFilter === 'all' ? true : note.type === typeFilter;

    return filterByRead && filterByType;
  });


  const handleNotificationClick = (note) => {
    switch (note.type) {
      case 'signup':
        navigate(`/users`); // example: user detail page
        break;
      case 'profile_update':
        navigate(`/showUsers`);
        break;
      case 'subscription':
        navigate(`/subscription-details`);
        break;
      case 'report':
        navigate(`/reported-list`);
        break;
      case 'message':
        navigate(`/message-users`);
        break;
      case 'kyc':
        navigate(`/kyc/${note.id}`);
        break;
      case 'error':
        navigate(`/errors/${note.id}`);
        break;
      default:
        break;
    }
  };





  return (
    <>
      <div style={{ margin: '96px 0px 0px 261px', width: '82%' }}>
 <h3 className="text-center text-primary"> NOTIFICATIONS</h3>
        <div className="container py-4">
          {/* <h2 className="mb-4">
            <i className="bi bi-bell-fill me-2 text-primary"></i>
            Notifications
          </h2> */}

          {/* Filters */}
          <div className="d-flex gap-3 mb-4">
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                type="button"
                className={`btn btn-sm ${filter === 'unread' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('unread')}
              >
                Unread
              </button>
            </div>

            <select
              className="form-select form-select-sm w-auto"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="signup">New Signup</option>
              <option value="profile_update">Profile Update</option>
              <option value="subscription">Subscription</option>
              <option value="report">Report</option>
              <option value="message">Message</option>
              <option value="kyc">KYC</option>
              <option value="error">Error</option>
            </select>
          </div>

          {/* Notification List */}
          <div className="row">
            {filteredNotifications.map((note) => (
              <div className="col-md-12 mb-3" key={note.id}>
                <div
                  className={`card ${note.read ? '' : 'border-primary'} cursor-pointer`}
                  onClick={() => handleNotificationClick(note)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-body d-flex gap-3 align-items-start" style={{ background: "aliceblue", borderRadius: "20px" }}>
                    <i className={`bi ${note.icon} fs-4`}></i>
                    <div>
                      <p className="mb-1">{note.message}</p>
                      <small className="text-muted">{note.time}</small>
                    </div>
                    {!note.read && <span className="badge bg-primary ms-auto">Unread</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <p className="text-muted text-center">No notifications found.</p>
          )}
        </div>
      </div>

    </>
  );
}
