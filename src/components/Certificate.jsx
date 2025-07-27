import React, { useRef, useState, useEffect } from "react";
import sql from "../assets/Certificates/SQLcertificate.png";
import fullstack from "../assets/Certificates/fullstack.png";
import vihaan from "../assets/Certificates/vihaan.png";
import pbel from "../assets/Certificates/PBEL.png";
import gdsc from "../assets/Certificates/gdsc.png";
import ibm from "../assets/Certificates/IBM.png";
// more
import aiImage from "../assets/Certificates/infosys/ai.png";
import cvImage from "../assets/Certificates/infosys/ComputerVision101.png";
import dataScienceImage from "../assets/Certificates/infosys/dataScience.png";
import dlImage from "../assets/Certificates/infosys/dl.png";
import dlForDevImage from "../assets/Certificates/infosys/dlForDevelopers.png";
import emailWritingImage from "../assets/Certificates/infosys/emailWriting.png";
import mlFundamentalsImage from "../assets/Certificates/infosys/fundamentalsOfMachineLearning.png";
import generativeAIImage from "../assets/Certificates/infosys/generativeAI.png";
import generativeModelsImage from "../assets/Certificates/infosys/generativeModels.png";
import hipImage from "../assets/Certificates/infosys/hip.png";
import ibmImage from "../assets/Certificates/infosys/IBM.png";
import nlpImage from "../assets/Certificates/infosys/nlp.png";
import gptImage from "../assets/Certificates/infosys/OpenAIGpt.png";
import transformerImage from "../assets/Certificates/infosys/preTrainedTransformer.png";
import primerImage from "../assets/Certificates/infosys/primer.png";
import promptEngineeringImage from "../assets/Certificates/infosys/promptEngineering.png";
import rpaImage from "../assets/Certificates/infosys/RoboticProcessAutomation.png";
import runtymImage from "../assets/Certificates/infosys/RuntymSI.png";
import timeManagementImage from "../assets/Certificates/infosys/timeManagement.png";

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

const AnimatedImage = ({ src, className, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <motion.img
      ref={ref}
      src={src}
      variants={fadeInPop(delay)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    />
  );
};



function Certificate() {
  const certificateRef = useRef(null);
  const isInView = useInView(certificateRef, { once: true, margin: "-100px" });

  const [selectedId, setSelectedId] = useState(18);
  const scrollRef = useRef(null);
  const itemRefs = useRef([]);

  const certificates = [
    { id: 1, src: aiImage, title: "AI Certificate" },
    { id: 2, src: cvImage, title: "Computer Vision 101" },
    { id: 3, src: dataScienceImage, title: "Data Science" },
    { id: 4, src: dlImage, title: "Deep Learning" },
    { id: 5, src: dlForDevImage, title: "Deep Learning for Developers" },
    { id: 6, src: emailWritingImage, title: "Email Writing" },
    { id: 7, src: mlFundamentalsImage, title: "Machine Learning Fundamentals" },
    { id: 8, src: generativeAIImage, title: "Generative AI" },
    { id: 9, src: generativeModelsImage, title: "Generative Models" },
    { id: 10, src: hipImage, title: "HIP Certificate" },
    { id: 11, src: timeManagementImage, title: "Time Management Certificate" },
    { id: 12, src: nlpImage, title: "NLP Certificate" },
    { id: 13, src: gptImage, title: "OpenAI GPT Certificate" },
    {
      id: 14,
      src: transformerImage,
      title: "Pre-trained Transformer Certificate",
    },
    { id: 15, src: primerImage, title: "Primer Certificate" },
    {
      id: 16,
      src: promptEngineeringImage,
      title: "Prompt Engineering Certificate",
    },
    { id: 17, src: rpaImage, title: "Robotic Process Automation Certificate" },
    { id: 18, src: runtymImage, title: "Runtym SI Certificate" },
  ];

  return (
    <section className="next-section certificate section" id="certificate">
      <motion.div
        ref={certificateRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="flex flex-col justify-around  min-h-[60vh]"
      >
        <div>
          <h1 className="section-heading text-left">CERTIFICATES</h1>
        </div>

        <div className="flex flex-col gap-1 sm:gap-2 md:gap-5">
      {/* First Row */}
      <div className="gap-1 sm:gap-2 md:gap-5 grid-cols-5 grid md:grid-cols-3">
        <AnimatedImage
          src={fullstack}
          delay={0}
          className="md:aspect-[3/2] col-span-3 md:col-span-2 w-full object-cover"
        />
        <div className="gap-1 sm:gap-2 md:gap-5 grid grid-cols-1 col-span-2 md:col-span-1">
          <AnimatedImage
            src={sql}
            delay={1}
            className="aspect-[3/2] w-full object-cover"
          />
          <AnimatedImage
            src={ibm}
            delay={1}
            className="aspect-[3/2] w-full object-cover"
          />
        </div>
      </div>

      {/* Second Row */}
      <div className="gap-1 sm:gap-2 md:gap-5 grid-cols-5 grid md:grid-cols-3">
        <div className="gap-1 sm:gap-2 md:gap-5 grid grid-cols-1 col-span-2 md:col-span-1">
          <AnimatedImage
            src={vihaan}
            delay={1.6}
            className="aspect-[3/2] w-full object-cover"
          />
          <AnimatedImage
            src={gdsc}
            delay={1.6}
            className="aspect-[3/2] w-full object-cover"
          />
        </div>
        <AnimatedImage
          src={pbel}
          delay={1.4}
          className="md:aspect-[3/2] col-span-3 md:col-span-2 w-full object-cover"
        />
      </div>
    </div>

        <div>
          <h1 className="pt-5 md:pt-10 text-xl sm:text-2xl md:text-3xl text-[#00bcd4] mb-2 orbitron text-left ">
            MORE CERTIFICATES
          </h1>

          <div className="flex justify-evenly items-start gap-1 sm:gap-2 lg:gap-5">
            {/* Selected certificate display */}

            <img
              src={certificates[selectedId - 1]?.src}
              alt="Selected Certificate"
              className="max-h-[10rem] sm:max-h-[20rem] md:max-h-[24rem] lg:max-h-[35rem] xl:max-h-[45rem]  aspect-[3/2]  object-cover  border rounded-lg shadow-lg"
            />

            {/* Vertical carousel */}
            <div
              className="max-h-[10rem] sm:max-h-[20rem] md:max-h-[24rem] lg:max-h-[35rem] xl:max-h-[45rem] w-64 overflow-y-scroll scroll-smooth snap-y snap-mandatory border rounded-lg"
              ref={scrollRef}
            >
              {certificates.map((cert, idx) => (
                <div
                  key={cert.id}
                  className={`snap-center cursor-pointer transition-all duration-300 flex items-center justify-center m-2 ${
                    selectedId === cert.id
                      ? "scale-110"
                      : "scale-100 opacity-60"
                  }`}
                  onClick={() => setSelectedId(cert.id)}
                  ref={(el) => (itemRefs.current[idx] = el)}
                >
                  <img
                    src={cert.src}
                    alt={cert.title}
                    className="w-40  aspect-auto md:w-50 md:h-38 lg:w-60 lg:h-48 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
export default Certificate;
