export interface PickEvent {
  robot_id: string;
  item_id: string;
  timestamp: string;
}

export interface CreatePickEventRequest {
  robot_id: string;
  item_id: string;
}
