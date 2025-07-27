// components/Editpage.js
"use client";
import "./Editpage.css";
const Editpage = ({ formData, onChange, onSubmit, isEdit = false }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="edit-form-field">
        <label className="edit-form-label">Asset Name</label>
        <input
          className="edit-form-input"
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={onChange}
        />
      </div>
      <div className="edit-form-field">
        <label className="edit-form-label">Type</label>
        <input
          className="edit-form-input"
          type="text"
          name="type"
          required
          value={formData.type}
          onChange={onChange}
        />
      </div>
      <div className="edit-form-field">
        <label className="edit-form-label">Status</label>
        <select
          className="edit-form-select"
          name="status"
          value={formData.status}
          onChange={onChange}
        >
          <option value="active">Active</option>
          <option value="maintenance">Under Maintenance</option>
        </select>
      </div>
      <div className="edit-form-field">
        <label className="edit-form-label">Serial</label>
        <input
          className="edit-form-input"
          type="text"
          name="serial"
          value={formData.serial}
          onChange={onChange}
        />
      </div>
      <div className="edit-form-field">
        <label className="edit-form-label">User/Assigned To</label>
        <input
          className="edit-form-input"
          type="text"
          name="user"
          value={formData.user}
          onChange={onChange}
        />
      </div>
      <div className="edit-form-field">
        <label className="edit-form-label">Location</label>
        <input
          className="edit-form-input"
          type="text"
          name="location"
          value={formData.location}
          onChange={onChange}
        />
      </div>
      <div className="edit-form-field">
        <label className="edit-form-label">Purchase Date</label>
        <input
          className="edit-form-input"
          type="date"
          name="purchased"
          value={formData.purchased}
          onChange={onChange}
        />
      </div>
      <div className="edit-form-field">
        <label className="edit-form-label">Value (₹)</label>
        <input
          className="edit-form-input"
          type="number"
          name="value"
          required
          min="0"
          step="0.01"
          value={formData.value}
          onChange={onChange}
        />
      </div>
      <button type="submit" className="edit-form-btn">
        {isEdit ? "Update Asset" : "Create Asset"}
      </button>
    </form>
  );
};

export default Editpage;
