import { useProgress } from '@react-three/drei';

const LoadingScreen = () => {
  const { progress } = useProgress();

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center  transition-opacity duration-500 z-[9999999999999999]">
      <div className="text-white text-xl animate-pulse orbitron">
        Loading... {Math.floor(progress)}%
      </div>
    </div>
  );
};

export default LoadingScreen;