"use server";

import { refresh } from "next/cache";
import {
  recordFrontDeskAction,
  type FrontDeskActionType,
} from "@/lib/shelter-repository";

// Anyone can call these until sign in (ticket 11) limits each shelter's login
// to its own beds. The database rejects unknown or closed shelters.
export async function checkIn(shelterId: string) {
  await record(shelterId, "check_in");
}

export async function checkOut(shelterId: string) {
  await record(shelterId, "check_out");
}

async function record(shelterId: unknown, type: FrontDeskActionType) {
  if (typeof shelterId !== "string") throw new Error("Invalid shelter");
  await recordFrontDeskAction(shelterId, type);
  refresh();
}
