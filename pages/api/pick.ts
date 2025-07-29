import type { NextApiRequest, NextApiResponse } from "next";
import { eventStore } from "../../lib/eventStore";
import type { CreatePickEventRequest } from "../../types/PickEvent";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { robot_id, item_id }: CreatePickEventRequest = req.body;

    if (!robot_id || !item_id) {
      return res.status(400).json({
        message: "Both robot_id and item_id are required",
      });
    }

    const event = eventStore.addEvent(robot_id, item_id);

    res.status(201).json({
      message: "Pick event logged successfully",
      event,
    });
  } catch (error) {
    console.error("Error logging pick event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
