import Home from "./components/Home";
import About from "./components/About";
import Project from "./components/Project";
import Skill from "./components/Skill";
import Certificate from "./components/Certificate";
import Activity from "./components/Activity";
import Layout from "./layouts/layout";
import { useEffect } from "react";
import { useProgress } from "@react-three/drei";
import LoadingScreen from "./components/LoadingScreen";
import { useSelector, useDispatch } from "react-redux";
import { clearLoading } from "./redux/slices/loadingSlice";
function App() {
  const { progress } = useProgress();
  // const isLoading = useSelector((state) => state.loading.isLoading);
  const isLoading =false;
  const dispatch = useDispatch();
  

  // useEffect(() => {
  //   if (progress >= 100) {
  //     const timeout = setTimeout(() => {
  //       dispatch(clearLoading());
  //     }, 10); 
  //     return () => clearTimeout(timeout);
  //   }
  // }, [progress, dispatch]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Layout>
        <Home />
        <About />
        <Project />
        <Skill />
        <Certificate />
        <Activity />
      </Layout>
    </>
  );
}

export default App;
