import React, { useEffect, useState, useRef } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Activity, CalendarDays, Flame, Clock } from "lucide-react";
import { useInView } from "framer-motion";
import axios from "axios";

const token = import.meta.env.VITE_GITHUB_TOKEN;
const username = import.meta.env.VITE_GITHUB_USER;

import StatCard from "./StatCard";

function GithubActivity() {
  const [contributions, setContributions] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [stats, setStats] = useState(null);

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
      try {
        const response = await axios.post(
          "https://api.github.com/graphql",
          {
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
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const calendar =
          response.data.data.user.contributionsCollection.contributionCalendar;

        const weeksData = calendar.weeks;
        const allDays = weeksData.flatMap((week) => week.contributionDays);

        const TOTAL_DAYS = 7 * 27;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let startDate = new Date(today);
        startDate.setDate(startDate.getDate() - (TOTAL_DAYS - 1));

        const dayOfWeek = startDate.getDay();
        startDate.setDate(startDate.getDate() - dayOfWeek);

        const filtered = allDays.filter((day) => {
          const d = new Date(day.date);
          return d >= startDate && d <= today;
        });

        setWeeks(weeksData);
        setContributions(filtered);

        const maxCount = Math.max(
          ...filtered.map((d) => d.contributionCount),
          0
        );

        const activeDays = filtered.filter(
          (d) => d.contributionCount > 0
        ).length;

        const totalContributions = filtered.reduce(
          (acc, d) => acc + d.contributionCount,
          0
        );

        setStats([
          {
            stat: "total",
            title: "Total Contributions",
            value: totalContributions,
          },
          {
            stat: "weeks",
            title: "Weeks Tracked",
            value: weeksData.length,
          },
          {
            stat: "max",
            title: "Max Daily Contributions",
            value: maxCount,
          },
          {
            stat: "active",
            title: "Active Days",
            value: activeDays,
          },
        ]);
      } catch (err) {
        console.error(err);
      }
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

  const TOTAL_DAYS = 7 * 27;
  const endDate = new Date();
  endDate.setHours(0, 0, 0, 0);

  let startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - (TOTAL_DAYS - 1));

  const day = startDate.getDay();
  startDate.setDate(startDate.getDate() - day);

  const getIcon = (stat) => {
    switch (stat) {
      case "total":
        return <Activity className="text-cyan-400 w-6 h-6" />;
      case "weeks":
        return <CalendarDays className="text-emerald-400 w-6 h-6" />;
      case "max":
        return <Flame className="text-orange-400 w-6 h-6" />;
      case "active":
        return <Clock className="text-purple-400 w-6 h-6" />;
      default:
        return <Activity className="text-cyan-400 w-6 h-6" />;
    }
  };

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
              ).toDateString()}: ${value.contributionCount} contributions`,
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
              key={d.stat}
              icon={getIcon(d.stat)}
              title={d.title}
              value={d.value.toLocaleString()}
            />
          ))}
      </div>
    </div>
  );
}

export default GithubActivity;
