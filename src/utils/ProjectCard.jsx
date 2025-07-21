import { useEffect, useState } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
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
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <li
      className={`project-card flex flex-col lg:flex-row ${
        isEven ? "" : "lg:flex-row-reverse"
      } rounded-lg  shadow-md gap-5`}
    >
      {/* Carousel */}
      <div className="relative h-[30rem] lg:w-2/3 w-full overflow-hidden rounded-md">
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
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "highlight" : "normal"
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2  bg-opacity-50 text-white px-2 py-1 rounded-full"
        >
          <ArrowLeftIcon className="text-highlight"></ArrowLeftIcon>
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-opacity-50 text-white px-2 py-1 rounded-full"
        >
          <ArrowRightIcon className="text-highlight"></ArrowRightIcon>
        </button>
      </div>

      {/* Content */}
      <div className="lg:w-1/3 w-full">
        <h2 className="project-title text-xl font-semibold mb-2 orbitron">{title}</h2>
        <p className="project-description text-gray-300 mb-4">{description}</p>
        <ul className="project-tags flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="relative inline-block p-[1px] rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500"
            >
              <span className="block bg-black text-[#5544ff] px-3 py-1 rounded-full text-sm font-semibold tracking-wide uppercase  orbitron">
                {tag}
              </span>
            </span>
          ))}
        </ul>
        <div className="project-links flex gap-4">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
          )}
          {link && link !== "#" && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

export default ProjectCard;
