function InstagramStoryCard({ story, onClick }) {
  const isImage = story.media_type === 'IMAGE' || story.media_type === 'CAROUSEL_ALBUM';
  const isVideo = story.media_type === 'VIDEO';

  return (
    <div className="flex flex-col items-center cursor-pointer" onClick={onClick}>
      <div className="w-full aspect-square rounded-full overflow-hidden border-2 border-pink-500 bg-black flex items-center justify-center">
        {isImage && (
          <img
            src={story.media_url}
            alt={`Story ${story.id}`}
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
      <p className="text-xs mt-2 text-center text-gray-500">
        {new Date(story.timestamp).toLocaleDateString()}
      </p>
    </div>
  );
}

export default InstagramStoryCard;