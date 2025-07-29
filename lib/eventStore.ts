import type { PickEvent } from "../types/PickEvent";

class EventStore {
  private events: PickEvent[] = [];
  private readonly MAX_EVENTS = 10;

  addEvent(robot_id: string, item_id: string): PickEvent {
    const event: PickEvent = {
      robot_id,
      item_id,
      timestamp: new Date().toISOString(),
    };

    this.events.push(event);

    // Keep only the last 10 events
    if (this.events.length > this.MAX_EVENTS) {
      this.events = this.events.slice(-this.MAX_EVENTS);
    }

    return event;
  }

  getEvents(): PickEvent[] {
    return [...this.events]; // Return a copy to prevent external modification
  }
}

// Create a singleton instance
export const eventStore = new EventStore();
