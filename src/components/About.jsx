import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InstagramStoryCard from "../utils/InstagramStoryCard";
import InstagramModal from "../utils/InstagramModal";
import { ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { fetchStories, addSeenStory } from "../redux/slices/storySlice";

function About() {
  const dispatch = useDispatch();
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

  const userToken = import.meta.env.VITE_META_USER_TOKEN;
  const userId = import.meta.env.VITE_INSTAGRAM_USER_ID;
  useEffect(() => {
    dispatch(fetchStories({ userId, userToken }));
  }, [userId, userToken]);
  const { stories, seen, loading, error } = useSelector(
    (state) => state.stories
  );

  console.log("Stories from Redux:", stories, seen, loading, error);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      dispatch(addSeenStory(stories[currentIndex + 1].id));
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      dispatch(addSeenStory(stories[currentIndex - 1].id));
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCardClick = (index) => {
    setCurrentIndex(index);
    dispatch(addSeenStory(stories[index].id));
    setModalOpen(true);
  };
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true, margin: "-100px" });

  return (
    <section className="section" id="about">
      <motion.div
        ref={aboutRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="flex flex-col justify-around text-center min-h-[60vh]"
      >
        <div className="flex flex-col items-start justify-center ">
          <h1 className="section-heading">ABOUT ME</h1>

          <div className="grid grid-cols-3 ">
            <div className="col-span-2 font-inter font-normal text-xl font-extralight leading-relaxed text-justify space-y-6">
              <p>
                I’m a final-year B.Tech student specializing in Artificial
                Intelligence and Machine Learning, with a strong passion for{" "}
                <span className="relative inline-block font-inter font-medium text-[18px]">
                  full-stack web development
                  <span className="absolute left-0 -bottom-[0.1rem] w-full h-[2px] bg-[radial-gradient(circle,_rgba(239,239,239,1)_40%,_rgba(239,239,239,0)_100%)]"></span>
                </span>{" "}
                and building futuristic user experiences. I enjoy creating
                responsive, scalable applications using technologies like React,
                Node.js, and MongoDB, while also exploring the{" "}
                <span className="relative inline-block font-inter font-medium text-[18px]">
                  real-world applications of AI in projects
                  <span className="absolute left-0 -bottom-[0.1rem] w-full h-[2px] bg-[radial-gradient(circle,_rgba(239,239,239,1)_40%,_rgba(239,239,239,0)_100%)]"></span>
                </span>{" "}
                involving predictive analytics and intelligent systems.
              </p>

              <p>
                Driven by curiosity and creativity, I approach challenges with a{" "}
                <span className="relative inline-block font-inter font-medium text-[18px]">
                  solution-focused
                  <span className="absolute left-0 -bottom-[0.1rem] w-full h-[2px] bg-[radial-gradient(circle,_rgba(239,239,239,1)_40%,_rgba(239,239,239,0)_100%)]"></span>
                </span>{" "}
                mindset and a deep interest in how technology can solve real
                problems. I’ve worked on projects like an{" "}
                <span className="relative inline-block font-inter font-medium text-[18px]">
                  AI-powered blog platform
                  <span className="absolute left-0 -bottom-[0.1rem] w-full h-[2px] bg-[radial-gradient(circle,_rgba(239,239,239,1)_40%,_rgba(239,239,239,0)_100%)]"></span>
                </span>{" "}
                and an investment advisory tool that leverages data-driven
                machine learning models to guide financial decisions. My core
                strength lies in{" "}
                <span className="relative inline-block font-inter font-medium text-[18px]">
                  developing end-to-end solutions
                  <span className="absolute left-0 -bottom-[0.1rem] w-full h-[2px] bg-[radial-gradient(circle,_rgba(239,239,239,1)_40%,_rgba(239,239,239,0)_100%)]"></span>
                </span>{" "}
                — from building scalable full-stack web applications using
                technologies like React and Node.js, to designing, training, and
                deploying intelligent ML models for real-world use cases.
              </p>
            </div>

            <div className="relative w-full h-full">
              <canvas className="absolute inset-0 w-full h-full z-0"></canvas>

              <ul
                className="relative w-full h-[500px]"
                ref={scrollContainerRef}
                onScroll={handleScroll}
              >
                {stories.map((story, index) => (
                  <InstagramStoryCard
                    story={story}
                    onClick={handleCardClick}
                    seenList={seen}
                    index={index}
                    key={index}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <InstagramModal
            isOpen={isModalOpen}
            story={stories[currentIndex]}
            onClose={handleClose}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </div>
      </motion.div>
    </section>
  );
}
export default About;
