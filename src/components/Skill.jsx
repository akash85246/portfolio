import SkillCard from "../utils/SkillCard";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import c from "../assets/SkillImages/c.svg";
import cpp from "../assets/SkillImages/cpp.svg";
import python from "../assets/SkillImages/python.svg";
import javascript from "../assets/SkillImages/javascript.svg";
import html from "../assets/SkillImages/html.svg";
import css from "../assets/SkillImages/css.svg";
import tailwind from "../assets/SkillImages/tailwind.svg";
import nodejs from "../assets/SkillImages/nodejs.svg";
import mongodb from "../assets/SkillImages/mongodb.svg";
import postgresql from "../assets/SkillImages/postgresql.svg";
import git from "../assets/SkillImages/git.svg";
import github from "../assets/SkillImages/github.svg";
import ejs from "../assets/SkillImages/ejs.svg";
import jquery from "../assets/SkillImages/jquery.svg";
import vue from "../assets/SkillImages/vue.svg";
import numpy from "../assets/SkillImages/numpy.svg";
import pandas from "../assets/SkillImages/pandas.svg";
import matplotlib from "../assets/SkillImages/matplotlib.svg";
import seaborn from "../assets/SkillImages/seaborn.svg";
import scikit from "../assets/SkillImages/scikit-learn.svg";
import tensorflow from "../assets/SkillImages/tensorflow.svg";
import vitejs from "../assets/SkillImages/Vite.js.svg";
import react from "../assets/SkillImages/React.svg";
import machineLearning from "../assets/SkillImages/machine-learning.svg";
import googleAIStudio from "../assets/SkillImages/googleAIStudio.svg";

function Skill() {
  const skillIcons = [
    { name: "C", icon: c },
    { name: "C++", icon: cpp },
    { name: "Python", icon: python },
    { name: "JavaScript", icon: javascript },
    { name: "HTML", icon: html },
    { name: "CSS", icon: css },
    { name: "TailwindCSS", icon: tailwind },
    { name: "Node.js", icon: nodejs },
    { name: "EJS", icon: ejs },
    { name: "jQuery", icon: jquery },
    { name: "React", icon: react },
    { name: "Vue", icon: vue },
    { name: "Vite.js", icon: vitejs },
    { name: "MongoDB", icon: mongodb },
    { name: "PostgreSQL", icon: postgresql },
    { name: "Git", icon: git },
    { name: "GitHub", icon: github },
    { name: "Machine Learning", icon: machineLearning },
    { name: "NumPy", icon: numpy },
    { name: "Pandas", icon: pandas },
    { name: "Matplotlib", icon: matplotlib },
    { name: "Seaborn", icon: seaborn },
    { name: "Scikit-learn", icon: scikit },
    { name: "TensorFlow", icon: tensorflow },
    { name: "Google AI Studio", icon: googleAIStudio },
  ];

  const skillRef = useRef(null);
  const isInView = useInView(skillRef, { once: true, margin: "-100px" });

  return (
    <section className="section" id="skill">
      <motion.div
        ref={skillRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="flex flex-col justify-center container mx-auto px-6"
      >
        <h1 className="section-heading">SKILLS</h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          <canvas className="col-span-2"></canvas>

          {/* Right Side */}
          <div className="col-span-3 space-y-6">
            <h3 className="font-inter font-semibold text-[40px] leading-[100%] uppercase">
              What I Do
            </h3>

            <p className="font-inter font-normal text-[18px] leading-[26px] text-gray-300">
              A passionate full-stack developer who builds performant, scalable,
              and modern applications using
              <span className="text-white font-semibold"> React</span>,
              <span className="text-white font-semibold"> Node.js</span>, and is
              exploring
              <span className="text-white font-semibold">
                {" "}
                Machine Learning
              </span>
              .
            </p>

            {/* Skills Grid */}
            <ul
              id="skill-list"
              className="grid grid-cols-6 sm:grid-cols-9 gap-4 pt-4"
            >
              {skillIcons.map((skill, index) => (
                <SkillCard key={index} icon={skill.icon} name={skill.name} />
              ))}
            </ul>

            {/* List Items */}
            <ul className="space-y-4 mt-6 text-gray-300">
              <li className="flex gap-3">
                <span className="text-[#4D84FA] text-xl">⚡</span>
                <span>
                  Build clean, modern, responsive Front-End UI using React,
                  Tailwind, and modern animations with Framer Motion.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-[#4D84FA] text-xl">⚡</span>
                <span>
                  Develop robust backend systems using Node.js, Express,
                  PostgreSQL, MongoDB with API-first architecture.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-[#4D84FA] text-xl">⚡</span>
                <span>
                  Applying Machine Learning fundamentals to build intelligent
                  features and predictive systems.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
export default Skill;
