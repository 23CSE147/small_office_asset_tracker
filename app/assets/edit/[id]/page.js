"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Editpage from "@/components/Editpage";

export default function EditAssetPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    status: "active",
    serial: "",
    user: "",
    location: "",
    purchased: "",
    value: "",
  });

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const res = await fetch(`/api/assets/${id}`);
        const data = await res.json();
        setFormData({
          name: data.name || "",
          type: data.type || "",
          status: data.status || "active",
          serial: data.serial || "",
          user: data.user || "",
          location: data.location || "",
          purchased: data.purchased
            ? new Date(data.purchased).toISOString().split("T")[0]
            : "",
          value: data.value || "",
        });
      } catch (error) {
        console.error("Error fetching asset:", error);
      }
    };
    if (id) fetchAsset();
  }, [id]);

  if (!session) {
    return (
      <p className="text-center text-red-500 mt-10">
        Access Denied. Please log in as admin.
      </p>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = { ...formData };
    if (submitData.purchased)
      submitData.purchased = new Date(submitData.purchased);

    try {
      const res = await fetch(`/api/assets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        router.push("/assets");
      } else {
        alert("Failed to update asset");
      }
    } catch (error) {
      console.error("Error updating asset:", error);
    }
  };

  return (
    <div className="edit-form-wrapper">
      <h2 className="edit-form-title">Edit Asset</h2>
      <Editpage
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      
      />
    </div>
  );
}
