// components/Createpage.js
'use client';
import './Createpage.css'
const Createpage = ({ formData, onChange, onSubmit, isEdit = false }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="create-form-field">
        <label className="create-form-label">Asset Name</label>
        <input className="create-form-input" type="text" name="name" required value={formData.name} onChange={onChange} />
      </div>
      <div className="create-form-field">
        <label className="create-form-label">Type</label>
        <input className="create-form-input" type="text" name="type" required value={formData.type} onChange={onChange} />
      </div>
      <div className="create-form-field">
        <label className="create-form-label">Status</label>
        <select className="create-form-select" name="status" value={formData.status} onChange={onChange}>
          <option value="active">Active</option>
          <option value="maintenance">Under Maintenance</option>
        </select>
      </div>
      <div className="create-form-field">
        <label className="create-form-label">Serial</label>
        <input className="create-form-input" type="text" name="serial" value={formData.serial} onChange={onChange} />
      </div>
      <div className="create-form-field">
        <label className="create-form-label">User/Assigned To</label>
        <input className="create-form-input" type="text" name="user" value={formData.user} onChange={onChange} />
      </div>
      <div className="create-form-field">
        <label className="create-form-label">Location</label>
        <input className="create-form-input" type="text" name="location" value={formData.location} onChange={onChange} />
      </div>
      <div className="create-form-field">
        <label className="create-form-label">Purchase Date</label>
        <input className="create-form-input" type="date" name="purchased" value={formData.purchased} onChange={onChange} />
      </div>
      <div className="create-form-field">
        <label className="create-form-label">Value (₹)</label>
        <input className="create-form-input" type="number" name="value" required min="0" step="0.01" value={formData.value} onChange={onChange} />
      </div>
      <button type="submit" className="create-form-btn">
        {isEdit ? "Update Asset" : "Create Asset"}
      </button>
    </form>
  );
};

export default Createpage;
