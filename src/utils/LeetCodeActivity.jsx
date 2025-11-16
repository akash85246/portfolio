import React, { useEffect, useState, useRef } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Sparkles, Zap, Flame, Circle } from "lucide-react";
import { useInView } from "framer-motion";
import axios from "axios";

import StatCard from "./StatCard";

function GithubActivity() {
  const [contributions, setContributions] = useState([]);
  const [stats, setStats] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const heatmapRef = useRef(null);
  const isInView = useInView(heatmapRef, { once: true });

  useEffect(() => {
    if (isInView) {
      const cells = heatmapRef.current?.querySelectorAll("rect");
      if (cells) {
        cells.forEach((cell) => {
          const delay = Math.random() * 1.5;
          cell.classList.add("random-heatmap-appear");
          cell.style.animationDelay = `${delay}s`;
        });
      }
    }
  }, [isInView]);

  const parseCalendar = (calendarString) => {
    if (!calendarString) return [];
    let obj;
    try {
      obj = JSON.parse(calendarString);
    } catch (e) {
      console.error("Failed to parse calendar string", e);
      return [];
    }
    const arr = [];
    for (const ts in obj) {
      arr.push({
        date: new Date(Number(ts) * 1000),
        count: obj[ts],
      });
    }
    return arr;
  };
  const generateFullCalendar = (start, end, apiData) => {
    const map = new Map();
    apiData.forEach((d) => {
      const key = new Date(d.date).toDateString();
      map.set(key, d.count);
    });

    const result = [];
    let curr = new Date(start);
    curr.setHours(0, 0, 0, 0);

    while (curr <= end) {
      const key = curr.toDateString();
      result.push({
        date: new Date(curr),
        count: map.get(key) || 0,
      });
      curr.setDate(curr.getDate() + 1);
    }

    return result;
  };

  useEffect(() => {
    const fetchLeetCodeData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/leetcode/get-stats`
        );
        if (response.status !== 200) throw new Error("Failed to fetch data");

        const result = response.data;

        const submissionCalendarString =
          result?.matchedUser?.userCalendar?.submissionCalendar || "{}";

        const parsedDays = parseCalendar(submissionCalendarString);

        const fullCalendar = generateFullCalendar(
          startDate,
          endDate,
          parsedDays
        );
        setContributions(fullCalendar);

        setStats(result?.matchedUser?.submitStatsGlobal?.acSubmissionNum || []);
      } catch (err) {
        console.error("LeetCode Fetch Error:", err);
      }
    };

    fetchLeetCodeData();
  }, [backendUrl]);

  const getClassForValue = (value) => {
    if (!value) return "color-empty";
    const intensity = value.count;
    if (intensity === 0) return "color-empty";
    if (intensity > 20) return "color-scale-4";
    if (intensity > 10) return "color-scale-3";
    if (intensity > 0) return "color-scale-2";
    return "color-scale-1";
  };

  // Stats
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

  const TOTAL_DAYS = 7 * 27;
  const endDate = new Date();
  endDate.setHours(0, 0, 0, 0);

  let startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - (TOTAL_DAYS - 1));

  const day = startDate.getDay();
  startDate.setDate(startDate.getDate() - day);

  return (
    <div className="w-full overflow-x-auto">
      <div ref={heatmapRef}>
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={contributions}
          classForValue={getClassForValue}
          showWeekdayLabels={false}
          showMonthLabels={false}
          gutterSize={2}
          tooltipDataAttrs={(value) => {
            if (!value.date) return null;
            return {
              "data-tooltip-id": "github-heatmap",
              "data-tooltip-content": `${new Date(
                value.date
              ).toDateString()}: ${value.count} problems solved`,
            };
          }}
          horizontal
        />
        <ReactTooltip id="github-heatmap" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 my-2 sm:my-6">
        {stats &&
          stats.map((d) => (
            <StatCard
              key={d.difficulty}
              icon={getIcon(d.difficulty)}
              title={`${d.difficulty} Problems`}
              value={`${d.count} / ${d.submissions}`}
            />
          ))}
      </div>
    </div>
  );
}

export default GithubActivity;
