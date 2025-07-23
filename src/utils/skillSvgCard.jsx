function SkillSvgCard({ icon, name, color = "#cccccc" }) {
   
  return (
  <div
    className="skill-card-ltr py-2 px-5 rounded-xl shadow-md bg-transparent  backdrop-opacity-100 flex items-center justify-center hover:shadow-xl transition border-4 hover:scale-110 gap-5"
    style={{ borderColor: color }}
  >
    <div className="rounded-full flex items-center justify-center overflow-hidden svg-3d-wrapper z-10">
      <img
        src={icon}
        alt={name}
        className="w-10 h-10 object-contain svg-3d-icon"
        draggable={false}
      />
    </div>
    <p className="text-center text-lg font-medium z-10" style={{ color: color }}>
      {name}
    </p>
  </div>
);
}

export default SkillSvgCard;