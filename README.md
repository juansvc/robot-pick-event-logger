# Robot Pick Event Logger

A full-stack Next.js application for logging and viewing robot pick events. Built with TypeScript, React, and Next.js API routes.

## Features

- **Backend API**: RESTful endpoints for logging and retrieving pick events
- **In-Memory Storage**: Maintains the last 10 pick events only
- **Real-time Filtering**: Client-side filtering by Robot ID
- **Event Simulation**: Simple form to create test pick events
- **Responsive UI**: Clean table display with timestamps

## Project Structure

```
robot-pick-logger/
├── pages/
│   ├── api/
│   │   ├── pick.ts          # POST /api/pick endpoint
│   │   └── events.ts        # GET /api/events endpoint
│   └── index.tsx            # Main frontend page
├── types/
│   └── PickEvent.ts         # TypeScript interfaces
├── lib/
│   └── eventStore.ts        # In-memory event storage
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation & Setup

1. **Extract the project files** to a new directory called `robot-pick-logger`

2. **Install dependencies**:
   ```bash
   cd robot-pick-logger
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   - Open your browser and navigate to `http://localhost:3000`
   - The application will show both the frontend interface and serve the API endpoints

## API Endpoints

### POST /api/pick
Logs a new pick event.

**Request Body:**
```json
{
  "robot_id": "Robot-A",
  "item_id": "Item-123"
}
```

**Response:**
```json
{
  "message": "Pick event logged successfully",
  "event": {
    "robot_id": "Robot-A",
    "item_id": "Item-123",
    "timestamp": "2025-01-20T10:30:45.123Z"
  }
}
```

### GET /api/events
Retrieves all stored pick events (maximum 10).

**Response:**
```json
[
  {
    "robot_id": "Robot-A",
    "item_id": "Item-123",
    "timestamp": "2025-01-20T10:30:45.123Z"
  }
]
```

## Using the Application

### Frontend Features

1. **Simulate Pick Events**: Use the form at the top to create new pick events
   - Enter a Robot ID (e.g., "Robot-A", "R1")
   - Enter an Item ID (e.g., "Item-123", "A")
   - Click "Log Pick Event"

2. **View Events**: All logged events appear in a table showing:
   - Robot ID
   - Item ID
   - Timestamp (formatted for readability)

3. **Filter Events**: Use the "Filter by Robot ID" input to dynamically filter the displayed events
   - Filtering happens client-side (no additional API calls)
   - Clear the filter to show all events again

### Testing the API Directly

You can also test the API endpoints directly using curl or a tool like Postman:

```bash
# Log a new pick event
curl -X POST http://localhost:3000/api/pick \
  -H "Content-Type: application/json" \
  -d '{"robot_id": "Robot-B", "item_id": "Item-456"}'

# Get all events
curl http://localhost:3000/api/events
```

## Production Build

To create a production build:

```bash
npm run build
npm start
```

The application will be available at `http://localhost:3000`.

## Key Implementation Details

- **In-Memory Storage**: Uses a singleton EventStore class to maintain events in memory
- **Event Limit**: Automatically discards oldest events when more than 10 are stored
- **TypeScript**: Full type safety throughout the application
- **Error Handling**: Proper error responses and user feedback
- **Client-Side Filtering**: Real-time filtering without additional server requests
- **Timestamps**: Server-generated timestamps ensure consistency

## Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Frontend**: React with hooks
- **Backend**: Next.js API routes
- **Storage**: In-memory (no database required)
- **Styling**: Inline styles (for simplicity)

## Notes

- Events are stored in memory only and will be lost when the server restarts
- The application maintains exactly the last 10 events as specified
- All timestamps are generated server-side when events are received
- The frontend automatically refreshes the event list after logging new events
