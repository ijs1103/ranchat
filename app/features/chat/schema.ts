import {
  pgTable,
  bigint,
  timestamp,
  uuid,
  text,
  primaryKey,
} from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";

export const messageRooms = pgTable("message_rooms", {
  message_room_id: bigint("message_room_id", { mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const messageRoomMembers = pgTable(
  "message_room_members",
  {
    message_room_id: bigint("message_room_id", { mode: "number" })
      .notNull()
      .references(() => messageRooms.message_room_id, { onDelete: "cascade" }),
    profile_id: uuid("profile_id")
      .notNull()
      .references(() => profiles.profile_id, { onDelete: "cascade" }),
    created_at: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.message_room_id, table.profile_id] }),
  })
);

export const messages = pgTable("messages", {
  message_id: bigint("message_id", { mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  message_room_id: bigint("message_room_id", { mode: "number" })
    .notNull()
    .references(() => messageRooms.message_room_id, { onDelete: "cascade" }),
  sender_id: uuid("sender_id")
    .notNull()
    .references(() => profiles.profile_id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const waitingPool = pgTable("waiting_pool", {
  profile_id: uuid("profile_id")
    .primaryKey()
    .references(() => profiles.profile_id, { onDelete: "cascade" }),
  entered_at: timestamp("entered_at").notNull().defaultNow(),
});
