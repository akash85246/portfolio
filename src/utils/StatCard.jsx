import { useRef } from "react";
import { useInView } from "framer-motion";

export default function StatCard({ icon, title, value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className={`font-inter backdrop-blur-sm p-4 sm:p-3 px-3 sm:px-4 rounded-xl shadow-md border border-white/10 flex items-center gap-3 sm:gap-4 relative min-h-[80px] sm:min-h-[100px] w-full max-w-sm transition-all duration-700 ease-out
        ${isInView ? "opacity-100 scale-100" : "opacity-0 scale-75"}
      `}
    >
      <div className="w-full text-center">
        <h2 className="text-white font-semibold text-[0.6rem] sm:text-sm absolute top-2 left-2">
          {title}
        </h2>
        <p className="text-gray-300 text-6xl font-semibold mt-4 font-jersey">
          {value}
        </p>
      </div>
      <div className="absolute bottom-1 right-1 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white text-xl sm:text-2xl">
        {icon}
      </div>
    </div>
  );
}