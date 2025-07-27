"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AssetCard from "@/components/AssetCard";
import Dashboard from "@/components/Dashboard";
import AssetSearchBar from "@/components/AssetSearchBar";
import "./assets.css";

function summarizeAssets(assets) {
  const total = assets.length;
  const active = assets.filter((a) => a.status === "active").length;
  const maintenance = assets.filter((a) => a.status === "maintenance").length;
  const value = assets.reduce((sum, a) => sum + (Number(a.value) || 0), 0);
  return { total, active, maintenance, value: value.toFixed(2) };
}

export default function AssetsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removeId, setRemoveId] = useState(null);
  const [search, setsearch] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(true);
      fetch("/api/assets")
        .then(async (res) => {
          if (!res.ok) throw new Error((await res.json()).error || "API error");
          return res.json();
        })
        .then((data) => {
          setAssets(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((err) => {
          setAssets([]);
          setLoading(false);
          alert("Error loading assets: " + err.message);
        });
    }
  }, [status]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this asset?")) return;
    setRemoveId(id);
    try {
      const res = await fetch(`/api/assets/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAssets((prev) => prev.filter((item) => item._id !== id));
      } else {
        let msg = "Delete failed";
        try {
          const err = await res.json();
          msg = err.error || err.message || msg;
        } catch {}
        alert(msg);
      }
    } finally {
      setRemoveId(null);
    }
  };

  const stats = summarizeAssets(assets);

  // --- SEARCH FILTERING ---
  const filteredAssets = assets.filter((asset) => {
    const query = search.toLowerCase();
    return (
      asset.name?.toLowerCase().includes(query) ||
      asset.type?.toLowerCase().includes(query) ||
      asset.status?.toLowerCase().includes(query) ||
      asset.serial?.toLowerCase().includes(query) ||
      asset.user?.toLowerCase().includes(query) ||
      asset.location?.toLowerCase().includes(query)
    );
  });

  if (!session || loading || status === "loading") {
    return (
      <>
        <Navbar />
        <div className="assets-center assets-muted assets-loading">
          Loading assets...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-layout">
        <div className="dashboard-header">
          <div>
            <h2 className="dashboard-title">Assets</h2>
            <p className="dashboard-caption">
              Track and manage all your office assets
            </p>
          </div>
          <button
            className="dashboard-add-btn"
            onClick={() => router.push("/assets/create")}
          >
            + Add Asset
          </button>
        </div>

        <Dashboard stats={stats} />

        <AssetSearchBar value={search} onChange={setsearch}></AssetSearchBar>

        <div className="dashboard-assets-list">
          {filteredAssets.map((asset) => (
            <AssetCard
              key={asset._id}
              asset={asset}
              onEdit={(id) => router.push(`/assets/edit/${id}`)}
              onDelete={handleDelete}
              removeId={removeId}
            />
          ))}
          {filteredAssets.length === 0 && (
            <div
              className="assets-center assets-muted assets-loading"
              style={{ width: "100%" }}
            >
              No assets found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
