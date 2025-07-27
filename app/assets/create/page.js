'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Createpage from '@/components/Createpage';

export default function CreateAssetPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    name:      '',
    type:      '',
    status:    'active',
    serial:    '',
    user:      '',
    location:  '',
    purchased: '',
    value:     '',
  });

  if (!session) {
    return <p className="text-center text-red-500 mt-10">Access Denied. Please log in as admin.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert purchased to a real date (if set)
    let submitData = { ...formData };
    if (submitData.purchased) submitData.purchased = new Date(submitData.purchased);

    try {
      const res = await fetch('/api/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        router.push('/assets');
      } else {
        alert('Failed to create asset');
      }
    } catch (error) {
      console.error(error);
      alert('Error occurred');
    }
  };

  return (
    <div className="asset-form-wrapper">
      <h2 className="asset-form-title">Create New Asset</h2>
      <Createpage
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
