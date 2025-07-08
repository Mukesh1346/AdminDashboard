import React, { useState } from 'react';
import { FaBackward } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export default function SubscriptionForm() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const [activeFeature, setActiveFeature] = useState('');
  const [notActiveFeature, setNotActiveFeature] = useState('');

  const [activeFeatures, setActiveFeatures] = useState([]);
  const [notActiveFeatures, setNotActiveFeatures] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const addActiveFeature = () => {
    if (activeFeature.trim()) {
      setActiveFeatures([...activeFeatures, activeFeature.trim()]);
      setActiveFeature('');
    }
  };

  const addNotActiveFeature = () => {
    if (notActiveFeature.trim()) {
      setNotActiveFeatures([...notActiveFeatures, notActiveFeature.trim()]);
      setNotActiveFeature('');
    }
  };

  const deleteActiveFeature = (index) => {
    setActiveFeatures(activeFeatures.filter((_, i) => i !== index));
  };

  const deleteNotActiveFeature = (index) => {
    setNotActiveFeatures(notActiveFeatures.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const saveSubscription = () => {
    const subscription = {
      title,
      price,
      subtitle,
      activeFeatures,
      notActiveFeatures
    };

    const existingData = JSON.parse(localStorage.getItem('subscriptions')) || [];
    existingData.push(subscription);
    localStorage.setItem('subscriptions', JSON.stringify(existingData));

    setShowModal(false);
    navigate('/all-subscriptions'); // Assuming this is your table page route
  };

  return (
    <div style={{ margin: '96px 0px 0px 261px', width: '82%' }}>
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Create Subscription Plan</h2>

        <div className="mb-3">
          <button className="btn btn-primary  " onClick={() => navigate('/all-subscriptions')}>
            <FaBackward className="me-2" /> 
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Subscription Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>Price (per month)</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>Subtitle</label>
              <input
                type="text"
                className="form-control"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-6">
              <h5>Active Features</h5>
              <div className="d-flex mb-2">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Add Active Feature"
                  value={activeFeature}
                  onChange={(e) => setActiveFeature(e.target.value)}
                />
                <button type="button" className="btn btn-success" onClick={addActiveFeature}>+</button>
              </div>
              <ul className="list-group mb-3">
                {activeFeatures.map((feature, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {feature}
                    <button type="button" className="btn btn-sm btn-danger" onClick={() => deleteActiveFeature(index)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-6">
              <h5>Not Active Features</h5>
              <div className="d-flex mb-2">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Add Not Active Feature"
                  value={notActiveFeature}
                  onChange={(e) => setNotActiveFeature(e.target.value)}
                />
                <button type="button" className="btn btn-warning" onClick={addNotActiveFeature}>+</button>
              </div>
              <ul className="list-group mb-3">
                {notActiveFeatures.map((feature, index) => (
                  <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {feature}
                    <button type="button" className="btn btn-sm btn-danger" onClick={() => deleteNotActiveFeature(index)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <button type="submit" className="btn btn-primary">Save Subscription</button>
          </div>
        </form>

        {/* Popup Modal */}
        {showModal && (
          <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Subscription Plan Details</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body text-center">
                  <div className="card shadow p-3 mb-3">
                    <h4>{title}</h4>
                    <h2>${price} <small>/month</small></h2>
                    <p>{subtitle}</p>

                    <div className="text-start">
                      <h6 className="text-success">✔ Active Features:</h6>
                      <ul className="list-group mb-3">
                        {activeFeatures.length === 0 && <li className="list-group-item">None</li>}
                        {activeFeatures.map((feature, index) => (
                          <li key={index} className="list-group-item">{feature}</li>
                        ))}
                      </ul>

                      <h6 className="text-danger">✖ Not Active Features:</h6>
                      <ul className="list-group">
                        {notActiveFeatures.length === 0 && <li className="list-group-item">None</li>}
                        {notActiveFeatures.map((feature, index) => (
                          <li key={index} className="list-group-item">{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-success" onClick={saveSubscription}>Confirm & Save</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
