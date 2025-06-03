import express, { Request, Response } from "express";
import path from "path";

// --- Constants --- //
// TODO: Insert your API key and webhook secret here
const API_URL = "https://api.thescreentimenetwork.com/v1"; // The Screen Time Network API URL
const API_KEY = "your_api_key";
const YOUR_HANDLE: string = "your_stn_handle"; // Your Screen Time Network handle

// ---- Utils ---- //
const makeAPIRequest = async (
  path: string,
  method: "GET" | "POST",
  body?: string
) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
    body,
    method,
  });

  return response.json();
};

// ---- Express server ---- //
const app = express();
const port: number = 8000;

app.use(express.static("public"));

app.use(express.json());

app.get("/api/getScreenTimeToday", async (_req: Request, res: Response) => {
  const screenTimeTodayData = await makeAPIRequest(
    `/getScreenTimeToday?handle=${YOUR_HANDLE}`,
    "GET"
  );
  if (!screenTimeTodayData.success) {
    return res.status(400).send(screenTimeTodayData.error);
  } else {
    return res.json(screenTimeTodayData.data);
  }
});

app.get(
  "/api/getScreenTimeHistorical",
  async (_req: Request, res: Response) => {
    const screenTimeHistoricData = await makeAPIRequest(
      `/getScreenTimeHistorical?handle=${YOUR_HANDLE}`,
      "GET"
    );
    if (!screenTimeHistoricData.success) {
      return res.status(400).send(screenTimeHistoricData.error);
    } else {
      return res.json(screenTimeHistoricData.data);
    }
  }
);

// Serve the main HTML file for all other routes
app.get("*", (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
