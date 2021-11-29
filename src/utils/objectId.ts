import mongoose from "mongoose";
export function objectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}
