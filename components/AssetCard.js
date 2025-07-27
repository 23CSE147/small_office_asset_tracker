'use client';

export default function AssetCard({ asset, onEdit, onDelete, removeId }) {
  return (
    <div className="asset-card-ui">
      <div className="asset-card-title-row">
        <span className="asset-card-title">{asset.name}</span>
        <span
          className={`asset-card-status ${asset.status === "active" ? "dashboard-green" : "dashboard-orange"}`}
        >
          {asset.status === "active" ? "Active" : "Maintenance"}
        </span>
      </div>
      <div className="asset-card-details"><b>Type:</b> {asset.type || "-"}</div>
      <div className="asset-card-details"><b>Serial:</b> {asset.serial || "-"}</div>
      <div className="asset-card-details"><b>User:</b> {asset.user || <i>No user</i>}</div>
      <div className="asset-card-details"><b>Location:</b> {asset.location || "-"}</div>
      <div className="asset-card-details">
        <b>Purchase date:</b> {asset.purchased ? new Date(asset.purchased).toLocaleDateString("en-GB") : "-"}
      </div>
      <div className="asset-card-details"><b>Value:</b> ₹{Number(asset.value).toLocaleString()}</div>
      <div className="asset-card-actions">
        <button
          className="asset-action-btn asset-edit"
          onClick={() => onEdit(asset._id)}
        >
          Edit
        </button>
        <button
          className="asset-action-btn asset-del"
          onClick={() => onDelete(asset._id)}
          disabled={removeId === asset._id}
        >
          {removeId === asset._id ? "Removing..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
