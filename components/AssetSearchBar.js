'use client';
import './AssetSearchBar.css';

export default function AssetSearchBar({ value, onChange }) {
  return (
    <div className="asset-search-row">
      <span className="asset-search-heading">Assets</span>
      <input
        className="asset-search-bar"
        type="text"
        placeholder="Search assets..."
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Search assets"
      />
    </div>
  );
}
