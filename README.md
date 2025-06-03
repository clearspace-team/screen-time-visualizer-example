# STN API Sample Project

This is a sample project demonstrating how to integrate with the STN API. It includes a basic Node.js server with TypeScript that provides example API interactions and hosts a lightweight client.

## Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)
- A Screen Time Network account with API access

## Quickstart

1. Clone this repository:

   ```bash
   git clone https://github.com/clearspace-team/stn-sample-project
   cd stn-sample-project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your API credentials:

   - Sign in to [The Screen Time Network](https://www.thescreentimenetwork.com/) and create a handle
   - Copy your API key from [API docs](https://www.thescreentimenetwork.com/api)
   - Fill in the constants at the top of server.ts

   ```
   API_KEY=your_api_key_here
   YOUR_HANDLE=your_stn_handle
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

## Webhook Testing

To test webhooks locally, the project uses localtunnel to create a public URL. The server will automatically create a tunnel and log the URL when started.
