import { Schema, model } from "mongoose";
import { Guild } from "../interfaces/Database";

export default model<Guild>(
  "Guild",
  new Schema<Guild>({
    guildId: {
      type: String,
      required: true,
      unique: true,
    },
    prefix: {
      type: String,
      default: "!",
    },
  })
);
