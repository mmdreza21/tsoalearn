import { Request, NextFunction, Response } from "express";

const mongoose = require("mongoose");

export function validation(id: string) {
  return function (_: any, __: string, ___: PropertyDescriptor) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return "invalid ID";
    }
  };
}
