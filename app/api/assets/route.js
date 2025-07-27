// app/api/assets/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Asset from "@/models/Asset";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// GET all assets
export async function GET() {
  await connectDB();
  const assets = await Asset.find().sort({ createdAt: -1 });
  return NextResponse.json(assets);
}

// CREATE new asset
export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, type, status, serial, user, location, purchased, value } = await req.json();
  const asset = await Asset.create({ name, type, status, serial, user, location, purchased, value });
  return NextResponse.json(asset, { status: 201 });
}

