'use client';

export default function Dashboard({ stats }) {
  return (
    <div className="dashboard-stats">
      <div>
        <div className="dashboard-stat-label">Total Assets</div>
        <div className="dashboard-stat-value">{stats.total}</div>
      </div>
      <div>
        <div className="dashboard-stat-label">Active Assets</div>
        <div className="dashboard-stat-value dashboard-green">{stats.active}</div>
      </div>
      <div>
        <div className="dashboard-stat-label">Under Maintenance</div>
        <div className="dashboard-stat-value dashboard-orange">{stats.maintenance}</div>
      </div>
      <div>
        <div className="dashboard-stat-label">Total Value</div>
        <div className="dashboard-stat-value dashboard-currency">₹{stats.value}</div>
      </div>
    </div>
  );
}
