function InstagramStoryCard({ story, onClick, seenList, index }) {
  const bubbleLayout = [
    { top: 10, left: 10, size: 70 },
    { top: 20, left: 100, size: 60 },
    { top: 5, left: 180, size: 80 },
    { top: 15, left: 270, size: 55 },

    { top: 110, left: 30, size: 100 },
    { top: 120, left: 150, size: 110 },
    { top: 105, left: 270, size: 90 },

    { top: 220, left: 20, size: 120 },
    { top: 230, left: 160, size: 95 },
    { top: 215, left: 275, size: 85 },
  ];

  const layout = bubbleLayout[index % bubbleLayout.length];
  const size = layout.size;

  const isImage =
    story.media_type === "IMAGE" || story.media_type === "CAROUSEL_ALBUM";
  const isVideo = story.media_type === "VIDEO";

  const isSeen = seenList.includes(story.id);

  return (
    <li
      onClick={() => onClick(index)}
      style={{
        width: size,
        height: size,
        top: layout.top,
        left: layout.left +50,
      }}
      className="flex flex-col items-center cursor-pointer absolute"
    >
      {/* OUTER GRADIENT RING */}
      <div
        className={`
      p-[3px] rounded-full
      ${
        isSeen
          ? "bg-[#EFEFEF]"
          : "bg-gradient-to-br from-[#E9B0FF] via-[#C08CFF] to-[#4D84FA]"
      }
    `}
      >
        {/* MIDDLE BLACK RING */}
        <div className="p-[3px] bg-black rounded-full">
          {/* INNER IMAGE CIRCLE */}
          <div
            style={{
              width: size - 2,
              height: size - 2,
            }}
            className=" rounded-full overflow-hidden bg-white"
          >
            {isImage && (
              <img
                src={story.media_url}
                alt=""
                className="w-full h-full object-cover"
              />
            )}
            {isVideo && (
              <video
                src={story.media_url}
                className="w-full h-full object-cover"
                muted
                playsInline
                loop
              />
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default InstagramStoryCard;
