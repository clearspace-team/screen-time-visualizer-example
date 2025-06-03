function App() {
  const [today, setToday] = React.useState(null);
  const [historical, setHistorical] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  console.log({ today, historical });

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [todayRes, histRes] = await Promise.all([
          fetch("/api/getScreenTimeToday"),
          fetch("/api/getScreenTimeHistorical"),
        ]);
        const todayData = await todayRes.json();
        const histData = await histRes.json();
        setToday(todayData);
        setHistorical(histData);
      } catch (err) {
        setError("Failed to fetch screen time data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 font-mono text-lg">
        Error: {error}
      </div>
    );
  if (loading || !today || !historical)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 font-mono text-lg">
        Loading...
      </div>
    );

  // Calculate hours and minutes for today
  const totalMinutes = today.totalScreenTime || 0;
  const todayHours = Math.floor(totalMinutes / 60).toString();
  const todayMinutes = (totalMinutes % 60).toString().padStart(2, "0");

  // Historical grid data
  const days = historical.days || [];
  // Build grid: columns = weeks, each column is 7 days (Mon-Sun)
  const weeks = Math.ceil(days.length / 7);
  const grid = Array.from({ length: weeks }, (_, col) =>
    Array.from({ length: 7 }, (_, row) => {
      const idx = col * 7 + row;
      return days[idx] || null;
    })
  );

  // Helper to get Tailwind bg color based on hours
  function getColor(screenTimeMinutes) {
    if (screenTimeMinutes >= 360) return "bg-green-700";
    if (screenTimeMinutes >= 300) return "bg-green-600";
    if (screenTimeMinutes >= 240) return "bg-green-400";
    if (screenTimeMinutes >= 180) return "bg-green-300";
    if (screenTimeMinutes >= 120) return "bg-green-200";
    if (screenTimeMinutes >= 60) return "bg-green-100";

    return "bg-gray-200";
  }

  const hoursInTheLastYear = Math.floor(
    historical.days
      .slice(Math.max(0, historical.days.length - 365))
      .reduce((acc, day) => acc + day.screenTime, 0) / 60
  );
  const hoursInTheLastMonth = Math.floor(
    historical.days
      .slice(Math.max(0, historical.days.length - 30))
      .reduce((acc, day) => acc + day.screenTime, 0) / 60
  );
  const hoursInTheLastWeek = Math.floor(
    historical.days
      .slice(Math.max(0, historical.days.length - 7))
      .reduce((acc, day) => acc + day.screenTime, 0) / 60
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center font-mono">
      {/* Today Section */}
      <div className="flex flex-col items-center mb-8 mt-16">
        <div className="uppercase text-gray-500 text-sm tracking-widest mb-2">
          Screen Time
        </div>
        <div className="relative flex items-baseline justify-center">
          <span className="text-[8rem] leading-none font-extrabold tracking-tight text-black select-none">
            {`${todayHours}h`}
          </span>
          <span className="absolute right-[-3.5rem] top-3 text-gray-400 text-lg font-bold select-none">
            {`${todayMinutes}m`}
          </span>
        </div>
        <div className="flex items-center w-full max-w-xs my-2">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="mx-4 text-gray-500 tracking-widest text-xs font-semibold">
            TODAY
          </span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
      </div>
      {/* Activity Section */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow p-6 mb-2">
        <div className="text-gray-700 font-semibold text-lg mb-4 ">
          Screen Time Activity
        </div>
        <div className="overflow-x-auto">
          <div className="flex flex-row gap-1">
            {/* Days of week labels (optional) */}
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400 h-4 opacity-0">Sun</span>
              <span className="text-xs text-gray-400 h-4">Mon</span>
              <span className="text-xs text-gray-400 h-4 opacity-0">Tue</span>
              <span className="text-xs text-gray-400 h-4">Wed</span>
              <span className="text-xs text-gray-400 h-4 opacity-0">Thu</span>
              <span className="text-xs text-gray-400 h-4">Fri</span>
              <span className="text-xs text-gray-400 h-4 opacity-0">Sat</span>
            </div>
            <div className="flex flex-row gap-1">
              {grid.map((week, weekIdx) => (
                <div className="flex flex-col gap-1" key={weekIdx}>
                  {week.map((cell, dayIdx) => (
                    <div
                      key={dayIdx}
                      className={`w-4 h-4 rounded ${getColor(
                        cell ? cell.screenTime : 0
                      )} border border-white`}
                      title={cell ? `${cell.date}: ${cell.screenTime}mins` : ""}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Meta info */}
        <div className="text-xs text-gray-500 mt-2">
          {hoursInTheLastYear} hours in the last year
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col items-center p-2 mb-8">
        <div className="flex items-center gap-1 mt-4 text-xs text-gray-400 mb-1">
          <span>Less</span>
          <span className="w-4 h-4 rounded bg-gray-200 border border-white"></span>
          <span className="w-4 h-4 rounded bg-green-100 border border-white"></span>
          <span className="w-4 h-4 rounded bg-green-200 border border-white"></span>
          <span className="w-4 h-4 rounded bg-green-400 border border-white"></span>
          <span className="w-4 h-4 rounded bg-green-600 border border-white"></span>
          <span className="w-4 h-4 rounded bg-green-700 border border-white"></span>
          <span>More</span>
        </div>
        <div className="flex items-center justify-between px-4 text-xs text-gray-400 w-full">
          <span className="w-4 h-4">0h</span>
          <span className="w-4 h-4">3h</span>
          <span className="w-4 h-4">7h+</span>
        </div>
      </div>

      {/* Summary Section */}
      <div className="flex flex-row gap-8 mb-8">
        <div className="flex flex-col items-center bg-white rounded-lg shadow px-8 py-4">
          <div className="text-2xl font-bold text-black">
            {hoursInTheLastWeek}h
          </div>
          <div className="text-xs text-gray-500 mt-1">This Week</div>
        </div>
        <div className="flex flex-col items-center bg-white rounded-lg shadow px-8 py-4">
          <div className="text-2xl font-bold text-black">
            {hoursInTheLastMonth}h
          </div>
          <div className="text-xs text-gray-500 mt-1">This Month</div>
        </div>
        <div className="flex flex-col items-center bg-white rounded-lg shadow px-8 py-4">
          <div className="text-2xl font-bold text-black">
            {hoursInTheLastYear}h
          </div>
          <div className="text-xs text-gray-500 mt-1">This Year</div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
