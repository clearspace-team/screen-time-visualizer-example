# Screen Time Visualizer Sample Project

This is a sample project demonstrating how to integrate with The Screen Time Network. It includes a basic Node.js server with TypeScript that handles webhook events.

## Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)
- A Screen Time Network account with API access

## Quickstart

1. Clone this repository:

   ```bash
   git clone https://github.com/clearspace-team/screen-time-visualizer-example
   cd screen-time-visualizer-example
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your API credentials:
   - Copy your API key and Webhook Secret from the [API docs](https://www.thescreentimenetwork.com/api)
   - Fill in the constants at the top of server.ts

   ```
   API_KEY=your_api_key_here
   YOUR_HANDLE=your_screentime_network_handle
   ```

4. Build and Run the server

   ```bash
   npm start
   ```

5. Visit http://localhost:8000 to see a breakdown of your historical screen time data as well as your screen time today.

### Development Mode

To run the server in development mode with hot reloading:

```bash
npm run dev
```