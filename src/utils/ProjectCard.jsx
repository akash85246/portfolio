import { useEffect, useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function ProjectCard({
  title,
  images,
  description,
  github,
  link,
  index,
  tags,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isEven = index % 2 === 0;

  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.li
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      className={`project-card flex flex-col lg:flex-row ${
        isEven ? "" : "lg:flex-row-reverse"
      } rounded-lg  gap-5`}
    >
      {/* Carousel */}
      <div className="relative sm:h-[30rem] lg:w-2/3 w-full overflow-hidden rounded-md">
        <img
          src={images[currentIndex]}
          alt={`${title} image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition duration-500"
        />

        {/* Dots */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 md:w-3 md:h-3 rounded-full ${
                index === currentIndex ? "highlight" : "normal"
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-opacity-50 text-white px-2 py-1 rounded-full"
        >
          <ArrowLeftIcon className="text-highlight" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-opacity-50 text-white px-2 py-1 rounded-full"
        >
          <ArrowRightIcon className="text-highlight" />
        </button>
      </div>

      {/* Content */}
      <div className="lg:w-1/3 w-full">
        <h2 className="project-title text-lg sm:text-xl font-semibold mb-4 lg:mb-2 orbitron">
          {title}
        </h2>
        <p className="project-description text-gray-300 mb-4 lg:mb-2 text-xs sm:text-sm md:text-base">
          {description}
        </p>
        <ul className="project-tags flex flex-wrap gap-2 mb-4 lg:mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="skill-card-ltr p-2 px-4 rounded-xl backdrop-blur-md backdrop-opacity-70 border border-white/20 
              text-xs md:text-sm text-white flex items-center justify-center 
              transition-all duration-300 ease-in-out hover:scale-110 hover:-translate-y-1 
              hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] "
            >
              {tag}
            </span>
          ))}
        </ul>
        <div className="project-links flex gap-4">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm md:text-base"
            >
              GitHub
            </a>
          )}
          {link && link !== "#" && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline text-sm md:text-base"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.li>
  );
}

export default ProjectCard;