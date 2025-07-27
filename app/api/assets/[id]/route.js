// app/api/assets/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Asset from "@/models/Asset";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// GET asset by ID
export async function GET(_, { params }) {
  const { id } = await params;           
  await connectDB();
  const asset = await Asset.findById(id); 
  if (!asset) return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  return NextResponse.json(asset);
}

export async function PUT(req, { params }) {
  const { id } = await params;  
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, type, status, serial, user, location, purchased, value } = await req.json();
  const updated = await Asset.findByIdAndUpdate(
    id,
    { name, type, status, serial, user, location, purchased, value },
    { new: true }
  );
  if (!updated) return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  return NextResponse.json(updated);
}


// DELETE asset by ID
export async function DELETE(_, { params }) {
  const { id } = await params;
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const deleted = await Asset.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  return NextResponse.json({ message: "Asset deleted successfully" });
}

