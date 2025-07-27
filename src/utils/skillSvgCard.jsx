import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

function SkillSvgCard({ icon, name, color = "#cccccc" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      }}
      className="skill-card-ltr p-2 sm:py-2 sm:px-5 rounded-xl shadow-md backdrop-blur-sm backdrop-opacity-100 flex items-center justify-center hover:shadow-xl transition border hover:scale-110 gap-5"
      style={{ borderColor: color }}
    >
      <div className="rounded-full flex items-center justify-center overflow-hidden svg-3d-wrapper z-10">
        <img
          src={icon}
          alt={name}
          className="h-5 w-5 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain svg-3d-icon"
          draggable={false}
        />
      </div>
      <p
        className="text-center text-xs sm:text-sm md:text-base lg:text-lg font-medium z-10"
        style={{ color: color }}
      >
        {name}
      </p>
    </motion.div>
  );
}

export default SkillSvgCard;