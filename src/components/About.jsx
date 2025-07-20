import React from "react";
import SpiderController from "./SpiderController";
import axios from "axios";
import { useState, useRef } from "react";
import InstagramStoryCard from "../utils/InstagramStoryCard";
import InstagramModal from "../utils/InstagramModal";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function About() {
  const scrollContainerRef = useRef(null);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (e) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const isEnd =
      container.scrollLeft + container.offsetWidth >=
      container.scrollWidth - 10;
    setIsAtEnd(isEnd);
  };

  const [stories, setStories] = useState([]);

  const userToken = import.meta.env.VITE_META_USER_TOKEN;
  const userId = import.meta.env.VITE_INSTAGRAM_USER_ID;

  const url = `https://graph.facebook.com/v19.0/${userId}/stories?fields=id,media_type,media_url,timestamp&access_token=${userToken}`;

  //fetching data from the server on window load
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data.data;
        setStories(data);
        console.log("Stories:", data);
        if (data.length < 6) {
          setIsAtEnd(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [url]);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCardClick = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };


  return (
    <section className="next-section about section" id="about">
      {/* Main Content */}
      <div className=" flex flex-col justify-around h-full text-center">
        <div className="flex flex-col items-start justify-center font-orbitron">
          <h1 className="section-heading">ABOUT ME</h1>
          <p className="text-left text-md md:text-xl mt-4 text-gray-300 w-full">
            I’m a final-year B.Tech student specializing in Artificial
            Intelligence and Machine Learning, with a strong passion for
            full-stack web development and building futuristic user experiences.
            I enjoy creating responsive, scalable applications using
            technologies like React, Node.js, and MongoDB, while also exploring
            the real-world applications of AI in projects involving predictive
            analytics and intelligent systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 ">
          <p className="text-left text-md md:text-xl mt-4 text-gray-300 w-full">
            Driven by curiosity and creativity, I approach challenges with a
            solution-focused mindset and a deep interest in how technology can
            solve real problems. I’ve worked on projects like an AI-powered blog
            platform and an investment advisory tool that leverages data-driven
            machine learning models to guide financial decisions. My core
            strength lies in developing end-to-end solutions — from building
            scalable full-stack web applications using technologies like React
            and Node.js, to designing, training, and deploying intelligent ML
            models for real-world use cases.
          </p>
          <div className=""></div>
        </div>

        <div className="relative  w-[56vw] overflow-hidden flex items-center justify-center my-10">
          <ul
            className="flex w-full items-start overflow-x-auto gap-[1rem] scrollbar-hide"
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            {stories.map((story,index) => (
              <>
                <li
                  key={story.id}
                  className="flex-shrink-0 w-[calc((50vw-2.5rem)/6)]"
                  onClick={() => handleCardClick(index)}
                >
                  <InstagramStoryCard
                    story={story}
                    
                  />
                </li>
                
              </>
            ))}
          </ul>
          <InstagramModal
                  isOpen={isModalOpen}
                  story={stories[currentIndex]}
                  onClose={handleClose}
                  onNext={handleNext}
                  onPrev={handlePrev}
                />
          {!isAtEnd && (
            <div className="h-full w-10  flex items-center justify-end pr-2">
              <span className="text-lg font-bold">
                <ArrowForwardIosIcon
                  fontSize="large"
                  className="text-white t"
                />
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default About;
