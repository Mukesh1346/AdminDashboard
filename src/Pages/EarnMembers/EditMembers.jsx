import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EarnMemberForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    method: '',
    price: ''
  });
 const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', address: '', method: '', price: '' });
  };

  return (
    <section  style={{ margin: '96px 0px 0px 261px', width: '82%' }}>
<div >
      <h4 className="mb-4 text-center">Add New Member</h4>
      <form onSubmit={handleSubmit}>
        
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Method</label>
            <input type="text" className="form-control" name="method" value={formData.method} onChange={handleChange} required />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Price</label>
            <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <button type="submit" className="btn btn-primary">✔️ Submit</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>← Back</button>
        </div>
      </form>
    </div>

    </section>

    
  );
}
