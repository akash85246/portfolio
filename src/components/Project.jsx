import ProjectCard from "../utils/ProjectCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import skill1 from "../assets/ProjectImages/Project1/page1.png";
import shelf1 from "../assets/ProjectImages/Project2/page1.png";
import shelf2 from "../assets/ProjectImages/Project2/page2.png";
import shelf3 from "../assets/ProjectImages/Project2/page3.png";
import shelf4 from "../assets/ProjectImages/Project2/page4.png";
import shelf5 from "../assets/ProjectImages/Project2/page5.png";
import shelf6 from "../assets/ProjectImages/Project2/page6.png";
import scribly1 from "../assets/ProjectImages/Project4/page1.png";
import scribly2 from "../assets/ProjectImages/Project4/page2.png";
import scribly3 from "../assets/ProjectImages/Project4/page3.png";
import scribly4 from "../assets/ProjectImages/Project4/page4.png";
import engineer1 from "../assets/ProjectImages/Project3/page1.png";
import engineer2 from "../assets/ProjectImages/Project3/page2.png";
import engineer3 from "../assets/ProjectImages/Project3/page3.png";
import engineer4 from "../assets/ProjectImages/Project3/page4.png";
import engineer5 from "../assets/ProjectImages/Project3/page5.png";
import engineer6 from "../assets/ProjectImages/Project3/page6.png";
import engineer7 from "../assets/ProjectImages/Project3/page7.png";
import engineer8 from "../assets/ProjectImages/Project3/page8.png";
import { motion, useInView } from "framer-motion";
import AnimatedTextLine from "../utils/AnimatedText";
import { useState, useRef } from "react";

function Project() {
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "Skill2Salary",
      images: [skill1],
      description:
        "Skill2Salary is a smart salary prediction platform designed to help users estimate their expected salary based on educational background, work experience, and job preferences. Powered by machine learning, the app uses real-world data to make informed predictions and guide users in career planning.",
      github: "https://github.com/akash85246/Skill2Salary-ml",
      link: "https://skill2salary.streamlit.app/",
      tags: [
        "machinelearning",
        "streamlit",
        "python",
        "EDA",
        "hyperparameter tuning",
        "regression",
        "ensemblelearning",
        "salary prediction",
        "ml application",
        "data analysis",
        "intelligent app",
        "education analytics",
      ],
    },
    {
      title: "ShelfWise",
      images: [shelf1, shelf2, shelf3, shelf4, shelf5, shelf6],
      description:
        "A community-driven book review platform where anyone can share their reviews of books. The site integrates Google Authentication for user sign-in and displays book cover images via the Open Library API. Built with Node.js, EJS for templating, PostgreSQL for the database, and styled with modern CSS techniques.",
      github: "https://github.com/akash85246/ShelfWise",
      link: "https://shelfwise-6o3j.onrender.com/",
      tags: [
        "nodejs",
        "express",
        "ejs",
        "postgresql",
        "css",
        "google authentication",
        "open library api",
        "book reviews",
        "community platform",
        "web development",
        "full stack",
      ],
    },
    {
      title: "Engineer Insights",
      images: [
        engineer1,
        engineer2,
        engineer3,
        engineer4,
        engineer5,
        engineer6,
        engineer7,
        engineer8,
      ],
      description:
        "Engineer Insights is a dynamic and feature-rich blogging platform built to empower engineers, developers, and tech enthusiasts to share knowledge, express ideas, and grow their professional presence. Whether you’re a student documenting your learning journey or a seasoned developer writing in-depth technical articles, Engineer Insights gives you the tools to write, engage, and evolve.",
      github: "https://github.com/akash85246/Engineer-Insights",
      link: "https://engineer-insights.onrender.com/",
      tags: [
        "nodejs",
        "express",
        "ejs",
        "mongodb",
        "css",
        "passportjs",
        "authentication",
        "blogging platform",
        "web development",
        "full stack",
        "community",
        "engineer insights",
        "developer blog",
      ],
    },
    {
      title: "Scribly",
      images: [scribly1, scribly2, scribly3, scribly4],
      description:
        "Scribly is a modern sticky note web app designed to enhance productivity and organization. With a sleek and intuitive interface, it allows users to effortlessly add, edit, delete, and organize notes.",
      github: "https://github.com/akash85246/Scribly",
      link: "https://scribly-kappa.vercel.app/",
      tags: [
        "reactjs",
        "javascript",
        "tailwindcss",
        "redux",
        "nodejs",
        "express",
        "postgresql",
        "web development",
        "sticky notes",
        "productivity app",
        "modern design",
        "user interface",
        "note-taking",
        "full stack development",
      ],
    },
  ];

  return (
    <section className="next-section  project section" id="project">
      <motion.div
        ref={aboutRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="flex flex-col justify-around  min-h-[60vh]"
      >
        <div>
          <h1 className="section-heading text-left">PROJECT</h1>
        </div>
        <ul id="project-list" className="flex flex-col gap-10">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              images={project.images}
              description={project.description}
              github={project.github}
              link={project.link}
              tags={project.tags}
              index={index}
            />
          ))}
        </ul>

        <div className="flex justify-center mt-5 md:mt-10 px-4">
          <a
            href="https://github.com/akash85246?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:text-[#8b5cf6] hover:scale-105 transition-all duration-300 ease-in-out border border-white/10 backdrop-blur-sm text-xs sm:text-sm md:text-base lg:text-base"
          >
            More Projects on GitHub
            <ArrowForwardIosIcon className="text-sm" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default Project;
