import React, { useEffect, useState } from "react";
import axios from "axios";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import { Sparkles, Zap, Flame, Circle } from "lucide-react";

function StatCard({ icon, title, value }) {
  return (
    <div className="backdrop-blur-sm p-2 md:p-5 lg:p-6 rounded-xl shadow-md border border-white/10 flex items-center justify-center gap-1 sm:gap-3 md:gap-4 relative min-h-[80px] md:min-h-[100px] w-full max-w-sm ">
      <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mt-5 text-white text-xl md:text-2xl">
        {icon}
      </div>
      <div className="w-full text-center">
        <h3 className="text-white font-semibold text-[0.6rem] md:text-sm absolute top-2 left-2">
          {title}
        </h3>
        <p className="text-gray-300 text-xs sm:text-lg md:text-xl font-semibold mt-4">
          {value}
        </p>
      </div>
    </div>
  );
}

function LeetCodeActivity() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/leetcode/get-stats`
        );
        if (response.status !== 200) throw new Error("Failed to fetch data");
        setData(response.data);
      } catch (err) {
        console.error("LeetCode Fetch Error:", err);
        setError("Failed to load LeetCode stats.");
      }
    };
    fetchLeetCodeData();
  }, [backendUrl]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p className="text-white">Loading...</p>;

  const stats = data.matchedUser.submitStatsGlobal.acSubmissionNum;
  const calendarRaw = data.matchedUser.userCalendar?.submissionCalendar || "{}";

  const calendar = Object.entries(JSON.parse(calendarRaw)).map(
    ([timestamp, count]) => ({
      date: new Date(Number(timestamp) * 1000),
      count: count,
    })
  );

  const getIcon = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return <Sparkles className="text-green-400 w-6 h-6" />;
      case "Medium":
        return <Zap className="text-yellow-400 w-6 h-6" />;
      case "Hard":
        return <Flame className="text-red-400 w-6 h-6" />;
      default:
        return <Circle className="text-green-400 w-6 h-6" />;
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="mt-0">
        <div className="relative">
          <CalendarHeatmap
            startDate={new Date(new Date().getFullYear(), 0, 1)}
            endDate={new Date()}
            gutterSize={3}
            values={calendar}
            classForValue={(value) => {
              if (!value || value.count === 0) return "color-empty";
              if (value.count > 10) return "color-scale-4";
              if (value.count > 5) return "color-scale-3";
              if (value.count > 2) return "color-scale-2";
              return "color-scale-1";
            }}
            tooltipDataAttrs={(value) => ({
              "data-tooltip-id": "leetcode-tooltip",
              "data-tooltip-content": `${value?.date?.toDateString() || ""}: ${
                value?.count || 0
              } submissions`,
            })}
            showWeekdayLabels={false} // Hide Mon–Sun
            showMonthLabels={false} // Hide Jan–Dec
          />
          <Tooltip id="leetcode-tooltip" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 my-2 md:my-6">
        {stats.map((d) => (
          <StatCard
            key={d.difficulty}
            icon={getIcon(d.difficulty)}
            title={`${d.difficulty} Problems`}
            value={`${d.count} solved / ${d.submissions} submissions`}
          />
        ))}
      </div>
    </div>
  );
}

export default LeetCodeActivity;
