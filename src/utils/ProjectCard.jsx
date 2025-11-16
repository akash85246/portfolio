import { useEffect, useState } from "react";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function ProjectCard({
  title,
  images,
  description,
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
    }, 1000);
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
      className="relative  group  w-full"
    >
      <h3 className="w-full flex justify-between items-center font-inter p-11 border-b border-[#7B7B7B]">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className=" font-medium  text-xl  leading-none tracking-[0] uppercase"
        >
          {title}
        </a>
        <span className=" font-normal text-lg leading-[19px] tracking-[0] text-justify">
          {" "}
          {description.slice(0, 100)}...
        </span>
      </h3>

      <div
        className={`hidden group-hover:flex  absolute p-[0.1rem] rounded-md bg-gradient-to-br from-[#E9B0FF] via-[#C08CFF] to-[#4D84FA] z-50  pointer-events-none`}
      >
        <div
          className={` project-card flex flex-col lg:flex-row  bg-[#222222]  p-4 ${
            isEven ? "" : "lg:flex-row-reverse"
          } rounded-lg  gap-5`}
        >
          {/* Carousel */}
          <div className="relative h-[25rem] lg:w-2/3 overflow-hidden rounded-md">
            <img
              src={images[currentIndex]}
              alt={`${title} image ${currentIndex + 1}`}
              className="w-full h-full object-cover transition duration-500"
            />

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 w-2 rounded-full ${
                    index === currentIndex ? "highlight" : "normal"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-opacity-50 text-white px-2 py-1 rounded-full"
              aria-label="Previous Slide"
            >
              <CircleChevronLeft className="text-highlight" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-opacity-50 text-white px-2 py-1 rounded-full"
              aria-label="Next Slide"
            >
              <CircleChevronRight className="text-highlight" />
            </button>
          </div>

          {/* Content */}
          <div className="w-1/2 font-inter font-medium  flex flex-col justify-between gap-5  p-5  ">
            <h2 className="text-2xl leading-none tracking-[0] uppercase">
              {title}
            </h2>
            <p className="font-normal text-xl leading-relaxed  tracking-[0] text-justify  text-xs sm:text-sm md:text-base">
              {description}
            </p>
            <ul className="project-tags flex flex-wrap gap-2 mb-4 lg:mb-2">
              {tags.map((tag, index) => (
                <li
                  key={index}
                  className="opacity-100 border border-[#EFEFEF]rounded-md px-2 py-1 gap-[10px] font-inter font-normal text-base leading-none tracking-[0]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

export default ProjectCard;
