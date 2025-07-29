import { useEffect, useState } from "react";
import type { PickEvent } from "../types/PickEvent";

export default function Home() {
  const [events, setEvents] = useState<PickEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<PickEvent[]>([]);
  const [filterText, setFilterText] = useState("");
  const [robotId, setRobotId] = useState("");
  const [itemId, setItemId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Load events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter events based on robot ID
  useEffect(() => {
    if (filterText.trim() === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        event.robot_id.toLowerCase().includes(filterText.toLowerCase()),
      );
      setFilteredEvents(filtered);
    }
  }, [events, filterText]);

  // Handle form submission to create a new pick event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!robotId.trim() || !itemId.trim()) {
      setMessage("Please enter both Robot ID and Item ID");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/pick", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          robot_id: robotId.trim(),
          item_id: itemId.trim(),
        }),
      });

      if (response.ok) {
        setMessage("Pick event logged successfully!");
        setRobotId("");
        setItemId("");
        // Refresh the events list
        await fetchEvents();
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting pick event:", error);
      setMessage("Error submitting pick event");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Robot Pick Event Logger</h1>

      {/* Simulate Pick Event Form */}
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "30px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Simulate Pick Event</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="robotId"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Robot ID:
            </label>
            <input
              type="text"
              id="robotId"
              value={robotId}
              onChange={(e) => setRobotId(e.target.value)}
              placeholder="e.g., Robot-A, R1"
              style={{
                width: "200px",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              htmlFor="itemId"
              style={{ display: "block", marginBottom: "5px" }}
            >
              Item ID:
            </label>
            <input
              type="text"
              id="itemId"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              placeholder="e.g., Item-123, A"
              style={{
                width: "200px",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            {isLoading ? "Logging..." : "Log Pick Event"}
          </button>
        </form>

        {message && (
          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              borderRadius: "4px",
              backgroundColor: message.includes("Error")
                ? "#f8d7da"
                : "#d4edda",
              color: message.includes("Error") ? "#721c24" : "#155724",
              border: `1px solid ${message.includes("Error") ? "#f5c6cb" : "#c3e6cb"}`,
            }}
          >
            {message}
          </div>
        )}
      </div>

      {/* Filter Section */}
      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="filter"
          style={{ display: "block", marginBottom: "5px" }}
        >
          Filter by Robot ID:
        </label>
        <input
          type="text"
          id="filter"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Enter robot ID to filter..."
          style={{
            width: "300px",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>

      {/* Events Display */}
      <div>
        <h2>
          Recent Pick Events
          {filterText && (
            <span
              style={{ fontSize: "14px", color: "#666", fontWeight: "normal" }}
            >
              (filtered by "{filterText}")
            </span>
          )}
        </h2>

        {filteredEvents.length === 0 ? (
          <p style={{ color: "#666", fontStyle: "italic" }}>
            {events.length === 0
              ? "No pick events logged yet."
              : "No events match the current filter."}
          </p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ddd",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Robot ID
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Item ID
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #eee",
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                  }}
                >
                  <td style={{ padding: "12px" }}>{event.robot_id}</td>
                  <td style={{ padding: "12px" }}>{event.item_id}</td>
                  <td style={{ padding: "12px" }}>
                    {formatTimestamp(event.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {events.length > 0 && (
          <p
            style={{
              marginTop: "15px",
              fontSize: "14px",
              color: "#666",
            }}
          >
            Showing {filteredEvents.length} of {events.length} total events
            (maximum 10 events stored)
          </p>
        )}
      </div>
    </div>
  );
}
