import mongoose from "mongoose";

const AssetSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  type:      { type: String, required: true },
  status:    { type: String, required: true },
  serial:    { type: String },
  user:      { type: String },
  location:  { type: String },
  purchased: { type: Date },
  value:     { type: Number, required: true },
}, { timestamps: true });


export default mongoose.models.Asset || mongoose.model("Asset", AssetSchema);
