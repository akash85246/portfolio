// ProfilePhoto.js
import React, { useState } from "react";
import Popup from "reactjs-popup";

// Import the modified StoriesComponent
import StoriesComponent from "../stories/stories"; 
import frame from "../../assets/frame.gif";
import closeIcon from "../../assets/cancel.png";
import photo from "../../assets/profilePhoto.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function ProfilePhoto() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const storiesData1 = [
    {
      id: "1",
      url: photo,
      type: "image",
      header: {
        heading: "Akash Rajput",
        subheading: "Posted 30m ago",
        profileImage: photo,
      },
    },
    {
      id: "2",
      url: photo,
      type: "image",
      header: {
        heading: "Akash Rajput",
        subheading: "Posted 30m ago",
        profileImage: photo,
      },
      duration: 5000,
      seeMore: <h1>hello</h1>,
    },
    {
      id: "3",
      url: photo,
      type: "image",
      header: {
        heading: "Akash Rajput",
        subheading: "Posted 30m ago",
        profileImage: photo,
      },
    },
  ];
  const storiesData2 = [
    {
      id: "1",
      url: photo,
      type: "image",
      header: {
        heading: "Akash Rajput",
        subheading: "Posted 30m ago",
        profileImage: photo,
      },
    },
    {
      id: "2",
      url: photo,
      type: "image",
      header: {
        heading: "Akash Rajput",
        subheading: "Posted 30m ago",
        profileImage: photo,
      },
      duration: 5000,
      seeMore: <h1>hello</h1>,
    },
    {
      id: "3",
      url: photo,
      type: "image",
      header: {
        heading: "Akash Rajput",
        subheading: "Posted 30m ago",
        profileImage: photo,
      },
    },
  ];
  const storiesData3 = [
    {
      id: "1",
      url: photo,
      type: "image",
      header: {
        heading: "Akash Rajput",
        subheading: "Posted 30m ago",
        profileImage: photo,
      },
    },
    {
      id: "2",
      url: photo,
      type: "image",
      header: {
        heading: "Akash Rajput",
        subheading: "Posted 30m ago",
        profileImage: photo,
      },
      duration: 5000,
      seeMore: <h1>hello</h1>,
    },
    {
      id: "3",
      url: photo,
      type: "image",
      header: {
        heading: "Akash Rajput",
        subheading: "Posted 30m ago",
        profileImage: photo,
      },
    },
  ];
  const storiesComponents = [
    {
      stories: storiesData1,
      handleAllStoriesEnd: close,
      isPaused: false,
    },
    {
      stories: storiesData2,
      handleAllStoriesEnd: close,
      isPaused: false,
    },
    {
      stories: storiesData3,
      handleAllStoriesEnd: close,
      isPaused: false,
    },
    {
      stories: storiesData1,
      handleAllStoriesEnd: close,
      isPaused: false,
    },
    {
      stories: storiesData2,
      handleAllStoriesEnd: close,
      isPaused: false,
    },
    {
      stories: storiesData3,
      handleAllStoriesEnd: close,
      isPaused: false,
    },
    {
      stories: storiesData1,
      handleAllStoriesEnd: close,
      isPaused: false,
    },
    {
      stories: storiesData2,
      handleAllStoriesEnd: close,
      isPaused: false,
    },
    {
      stories: storiesData3,
      handleAllStoriesEnd: close,
      isPaused: false,
    },
    {
      stories: storiesData1,
      handleAllStoriesEnd: close,
      isPaused: false,
    },
    {
      stories: storiesData2,
      handleAllStoriesEnd: close,
      isPaused: false,
    },
    {
      stories: storiesData3,
      handleAllStoriesEnd: close,
      isPaused: false,
    },
  ];

  return (
    <div className="relative w-96 h-96">
      <Popup
        trigger={
          <button className="w-full h-full">
            <img src={frame} alt="Frame" className="w-full h-full" />
            <img
              src={photo}
              alt="Profile"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full cursor-pointer"
            />
          </button>
        }
        position="center"
        modal
        closeOnDocumentClick
      >
        {(close) => (
          <div className="modal bg-black w-screen h-screen justify-center items-center flex bg-opacity-40 backdrop-blur-sm ">
            <button
              className="close absolute top-5 rounded-full  w-12 h-12 right-20"
              onClick={close}
            >
              <img src={closeIcon}></img>
            </button>
            <div className="header absolute bg-slate-600 px-10 py-5 top-16 -left-20 w-96 -rotate-45 text-2xl text-center font-serif font-extrabold text-white border-2 border-dotted border-white shadow-md shadow-white">
              My Stories
            </div>
            <div className="content w-[70vw] rounded-2xl">
              <Carousel
                showArrows={true}
                autoFocus={true}
                autoPlay={true}
                centerMode={true}
                infiniteLoop={true}
                useKeyboardArrows={true}
                showThumbs={false}
                // onClickItem={onClickItem}
                // onClickThumb={onClickThumb}
                onChange={(index) => setCurrentStoryIndex(index)}
                className="flex justify-center"
              >
                {storiesComponents.map((component, index) => (
                  <StoriesComponent
                    key={index}
                    {...storiesComponents[currentStoryIndex]}
                  />
                ))}
              </Carousel>
            </div>
            {/* <div className="actions">
              <button
                className="button"
                onClick={() => {
                  console.log("modal closed ");
                  close();
                }}
              >
                close modal
              </button>
            </div> */}
          </div>
        )}
      </Popup>
    </div>
  );
}
