import SkillCard from "../utils/SkillCard";
import SkillSvgCard from "../utils/skillSvgCard";
import c from "../assets/SkillImages/c.glb";
import cpp from "../assets/SkillImages/cpp.glb";
import css from "../assets/SkillImages/css.fbx";
import ejs from "../assets/SkillImages/ejs.svg";
import express from "../assets/SkillImages/expressjs.svg";
import git from "../assets/SkillImages/git.glb";
import github from "../assets/SkillImages/github.fbx";
import googleAIStudio from "../assets/SkillImages/googleAIStudio.svg";
import html from "../assets/SkillImages/html.fbx";
import javascript from "../assets/SkillImages/javascript.glb";
import jquery from "../assets/SkillImages/jquery.fbx";
import matplotlib from "../assets/SkillImages/matplotlib.svg";
import ml from "../assets/SkillImages/ml.svg";
import mongodb from "../assets/SkillImages/mongodb.fbx";
import motoko from "../assets/SkillImages/motoko.svg";
import nodejs from "../assets/SkillImages/node.glb";
import numpy from "../assets/SkillImages/np.fbx";
import pandas from "../assets/SkillImages/pd.svg";
import pg from "../assets/SkillImages/pg.fbx";
import python from "../assets/SkillImages/py.glb";
import react from "../assets/SkillImages/react.glb";

import seaborn from "../assets/SkillImages/sns.svg";
import sklearn from "../assets/SkillImages/sklearn.svg";
import tailwind from "../assets/SkillImages/tailwind.glb";

import { motion, useInView } from "framer-motion";
import AnimatedTextLine from "../utils/AnimatedText";
import {  useRef } from "react";

function Skill() {
  const skillLogos = [
    // 🟢 Languages
    { icon: c, color: "#A8B9CC", name: "C", type: "glb" },
    { icon: cpp, color: "#00599C", name: "C++", type: "glb" },
    { icon: html, color: "#E44D26", name: "HTML", type: "fbx" },
    { icon: css, color: "#264DE4", name: "CSS", type: "fbx" },
    { icon: javascript, color: "#F7DF1E", name: "JavaScript", type: "glb" },
    { icon: python, color: "#3776AB", name: "Python", type: "glb" },
    { icon: ml, color: "#0769AD", name: "Machine Learning", type: "svg" },
    { icon: motoko, color: "#FF5C5C", name: "Motoko", type: "svg" },

    // 🟣 Databases
    { icon: mongodb, color: "#47A248", name: "MongoDB", type: "fbx" },
    { icon: pg, color: "#336791", name: "PostgreSQL", type: "fbx" },

    // 🔵 Libraries & Frameworks
    { icon: react, color: "#61DAFB", name: "React", type: "glb" },
    { icon: express, color: "#339933", name: "Express", type: "svg" },
    { icon: tailwind, color: "#38B2AC", name: "Tailwind CSS", type: "glb" },
    { icon: ejs, color: "#F1E05A", name: "EJS", type: "svg" },
    { icon: jquery, color: "#0769AD", name: "jQuery", type: "fbx" },
    { icon: sklearn, color: "#F7931E", name: "Scikit-learn", type: "svg" },
    { icon: seaborn, color: "#268BD2", name: "Seaborn", type: "svg" },
    { icon: pandas, color: "#0769AD", name: "Pandas", type: "svg" },
    { icon: numpy, color: "#00599C", name: "NumPy", type: "fbx" },
    { icon: matplotlib, color: "#11557C", name: "Matplotlib", type: "svg" },

    // 🟡 Others
    { icon: nodejs, color: "#339933", name: "Node.js", type: "glb" },
    { icon: git, color: "#F05032", name: "Git", type: "glb" },
    { icon: github, color: "#FFD6A4", name: "GitHub", type: "fbx" },
    {
      icon: googleAIStudio,
      color: "#4285F4",
      name: "Google AI Studio",
      type: "svg",
    },
  ];

  const skillRef = useRef(null);
    const isInView = useInView(skillRef, { once: true, margin: "-100px" });

  return (
    <section className="next-section skill section " id="skill">
      <motion.div
        ref={skillRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="flex flex-col justify-around  min-h-[60vh]"
      >
        <div>
          <h1 className="section-heading text-left">SKILL</h1>
        </div>

        <div className="skill-container flex flex-wrap items-center justify-evenly gap-2 md:gap-5">
          {skillLogos.map((logo, index) => {
            if (logo.type !== "svg")
              return (
                <SkillCard
                  key={index}
                  icon={logo.icon}
                  color={logo.color}
                  name={logo.name}
                  index={index}
                  type={logo.type}
                />
              );
          })}
        </div>
        <h2 className="pt-5 md:pt-10 text-xl sm:text-2xl md:text-3xl text-[#00bcd4] mb-2 orbitron text-left ">
          MORE SKILL
        </h2>
        <div className="skill-container flex flex-wrap items-center justify-evenly gap-2 lg:gap-5">
          {skillLogos.map((logo, index) => {
            if (logo.type === "svg")
              return (
                <SkillSvgCard
                  key={index}
                  icon={logo.icon}
                  color={logo.color}
                  name={logo.name}
                  index={index}
                  type={logo.type}
                />
              );
          })}
        </div>
      </motion.div>
    </section>
  );
}
export default Skill;
