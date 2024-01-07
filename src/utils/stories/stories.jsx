import React, { useState } from "react";
import InstaStories from "react-insta-stories";
import pauseIcon from "../../assets/pause-icon.png";
import playIcon from "../../assets/play-icon.png";
import forward from "../../assets/right.png";
import backward from "../../assets/left.png";

export default function StoriesComponent(props) {
  const storyContent = {
    width: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    margin: "auto",
  };

  const [isPaused, setIsPaused] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const handlePausePlayClick = () => {
    setIsPaused(!isPaused);
  };

  const handleForwardClick = () => {
    setCurrentStoryIndex((prevIndex) =>
      prevIndex < props.stories.length - 1 ? prevIndex + 1 : prevIndex
    );
    setIsPaused(false);
  };

  const handleBackwardClick = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    setIsPaused(false);
  };

  return (
    <React.Fragment>
      <div className=" z-10 flex gap-10 w-full px-56 py-5 justify-between">
        <button onClick={handleBackwardClick} className="w-12 h-12 ">
          <img src={backward} alt="Backward" />
        </button>

        <button
          onClick={handlePausePlayClick}
          className="w-12 h-12 border-2 bg-slate-800 p-1 rounded-full border-slate-500     "
        >
          {isPaused ? (
            <img src={playIcon} alt="Play" />
          ) : (
            <img src={pauseIcon} alt="Pause" />
          )}
        </button>

        <button onClick={handleForwardClick} className="w-12 h-12">
          <img src={forward} alt="Forward " />
        </button>
      </div>
      <InstaStories
        stories={props.stories}
        defaultInterval={1500}
        width="100%"
        height={600}
        storyStyles={storyContent}
        loop={false}
        keyboardNavigation={true}
        isPaused={isPaused}
        currentIndex={currentStoryIndex}
        // onStoryStart={(s, st, si, progress) => {
        //   console.log("story started", s, st);
        //   setIsPaused(false);
        // }}
        // onAllStoriesEnd={props.handleAllStoriesEnd}
      />
    </React.Fragment>
  );
}
