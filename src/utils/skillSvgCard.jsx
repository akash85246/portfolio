function SkillSvgCard({ icon, name, color = "#cccccc" }) {
   
  return (
  <div
    className="skill-card-ltr p-2 sm:py-2 sm:px-5 rounded-xl shadow-md backdrop-blur-sm   backdrop-opacity-100 flex items-center justify-center hover:shadow-xl transition border hover:scale-110 gap-5"
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
    <p className="text-center text-xs sm:text-sm md:text-base lg:text-lg font-medium z-10" style={{ color: color }}>
      {name}
    </p>
  </div>
);
}

export default SkillSvgCard;