import mongoose, { Schema } from "mongoose";
import CryptoJS from "crypto-js";
import JWT from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import express from "express";
import schemaOptions from "./modelOption";

const memoSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    icon: {
      type: String,
      default: "📝",
    },
    title: {
      type: String,
      default: "無題",
    },
    description: {
      type: String,
      default: "ここに自由に記入してください",
    },
    position: {
      type: Number,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    favoritePosition: {
      type: Number,
      default: 0,
    },
  },
  schemaOptions
);

const Memo = mongoose.model("Memo", memoSchema);
export default Memo;
