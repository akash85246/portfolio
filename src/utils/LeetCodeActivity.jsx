import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import axios from "axios";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";
import "react-calendar-heatmap/dist/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import { Sparkles, Zap, Flame, Circle } from "lucide-react";

function StatCard({ icon, title, value }) {
  const ref = useRef(null);
  const isInViewLeet = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className={`backdrop-blur-sm p-2 md:p-5 lg:p-6 rounded-xl shadow-md border border-white/10 flex items-center justify-center gap-1 sm:gap-3 md:gap-4 relative min-h-[80px] md:min-h-[100px] w-full max-w-sm transition-all duration-700 ease-out
        ${
          isInViewLeet
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-90"
        }
      `}
    >
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

  const heatmapLeetRef = useRef(null);
  const isInViewLeet = useInView(heatmapLeetRef, { once: true });

  useEffect(() => {
    if (isInViewLeet) {
      const cells = heatmapLeetRef.current?.querySelectorAll("rect");
      if (cells) {
        cells.forEach((cell) => {
          const delay = Math.random() * 700;
          cell.classList.add("random-heatmap-leet-appear");
          cell.style.animationDelay = `${delay}s`;
        });
      }
    }
  }, [isInViewLeet]);

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

  const getClassForValue = (value) => {
    if (!value) return "color-empty";
    const intensity = value.contributionCount;
    if (intensity === 0) return "color-empty";
    if (intensity > 20) return "color-scale-4";
    if (intensity > 10) return "color-scale-3";
    if (intensity > 0) return "color-scale-2";
    return "color-scale-1";
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="mt-0">
        <div className="relative">
          <div ref={heatmapLeetRef}>
            <CalendarHeatmap
              startDate={new Date(new Date().getFullYear(), 0, 1)}
              endDate={new Date()}
              gutterSize={3}
              values={calendar}
              classForValue={getClassForValue}
              tooltipDataAttrs={(value) => ({
                "data-tooltip-id": "leetcode-tooltip",
                "data-tooltip-content": `${
                  value?.date?.toDateString() || ""
                }: ${value?.count || 0} submissions`,
              })}
              showWeekdayLabels={false}
              showMonthLabels={false}
              horizontal
            />
            <Tooltip id="leetcode-tooltip" />
          </div>
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
