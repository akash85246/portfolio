import RobotModel from "./RobotModel";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setIpAddress } from "../redux/slices/IpAddressSlice";
import AnimatedTextLine from "../utils/AnimatedText";
import { motion, AnimatePresence } from "framer-motion";

import { useEffect, useState } from "react";

function Home() {
  const [viewCount, setViewCount] = useState("");
  const [totalCommits, setTotalCommits] = useState("");
  const ipAddress = useSelector((state) => state.ipAddress.ipAddress);
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);

  function formatNumber(num) {
    if (num >= 1_000_000) {
      const rounded = Math.round(num / 10_000) * 10_000;
      const formatted = (rounded / 1_000_000).toFixed(1);
      return formatted.replace(/\.0$/, "") + "M+";
    }
    if (num >= 1_000) {
      const rounded = Math.round(num / 100) * 100;
      const formatted = (rounded / 1_000).toFixed(1);
      return formatted.replace(/\.0$/, "") + "K+";
    }

    const rounded = Math.round(num / 10) * 10;
    return rounded.toString() + "+";
  }

  useEffect(() => {
    const getIpAddress = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/ip`
        );
        const ip = response.data.ip;
        dispatch(setIpAddress(ip));
      } catch (error) {
        console.error("Error fetching or posting view:", error);
      }
    };

    if (!ipAddress) {
      getIpAddress();
    }

    const postView = async () => {
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/view/`, {
          ip_address: ipAddress,
          user_id: userId || null,
        });
      } catch (error) {
        console.error("Error posting view:", error);
      }
    };
    if (ipAddress) {
      postView();
    }

    const fetchViewCount = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/view/count`
        );

        setViewCount(response.data.total_views || 0);
      } catch (error) {
        console.error("Error fetching view count:", error);
        setViewCount("20");
      }
    };
    fetchViewCount();
  }, [dispatch, ipAddress, userId]);

  useEffect(() => {
    const fetchTotalCommits = async () => {
      const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USER;
      const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
      if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
        console.error(
          "GitHub username or token is not set in environment variables."
        );
        return;
      }

      try {
        const headers = {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        };

        const reposRes = await axios.get(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`,
          { headers }
        );
        const repos = reposRes.data;

        let total = 0;

        for (const repo of repos) {
          try {
            const contributorsRes = await axios.get(
              `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/stats/contributors`,
              { headers }
            );

            const stats = contributorsRes.data;
            if (Array.isArray(stats)) {
              const userStat = stats.find(
                (contributor) => contributor.author?.login === GITHUB_USERNAME
              );
              if (userStat) total += userStat.total;
            }
          } catch (err) {
            console.warn(`Stats not ready for ${repo.name}`, err);
          }
        }

        const formattedTotal = formatNumber(total);
        setTotalCommits(formattedTotal);
      } catch (error) {
        console.error("Error fetching commits:", error);
      }
    };

    fetchTotalCommits();
  }, []);

  return (
    <section
      className="relative  text-white  md:h-[60vh] lg:h-[95vh] "
      id="home"
    >
      {!isLoading && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: 1,
            duration: 1.2,
            ease: "easeOut",
          }}
          className="absolute left-5 sm:left-8 md:left-10 lg:left-12 top-80 md:top-52 lg:top-96 md:mt-60 lg:mt-32 transform -translate-y-1/2 flex flex-col gap-40 md:gap-52 lg:gap-70"
        >
          <a
            href="https://github.com/akash85246"
            className="transform -rotate-90 origin-left tracking-widest text-xs sm:text-sm md:text-lg lg:text-xl font-bold"
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/akash-rajput-dev/"
            className="transform -rotate-90 origin-left tracking-widest text-xs sm:text-sm md:text-lg lg:text-xl font-bold"
          >
            LINKEDIN
          </a>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex flex-col justify-evenly h-full text-center">
        <div className="flex mt-10 mb-0 flex-col items-start justify-center font-orbitron">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold text-cyan-400 text-center w-full font-orbitron orbitron">
            Hi, I'm Akash Rajput
          </h1>

          {!isLoading && (
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="text-xs sm:text-sm md:text-base lg:text-xl mt-4 text-gray-300 text-center w-full"
            >
              Aspiring Software Developer | Full Stack Enthusiast | AI Learner
            </motion.p>
          )}
        </div>

        <div className="ml-10 sm:ml-15 md:ml-20 lg:ml-28 grid grid-cols-4 lg:grid-cols-2 ">
          <div className="col-span-3 lg:col-span-1  flex flex-col items-center justify-center text-center h-full gap-8  md:gap-16">
            <div className="mt-8 md:mt-1 lg:mt-12 text-left text-[#DC143C] text-sm sm:text-xl md:text-2xl lg:text-3xl font-semibold space-y-2">
              <div className="mt-8 text-left space-y-4 text-sm sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[#DC143C] min-h-20 ">
                <AnimatedTextLine
                  text="PART HUMAN, PART MACHINE"
                  startDelay={0}
                  className="w-full whitespace-pre-wrap text-[#DC143C] break-words min-h-10"
                />
                <AnimatedTextLine
                  text="FULLY PASSIONATE ABOUT BUILDING."
                  startDelay={30}
                  className="w-full whitespace-pre-wrap text-[#DC143C] break-words min-h-10"
                />
                <AnimatedTextLine
                  text="TURNING SPARKS OF IDEAS"
                  startDelay={75}
                  className="w-full whitespace-pre-wrap text-[#DC143C] break-words min-h-10"
                />
                <AnimatedTextLine
                  text="INTO DIGITAL REALITIES."
                  startDelay={95}
                  className="w-full whitespace-pre-wrap text-[#DC143C] break-words min-h-10"
                />
              </div>
            </div>

            {/* Stats */}
            <AnimatePresence>
              {!isLoading && (
                <motion.div
                  className="mt-0 flex gap-10 md:gap-16 lg:gap-36 md:pr-16 lg:pr-20 w-full text-center orbitron"
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                >
                  {/* VIEWS */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2, duration: 0.6 }}
                  >
                    <p className="text-2xl md:text-5xl lg:text-7xl font-bold">
                      {viewCount || "30"}
                    </p>
                    <p className="text-sm md:text-lg font-semibold">VIEWS</p>
                  </motion.div>

                  {/* COMMITS */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2.3, duration: 0.6 }}
                  >
                    <p className="text-2xl md:text-5xl lg:text-7xl font-bold">
                      {totalCommits || "280+"}
                    </p>
                    <p className="text-sm md:text-lg font-semibold">COMMITS</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div></div>
        </div>
      </div>
    </section>
  );
}

export default Home;
