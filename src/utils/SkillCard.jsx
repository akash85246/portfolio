export default function SkillCard({ icon, name }) {
  return (
    <div className="relative group flex flex-col items-center">
      <div
        className="
          w-20 h-20
          flex items-center justify-center
          rounded-lg
          overflow-hidden
          transition-all duration-300
          group-hover:scale-110
        "
      >
        <img
          src={icon}
          alt={name}
          className="
            object-contain w-16 h-16
            transition-all duration-300
            grayscale contrast-100     
            group-hover:grayscale-0 
          "
        />
      </div>

      
      <div
        className="
          absolute z-50 -bottom-8 left-1/2 -translate-x-1/2
          opacity-0 group-hover:opacity-100
          pointer-events-none
          transition-all duration-300
          text-xs md:text-sm
          px-2 py-1 rounded-md
          bg-black/80 text-white
          shadow-lg
          whitespace-nowrap
        "
      >
        {name}
      </div>
    </div>
  );
}