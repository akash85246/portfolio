import React, { useEffect, useRef } from "react";

function InstagramModal({ isOpen, story, onClose, onNext, onPrev, currentIndex, totalStories }) {
  const modalRef = useRef();

  // Close on click outside
  useEffect(() => {
    function handleOutsideClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  // Auto next every 5s
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      if (currentIndex < totalStories - 1) {
        onNext();
      } else {
        onClose();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isOpen, totalStories, onNext, onClose]);

  if (!isOpen || !story) return null;

  const isImage = story.media_type === 'IMAGE' || story.media_type === 'CAROUSEL_ALBUM';
  const isVideo = story.media_type === 'VIDEO';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div ref={modalRef} className="relative w-[90vw] max-w-md rounded-xl overflow-hidden">
        {isImage && (
          <img src={story.media_url} alt="Story" className="w-full h-auto object-cover" />
        )}
        {isVideo && (
          <video
            src={story.media_url}
            className="w-full h-auto object-cover"
            muted
            autoPlay
            playsInline
            loop
          />
        )}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 px-2">
          <button onClick={onPrev} disabled={currentIndex === 0} className="text-white text-xl">{`‹`}</button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 px-2">
          <button onClick={onNext} disabled={currentIndex === totalStories - 1} className="text-white text-xl">{`›`}</button>
        </div>
      </div>
    </div>
  );
}

export default InstagramModal;