import SpiderController from "./SpiderController";
import RobotModel from "./RobotModel";




function Home() {
  return (
    <section className="relative  text-white  md:h-[60vh] lg:h-[95vh] " id="home">
      {/* Vertical Side Social Links */}
      <div className="absolute left-5 sm:left-8 md:left-10 lg:left-12 top-80 md:top-52  lg:top-96 md:mt-60 lg:mt-32  transform -translate-y-1/2 flex flex-col gap-40 md:gap-52  lg:gap-70">
        <a href="https://github.com/akash85246" className="transform -rotate-90 origin-left tracking-widest text-xs sm:text-sm  md:text-lg lg:text-xl font-bold">
          GITHUB
        </a>
        <a href="https://www.linkedin.com/in/akash-rajput-dev/" className="transform -rotate-90 origin-left tracking-widest text-xs sm:text-sm  md:text-lg lg:text-xl font-bold">
          LINKEDIN
        </a>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-evenly h-full text-center">
        <div className="flex mt-10 mb-0  flex-col items-start justify-center font-orbitron">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold text-cyan-400 text-center w-full font-orbitron orbitron">
            Hi, I'm Akash Rajput
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-xl mt-4 text-gray-300 text-center w-full">
            Aspiring Software Developer | Full Stack Enthusiast | AI Learner
          </p>
        </div>

        <div className="ml-10 sm:ml-15 md:ml-20 lg:ml-28 grid grid-cols-4 lg:grid-cols-2 ">
          <div className="col-span-3 lg:col-span-1  flex flex-col items-center justify-center text-center h-full gap-8  md:gap-16">
            <div className=" mt-8 md:mt-1  lg:mt-12 text-left text-[#DC143C] text-sm sm:text-xl md:text-2xl lg:text-3xl font-semibold space-y-2">
              <p>PART HUMAN, PART MACHINE </p>
              <p>FULLY PASSIONATE ABOUT BUILDING.</p>
              <p>TURNING SPARKS OF IDEAS</p>
              <p>INTO DIGITAL REALITIES.</p>
            </div>

            {/* Stats */}
            <div className="mt-0 flex gap-10 md:gap-16 lg:gap-36  md:pr-16 lg:pr-20 w-full  text-center orbitron">
              <div>
                <p className="text-2xl md:text-5xl lg:text-7xl font-bold">12K</p>
                <p className="text-sm md:text-lg font-semibold">VIEWS</p>
              </div>
              <div>
                <p className="text-2xl md:text-5xl lg:text-7xl font-bold">40+</p>
                <p className="text-sm md:text-lg font-semibold">COMMITS</p>
              </div>
            </div>
          </div>

          <div></div>
       
        </div>
      </div>
    </section>
  );
}

export default Home;
