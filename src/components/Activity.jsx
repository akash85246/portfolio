import GithubActivity from "../utils/GithubActivity";
import LeetCodeActivity from "../utils/LeetCodeActivity";
import { motion, useInView } from "framer-motion";
import React, { useRef} from "react";
function Activity() {
  const activityRef = useRef(null);
  const isInView = useInView(activityRef, { once: true, margin: "-100px" });

  return (
    <section className="section " id="activity">
      <motion.div
        ref={activityRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="flex flex-col justify-around"
      >
        <div>
          <h1 className="section-heading ">GITHUB</h1>
        </div>

        <GithubActivity />

        <div>
          <h1 className="section-heading mt-16">LEETCODE</h1>
        </div>
        <LeetCodeActivity />
      </motion.div>
    </section>
  );
}
export default Activity;
