import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setIpAddress } from "../redux/slices/IpAddressSlice";
import AnimatedTextLine from "../utils/AnimatedText";
import { motion, AnimatePresence } from "framer-motion";
import Counter from "../utils/Counter";

import { useEffect, useState } from "react";

function Home() {
  const [viewCount, setViewCount] = useState("");
  const [viewUnit, setViewUnit] = useState("");
  const [totalCommits, setTotalCommits] = useState("");
  const [commitsUnit, setCommitsUnit] = useState("");
  const ipAddress = useSelector((state) => state.ipAddress.ipAddress);
  const userId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  // const isLoading = useSelector((state) => state.loading.isLoading);
  const isLoading = false;

  function formatNumber(num, setUnit, setCount) {
    if (num >= 1_000_000) {
      const rounded = Math.round(num / 10_000) * 10_000;
      const formatted = (rounded / 1_000_000).toFixed(1);
      setUnit("M+");
      setCount(formatted.replace(/\.0$/, ""));
    }
    if (num >= 1_000) {
      const rounded = Math.round(num / 100) * 100;
      const formatted = (rounded / 1_000).toFixed(1);
      setUnit("K+");
      setCount(formatted.replace(/\.0$/, ""));
    }

    const rounded = Math.round(num / 10) * 10;
    setUnit("+");
    setCount(rounded);
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
      if (!ipAddress) return;
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/view/`, {
          ip_address: ipAddress,
          user_id: userId || null,
        });
      } catch (error) {
        console.error("Error posting view:", error);
      }
    };

    const fetchViewCount = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/view/count`
        );
        formatNumber(response.data.total_views,setViewUnit, setViewCount);
       
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

        formatNumber(total,setCommitsUnit,setTotalCommits);
      } catch (error) {
        console.error("Error fetching commits:", error);
      }
    };

    fetchTotalCommits();
  }, []);

  return (
    <section
      className="relative "
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
          className="absolute left-5 sm:left-8 md:left-10 lg:left-12 top-72 flex flex-col gap-40 md:gap-52 lg:gap-32  font-inter text-lg md:text-xl"
        >
          <a
            href="https://github.com/akash85246"
            className="
        -rotate-90 origin-left
        font-semibold  leading-none
        tracking-wide 
        text-transparent bg-clip-text 
        bg-gradient-to-r from-[#E9B0FF] to-[#4D84FA]
      "
          >
            GITHUB
          </a>
          <a
            href="https://www.linkedin.com/in/akash-rajput-dev/"
            className="
        -rotate-90 origin-left
        font-semibold leading-none
        tracking-wide
        text-transparent bg-clip-text
        bg-gradient-to-r from-[#E9B0FF] to-[#4D84FA]
      "
          >
            LINKEDIN
          </a>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-3 ">
        <div className="flex flex-col items-start justify-center col-span-2 pl-30 pt-30">
          <h1 className="font-inter font-semibold text-[5.2rem] leading-none">
            Hi, I’m Akash Rajput
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
              className="font-inter font-light text-2xl leading-none text-[#7B7B7B] mt-6 p-1"
            >
              Aspiring Software Developer | Full Stack Enthusiast | AI Learner
            </motion.p>
          )}

          <div className="mt-16 flex flex-col gap-2 p-1">
            <AnimatedTextLine
              text="PART HUMAN, PART MACHINE"
              startDelay={0}
              className="font-inter font-light text-xl leading-none lowercase text-[#CECECE] uppercase"
            />
            <AnimatedTextLine
              text="FULLY PASSIONATE ABOUT BUILDING."
              startDelay={80}
              className="font-inter font-light text-xl leading-none lowercase text-[#CECECE] uppercase"
            />
            <AnimatedTextLine
              text="TURNING SPARKS OF IDEAS"
              startDelay={150}
              className="font-inter font-light text-xl leading-none lowercase text-[#CECECE] uppercase"
            />
            <AnimatedTextLine
              text="INTO DIGITAL REALITIES."
              startDelay={200}
              className="font-inter font-light text-xl leading-none lowercase text-[#CECECE] uppercase"
            />
          </div>

          <AnimatePresence>
            {!isLoading && (
              <motion.div
                className="mt-6 flex gap-10 md:gap-32 w-full text-center  "
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
              >
                {/* VIEWS */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2, duration: 0.6 }}
                >
                  <p className="font-normal text-5xl leading-none font-jersey">
                    <Counter end={viewCount || 30} />{viewUnit}
                  </p>
                  <p className="font-inter font-normal text-lg leading-none text-[#EFEFEF]">
                    views
                  </p>
                </motion.div>

                {/* COMMITS */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2.3, duration: 0.6 }}
                >
                  <p className="font-normal text-5xl leading-none font-jersey">
                    <Counter end={totalCommits || 280} />{commitsUnit}
                  </p>
                  <p className="font-inter font-normal text-lg leading-none text-[#EFEFEF]">
                    commits
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <canvas></canvas>
      </div>
    </section>
  );
}

export default Home;
