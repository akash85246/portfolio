import React, { useEffect, useState, useRef } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Activity, CalendarDays, Flame, Clock } from "lucide-react";
import { useInView } from "framer-motion";

const token = import.meta.env.VITE_GITHUB_TOKEN;
const username = import.meta.env.VITE_GITHUB_USER;

function StatCard({ icon, title, value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className={`backdrop-blur-sm p-4 sm:p-3 px-3 sm:px-4 rounded-xl shadow-md border border-white/10 flex items-center gap-3 sm:gap-4 relative min-h-[80px] sm:min-h-[100px] w-full max-w-sm transition-all duration-700 ease-out
        ${isInView ? "opacity-100 scale-100" : "opacity-0 scale-75"}
      `}
    >
      <div className="w-full text-center">
        <h2 className="text-white font-semibold text-[0.6rem] sm:text-sm absolute top-2 left-2">
          {title}
        </h2>
        <p className="text-gray-300 text-xl sm:text-2xl font-semibold mt-4">
          {value}
        </p>
      </div>
      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white text-xl sm:text-2xl">
        {icon}
      </div>
    </div>
  );
}

function GithubActivity() {
  const [contributions, setContributions] = useState([]);
  const [weeks, setWeeks] = useState([]);

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

  useEffect(() => {
    const fetchContributions = async () => {
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            {
              user(login: "${username}") {
                contributionsCollection {
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        date
                        contributionCount
                      }
                    }
                  }
                }
              }
            }
          `,
        }),
      });

      const result = await response.json();
      const calendar =
        result.data.user.contributionsCollection.contributionCalendar;
      const weeksData = calendar.weeks;
      const allDays = weeksData.flatMap((week) => week.contributionDays);

      const thisYear = new Date().getFullYear();
      const filtered = allDays.filter(
        (day) => new Date(day.date) >= new Date(`${thisYear}-01-01`)
      );

      setWeeks(weeksData);
      setContributions(filtered);
    };

    fetchContributions();
  }, []);

  const getClassForValue = (value) => {
    if (!value) return "color-empty";
    const intensity = value.contributionCount;
    if (intensity === 0) return "color-empty";
    if (intensity > 20) return "color-scale-4";
    if (intensity > 10) return "color-scale-3";
    if (intensity > 0) return "color-scale-2";
    return "color-scale-1";
  };

  // Stats
  const maxCount = Math.max(
    ...contributions.map((d) => d.contributionCount),
    0
  );
  const activeDays = contributions.filter(
    (d) => d.contributionCount > 0
  ).length;
  const totalContributions = contributions.reduce(
    (acc, d) => acc + d.contributionCount,
    0
  );

  return (
    <div className="w-full overflow-x-auto">
      <div ref={heatmapRef}>
        <CalendarHeatmap
          startDate={new Date(new Date().getFullYear(), 0, 1)}
          endDate={new Date()}
          values={contributions}
          classForValue={getClassForValue}
          showWeekdayLabels={false}
          showMonthLabels={false}
          gutterSize={4}
          tooltipDataAttrs={(value) => {
            if (!value.date) return null;
            return {
              "data-tooltip-id": "github-heatmap",
              "data-tooltip-content": `${value.date}: ${value.contributionCount} contributions`,
            };
          }}
          horizontal
        />
        <ReactTooltip id="github-heatmap" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 my-2 sm:my-6">
        <StatCard
          icon={
            <Activity className="text-cyan-400 w-8 h-8 absolute bottom-2 right-2" />
          }
          title="Total Contributions"
          value={totalContributions.toLocaleString()}
        />
        <StatCard
          icon={
            <CalendarDays className="text-emerald-400 w-8 h-8 absolute bottom-2 right-2" />
          }
          title="Weeks Tracked"
          value={weeks.length}
        />
        <StatCard
          icon={
            <Flame className="text-orange-400 w-8 h-8 absolute bottom-2 right-2" />
          }
          title="Max Daily Contributions"
          value={maxCount.toLocaleString()}
        />
        <StatCard
          icon={
            <Clock className="text-purple-400 w-8 h-8 absolute bottom-2 right-2" />
          }
          title="Active Days"
          value={activeDays.toLocaleString()}
        />
      </div>
    </div>
  );
}

export default GithubActivity;
