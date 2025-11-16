import React, { useRef, useState, useEffect } from "react";
import sql from "../assets/Certificates/sqlCertificate.png";
import fullstack from "../assets/Certificates/fullstack.png";
import vihaan from "../assets/Certificates/vihaan.png";
import pbel from "../assets/Certificates/PBEL.png";
import gdsc from "../assets/Certificates/gdsc.png";
import ibm from "../assets/Certificates/IBM.png";

import { motion, useInView } from "framer-motion";

const fadeInPop = (delay) => ({
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay,
      duration: 0.6,
      ease: "easeOut",
    },
  },
});

const AnimatedImage = ({ src, className, delay, alt }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
      <motion.img
        ref={ref}
        src={src}
        variants={fadeInPop(delay)}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={
          className +
          " transition-all duration-300 grayscale contrast-100 hover:grayscale-0"
        }
        alt={alt}
        loading="lazy"
      />
  
  );
};

function Certificate() {
  const certificateRef = useRef(null);
  const isInView = useInView(certificateRef, { once: true, margin: "-100px" });

  return (
    <section className="section" id="certificate">
      <motion.div
        ref={certificateRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="flex flex-col justify-around"
      >
        <h1 className="section-heading">CERTIFICATES</h1>

        <div className="flex flex-col gap-1 sm:gap-2 md:gap-5">
          {/* First Row */}
          <div className="gap-1 sm:gap-2 md:gap-5 grid-cols-5 grid md:grid-cols-3">
            <AnimatedImage
              src={fullstack}
              delay={0}
              className="md:aspect-[3/2] col-span-3 md:col-span-2 w-full object-cover"
              alt="Full Stack Certificate"
            />
            <div className="gap-1 sm:gap-2 md:gap-5 grid grid-cols-1 col-span-2 md:col-span-1">
              <AnimatedImage
                src={sql}
                delay={1}
                className="aspect-[3/2] w-full object-cover"
                alt="SQL Certificate"
              />
              <AnimatedImage
                src={ibm}
                delay={1}
                className="aspect-[3/2] w-full object-cover"
                alt="IBM Certificate"
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="gap-1 sm:gap-2 md:gap-5 grid-cols-5 grid md:grid-cols-3">
            <div className="gap-1 sm:gap-2 md:gap-5 grid grid-cols-1 col-span-2 md:col-span-1">
              <AnimatedImage
                src={vihaan}
                delay={1}
                className="aspect-[3/2] w-full object-cover"
                alt="Vihaan Certificate"
              />
              <AnimatedImage
                src={gdsc}
                delay={1}
                className="aspect-[3/2] w-full object-cover"
                alt="GDSC Certificate"
              />
            </div>
            <AnimatedImage
              src={pbel}
              delay={0}
              className="md:aspect-[3/2] col-span-3 md:col-span-2 w-full object-cover"
              alt="PBEL Certificate"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
export default Certificate;
